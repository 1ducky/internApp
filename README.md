# Product Requirements Document (PRD)
## BKK / Opportunity Platform MVP

Version: 1.0  
Status: Draft Finalisasi MVP  
Tanggal: 9 Mei 2026

---

# 1. Executive Summary

Platform ini dirancang sebagai sistem distribusi opportunity berbasis status-machine yang menghubungkan user dengan provider/company.

Fokus utama MVP:

- Kecepatan bootstrap production.
- Konsistensi data.
- Integritas proses approval.
- Maintainability jangka panjang.
- Perlindungan terhadap abuse dan race condition.

Platform dibangun menggunakan pendekatan modern:

- Managed authentication.
- Database transactional.
- Clean service architecture.
- Event-driven synchronization.

Target awal bukan membangun marketplace kompleks, melainkan membangun fondasi sistem yang stabil, scalable, dan mudah dikembangkan.

---

# 2. Product Vision

Membangun platform opportunity/job distribution yang:

- Cepat diakses.
- Aman digunakan.
- Mudah dipelihara.
- Dapat berkembang menjadi ecosystem.
- Memiliki state consistency yang kuat.
- Mendukung pertumbuhan multi-provider.

---

# 3. Problem Statement

Masalah utama yang ingin diselesaikan:

## Dari Sisi User

- Sulit menemukan opportunity terpercaya.
- Tidak ada tracking status application yang jelas.
- Tidak ada transparansi proses approval.
- Banyak proses manual dan lambat.

## Dari Sisi Provider

- Sulit mengelola pelamar.
- Tidak ada workflow approval terstruktur.
- Risiko quota overload.
- Sulit melakukan moderasi dan tracking.

## Dari Sisi Sistem

- Risiko race condition.
- Risiko duplicate apply.
- Risiko inconsistent state.
- Risiko abuse endpoint.
- Risiko technical debt pada bootstrap.

---

# 4. Product Goals

## Primary Goals

- User dapat apply opportunity.
- Provider dapat mengelola application.
- Sistem memiliki approval workflow aman.
- Status application jelas dan konsisten.
- Sistem aman terhadap duplicate dan race condition.

## Secondary Goals

- Memiliki audit trail.
- Mendukung analytics.
- Memiliki maintainability tinggi.
- Siap dikembangkan menjadi ecosystem.

---

# 5. Non Goals (MVP)

Fitur berikut tidak termasuk fase awal:

- Multi-staff provider management.
- Realtime websocket system.
- Advanced recommendation engine.
- Complex RBAC hierarchy.
- Full event sourcing.
- Multi-region deployment.
- Advanced chat system.
- Payment integration.
- AI recommendation.
- Microservice architecture.

---

# 6. User Roles

## 6.1 User

Dapat:

- Register/login.
- Melihat opportunity.
- Apply opportunity.
- Cancel application.
- Accept approved application.
- Melihat status application.

Tidak dapat:

- Manipulasi status.
- Mengubah quota.
- Apply jika memiliki kontrak aktif.

---

## 6.2 Provider

Dapat:

- Membuat opportunity.
- Mengelola application.
- Approve/reject application.
- Mengatur quota.
- Menutup opportunity.

Tidak dapat:

- Manipulasi acceptedCount.
- Mengakses provider lain.
- Mengubah ownership.

---

## 6.3 Admin

Dapat:

- Verify provider.
- Suspend provider.
- Moderasi platform.
- Melihat audit.
- Override status tertentu.

---

# 7. Core Features MVP

## Authentication

- Email/password.
- Google login.
- GitHub login.
- Secure session.
- Webhook sync ke database.

---

## Public Opportunity

- Opportunity list.
- Opportunity detail.
- Pagination.
- Basic filtering.

---

## User Dashboard

- Melihat application.
- Tracking status.
- Cancel application.
- Accept approved application.

---

## Provider Dashboard

- Create opportunity.
- Manage application.
- Approve/reject.
- Monitoring quota.

---

## Admin Panel

- Provider verification.
- Moderation.
- Audit visibility.

---

# 8. State Machine

## Application Status

- PENDING
- APPROVED
- ACCEPTED
- REJECTED
- CANCELED
- EXPIRED

---

## State Flow

```text
PENDING
 ├── APPROVED
 │     └── ACCEPTED
 ├── REJECTED
 ├── CANCELED
 └── EXPIRED
```

---

## State Rules

### PENDING

Initial state setelah user apply.

### APPROVED

Provider menerima application dan menawarkan kesempatan kepada user.

### ACCEPTED

User menerima offer dari provider.

### REJECTED

Provider menolak application.

### CANCELED

User membatalkan application.

### EXPIRED

System timeout karena tidak ada respon.

---

# 9. Business Rules

## User Rules

- User hanya boleh memiliki 1 ACTIVE ACCEPTED contract.
- User tidak boleh apply duplicate pada opportunity yang masih aktif.
- User dapat apply ulang jika status sebelumnya EXPIRED atau CANCELED.

---

## Provider Rules

- Provider tidak dapat melebihi quota.
- Provider hanya dapat mengelola opportunity miliknya.
- Provider tidak dapat override acceptedCount.

---

## System Rules

- Expiry otomatis setelah 3 hari.
- Semua transisi status tervalidasi.
- Semua mutation penting transactional.
- Semua endpoint tervalidasi server-side.

---

# 10. Technical Architecture

## Frontend

- Next.js App Router
- React Server Components
- Tailwind CSS

---

## Backend

- Next.js Route Handler
- Server Actions
- Prisma ORM
- PostgreSQL

---

## Authentication

- Clerk
- Webhook synchronization

---

## Protection Layer

- Cloudflare
- Rate limiting
- Validation layer

---

## Cache & Future Scaling

- Redis (later stage)
- Optional query caching

---

# 11. Webhook Architecture

## Objective

Menjadikan Clerk sebagai identity source dan PostgreSQL sebagai application source.

---

## Webhook Flow

```text
User Action
   ↓
Clerk Auth
   ↓
Webhook Event
   ↓
Webhook Route
   ↓
Signature Verification
   ↓
Webhook Dispatcher
   ↓
Service Layer
   ↓
Prisma Transaction
   ↓
Database Sync
```

---

## Supported Events

- user.created
- user.updated
- user.deleted

---

## Webhook Rules

- Signature wajib diverifikasi.
- Webhook harus idempotent.
- Jangan percaya event ordering.
- Webhook harus fast-response.
- Heavy logic dipisahkan async.

---

# 12. Security Requirements

## Layer 1 — Perimeter

Cloudflare:

- Bot filtering.
- DDoS protection.
- IP filtering.

---

## Layer 2 — Identity

Clerk:

- Session validation.
- Secure auth.
- Identity management.

---

## Layer 3 — Application

- Zod validation.
- Authorization helper.
- Rate limiting.
- Transaction protection.
- Audit logging.

---

# 13. Database Integrity Rules

## Required Constraints

### Single Active Contract

User hanya boleh memiliki satu ACCEPTED aktif.

---

### Anti Duplicate Apply

User tidak boleh apply duplicate pada opportunity yang masih aktif.

---

### Quota Protection

Quota wajib transactional.

---

### Expired Validation

Opportunity expired tidak dapat diapply.

---

# 14. Audit & Logging

## Audit Log

Track:

- Status changes.
- Provider moderation.
- Auth synchronization.
- Security events.

---

## Logging

Pisahkan:

- Auth logs.
- Application logs.
- Moderation logs.
- Security logs.

---

# 15. Background Jobs

## MVP Jobs

- Expire application.
- Expire opportunity.

---

## Future Jobs

- Notification sender.
- Email queue.
- Analytics aggregation.
- Cleanup worker.

---

# 16. API Architecture

## Public

- /api/opportunities
- /api/opportunities/[slug]

---

## User

- /api/applications
- /api/dashboard

---

## Provider

- /api/provider/opportunities
- /api/provider/applications

---

## Admin

- /api/admin/providers
- /api/admin/moderation

---

# 17. Service Layer Structure

```text
src/
 ├── services/
 │    ├── application/
 │    ├── opportunity/
 │    ├── provider/
 │    ├── auth/
 │    └── webhook/
```

---

## Principles

- Business logic tidak berada di route.
- Query terpisah dari mutation.
- Transaction berada di service layer.
- Authorization centralized.

---

# 18. Repository Pattern

Tujuan:

- Centralized query.
- Easier optimization.
- Maintainability.
- Easier testing.

Contoh:

```text
repositories/
 ├── application.repository.ts
 ├── user.repository.ts
 └── opportunity.repository.ts
```

---

# 19. Performance Requirements

## Database

- Wajib pagination.
- Hindari unbounded query.
- Gunakan select field minimal.

---

## Cache Strategy

Tahap awal:

- Homepage cache.
- Public opportunity cache.
- Provider profile cache.

Private dashboard tidak dicache di awal.

---

# 20. UX Requirements

## General Principles

- Minimalist.
- Fast loading.
- Clear status visibility.
- Consistent validation feedback.
- Mobile friendly.

---

## User Experience

- Status mudah dipahami.
- Error message jelas.
- CTA jelas.
- Form ringan.

---

# 21. Analytics Requirements

Track:

- Apply rate.
- Acceptance rate.
- Provider activity.
- User retention.
- Expired ratio.
- Conversion funnel.

---

# 22. Risk Evaluation

## Technical Risks

- Race condition.
- Webhook desync.
- Route becoming fat.
- Transaction misuse.
- Cache invalidation.

---

## Product Risks

- Low provider activity.
- Empty homepage.
- User retention rendah.

---

## Mitigation

Bootstrap content:

- Event info.
- Job fair.
- Bootcamp.
- Career article.
- Sponsored announcement.

---

# 23. MVP Development Priority

## Phase 1

- Authentication.
- Webhook sync.
- Prisma schema.
- RBAC helper.
- Public opportunity.

---

## Phase 2

- Apply flow.
- Provider dashboard.
- Transaction safety.
- Audit log.

---

## Phase 3

- Background jobs.
- Notification.
- Analytics.
- Cache optimization.

---

# 24. Success Metrics

## Technical

- Stable auth flow.
- No duplicate apply.
- No quota overflow.
- Fast public page load.
- Consistent state transition.

---

## Product

- Provider onboarding.
- Application completion rate.
- User retention.
- Opportunity engagement.

---

# 25. Final Strategic Direction

Platform ini dirancang dengan prinsip:

- Lean but production-capable.
- Avoid overengineering.
- Strong domain consistency.
- Clean architecture.
- Scalable foundation.

Fokus utama MVP adalah membangun fondasi sistem yang:

- aman,
- maintainable,
- transactional,
- dan siap berkembang tanpa refactor