# Build decisions log

Decisions made with the owner that refine the master brief. Part II must honor these.

## 2026-08-07 — School license scope & seat cap (owner-directed)

**Problem:** nothing stops a district from buying one $1,499 School Membership and
sharing it across every building.

**Decision:** a School Membership covers **one school building** and includes up to
**75 staff seats** (config value `schoolSeatLimit` in `/config/site.ts`, editable).
75 is generous — larger than nearly any single school's certificated staff — so a
legitimate school never feels the cap, but a district cannot stretch one license
across buildings.

**Implementation (Part II):**
- `organizations.seat_limit` (default from config) + enforcement in the invite flow:
  the system refuses invite #76 with a friendly screen — "Your membership covers one
  school of up to 75 staff. Multiple schools or a district? Contact us for district
  pricing." No owner labor involved.
- Seat usage shown on `/school/staff` ("42 of 75 seats used") so admins self-manage.
- Pricing page copy: "All-access for your whole staff — one school building, up to
  75 staff accounts."
- Terms of service: license scope = one school site; district use requires a
  district agreement.
- Quote PDF / invoice description carries the same one-school language so business
  offices see the scope before purchase.
- The "District or multiple schools? Contact us" path on pricing is the upsell for
  multi-building buyers (per master brief A5.4).

**Deliberately NOT doing:** per-seat pricing, IP/domain policing, or any manual
verification — all would add owner labor or purchase friction. The cap + clear
license language + the contact-us path is enough.
