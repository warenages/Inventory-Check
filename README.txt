# Inventory PWA — Sheets backend (v3) with Delete/Update mirroring

This version keeps Google Sheets in sync with your app **including deletes and updates**.

## What changed
- Every entry has a unique **ID**. The backend supports **UPSERT** (add or update by ID) and **DELETE**.

- When you edit an entry and Save, the old row (same ID) is replaced in ALL + location tab.

- When you delete an entry in the app, the backend **deletes that ID** from ALL + both location tabs.

- Content-Type remains **text/plain** to avoid CORS preflight. Auto-resync on reconnect is enabled.

## Google Sheets setup
1) Create a Sheet with tabs: `inventory_entries`, `inventory_entries_dehu`, `inventory_entries_chakan`.

2) Headers in row 1: `ID | Timestamp | Plant | Auditor | PartCode | Quantity | Zone`.

3) Apps Script: open `GoogleAppsScript_backend.txt`, paste into **Extensions → Apps Script** and **Deploy → Web app** (Execute as Me; Access: Anyone with the link).

4) In `config.js`, set `SHEETS_ENDPOINT` to the Web App `/exec` URL.


## How it behaves
- **Add/Update:** frontend sends `{op:'upsert', ...fields}`; backend deletes any existing row with that ID then appends a fresh row to ALL + location.

- **Delete:** frontend sends `{op:'delete', id}`; backend removes the ID from ALL + both location tabs.

- **Offline:** operations queue and auto-resync later. Pending count shows unsent ops.

## Files
- `index.html`, `config.js`, `service-worker.js`, `manifest.webmanifest`, `icon-512.png`

- `GoogleAppsScript_backend.txt` (paste into Apps Script)