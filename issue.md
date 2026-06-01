---
title: "Implementasi Structured Logging dan Klasifikasi Error pada Webhook"
labels: ["enhancement", "logging", "webhook"]
assignees: []
---

## 📋 Latar Belakang
Saat ini sistem menerima webhook dari Clerk. Webhook sering kali mengirimkan *event* secara duplikat (retry dari pihak provider webhook). Saat ini sulit untuk membedakan mana error yang terjadi karena **duplikasi data** (misal: user sudah ada di database) dan mana error yang terjadi karena **kesalahan logic/infrastruktur** (misal: database mati, validasi gagal, dll).

Hal ini membuat proses *debugging* menjadi sulit karena *log* dipenuhi oleh *error* dari duplikasi webhook yang sebenarnya aman untuk diabaikan (harus di-return `200 OK` agar Clerk tidak mengulanginya lagi).

## 🎯 Tujuan
1. Membuat struktur logging yang standar (JSON/terstruktur) agar mudah di-*query* dan dibaca.
2. Membuat klasifikasi error menggunakan *Custom Error Classes* untuk membedakan jenis kegagalan.
3. Mengimplementasikan error handling di `route.ts` webhook untuk merespons dengan status code yang tepat berdasarkan jenis error (mengembalikan `200 OK` untuk duplikasi, dan `400/500` untuk *logic error*).

## 🛠 Rencana Implementasi (Action Plan)

### Tahap 1: Membuat Custom Error Classes
Membuat file sentral (misal: `lib/errors/index.ts` atau `utils/errors.ts`) untuk mendefinisikan *custom errors*.

```typescript
// utils/errors.ts
export class WebhookError extends Error {
  public statusCode: number;
  public metadata?: any;

  constructor(message: string, statusCode: number, metadata?: any) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.metadata = metadata;
  }
}

export class DuplicateWebhookError extends WebhookError {
  constructor(message: string = "Webhook event already processed", metadata?: any) {
    super(message, 200, metadata); // Return 200 agar provider tidak me-retry
  }
}

export class LogicError extends WebhookError {
  constructor(message: string, metadata?: any) {
    super(message, 500, metadata); // Return 500 agar diketahui ada issue logic
  }
}
```

### Tahap 2: Membuat Structured Logger
Membuat *helper* atau menggunakan *library* ringan (seperti `pino` atau *wrapper* `console` standar) yang me-return format terstruktur.

```typescript
// utils/logger.ts
export const logger = {
  info: (message: string, meta?: any) => {
    console.log(JSON.stringify({ level: "INFO", message, ...meta, timestamp: new Date().toISOString() }));
  },
  warn: (message: string, meta?: any) => {
    console.warn(JSON.stringify({ level: "WARN", message, ...meta, timestamp: new Date().toISOString() }));
  },
  error: (message: string, meta?: any) => {
    console.error(JSON.stringify({ level: "ERROR", message, ...meta, timestamp: new Date().toISOString() }));
  }
};
```

### Tahap 3: Implementasi pada Service Layer (`clerk.service.ts`)
Ubah service untuk mendeteksi error dari database (misal error unik Prisma `P2002`) dan melakukan *throw* ke custom error.

```typescript
// services/webhook/clerk/clerk.service.ts
import { DuplicateWebhookError, LogicError } from "@/utils/errors";

export const clerkService = {
  userCreated: async (evt: WebhookEvent) => {
    try {
      // Logic insert ke DB
      // await db.user.create(...)
    } catch (error: any) {
      if (error.code === 'P2002') { // Contoh code unique constraint Prisma
        throw new DuplicateWebhookError(`User dengan ID ${evt.data.id} sudah ada`, { evtId: evt.data.id });
      }
      throw new LogicError("Gagal menyimpan data user baru", { error: error.message });
    }
  }
}
```

### Tahap 4: Menangani Error di Route Handler (`route.ts`)
Gunakan blok `try-catch` di tingkat *dispatcher* atau `route.ts` untuk menangkap error dan mengklasifikasikannya sebelum memberikan *response* ke Clerk.

```typescript
// app/api/webhook/clerk/route.ts
import { DuplicateWebhookError, WebhookError } from "@/utils/errors";
import { logger } from "@/utils/logger";

export async function POST(request: NextRequest) {
    // ... verify webhook

    try {
        const data = await clerkWebhookDispatcher(evt);
        logger.info("Webhook processed successfully", { evtType: evt.type });
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (err: any) {
        if (err instanceof DuplicateWebhookError) {
            // Log sebagai warning, tapi kembalikan 200 OK agar Clerk berhenti retry
            logger.warn("Duplicate webhook event ignored", { error: err.message, meta: err.metadata });
            return NextResponse.json({ message: "Ignored duplicate event" }, { status: 200 });
        }

        if (err instanceof WebhookError) {
            logger.error("Logic error in webhook processing", { error: err.message, meta: err.metadata });
            return NextResponse.json({ error: err.message }, { status: err.statusCode });
        }

        // Unhandled Exceptions
        logger.error("Unhandled error in webhook", { error: err.message, stack: err.stack });
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
```

## ✅ Kriteria Penerimaan (Acceptance Criteria)
- [ ] Tersedia utilitas / fungsi logging yang seragam.
- [ ] Custom class `DuplicateWebhookError` dan `LogicError` dibuat dan diimplementasikan.
- [ ] Error duplikasi menghasilkan HTTP `200 OK` (agar Clerk tidak me-retry) dan di-*log* sebagai `WARN` atau `INFO`.
- [ ] Error *logic* (misal: validasi salah, DB timeout) menghasilkan HTTP `400` atau `500` dan di-*log* sebagai `ERROR`.
- [ ] Semua *log* mencantumkan *metadata* yang memadai (misal: event ID, event type, dan detail pesan error) tanpa menampilkan *sensitive data*.
