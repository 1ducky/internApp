# Incident Report: UploadThing Callback Issue

**Date:** 2026-06-02

**Issue:** 
Fitur upload mengalami masalah di mana callback tidak terpanggil.

**Symptoms:**
- Berjalan lancar di local development.
- Berjalan lancar di local build dengan ngrok.
- Mengalami kegagalan (failed) di deployment environment.

**Root Cause:** 
Vercel Authentication memblokir third-party callback dari UploadThing.

**Fix:** 
Menonaktifkan Vercel Auth untuk environment tersebut.

**Time Lost:** 
~ 1 hari

**Lesson Learned:**
Jika local build bekerja dengan baik tetapi deployment gagal, selalu cek konfigurasi infrastruktur (seperti perlindungan auth, firewall, dll) pada environment tersebut.
