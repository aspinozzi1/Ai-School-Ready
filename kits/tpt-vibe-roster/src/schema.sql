-- ============================================================================
-- CLASS ROSTER — the whole database, in one file.
-- Paste this into the Supabase SQL Editor and press Run. Once.
-- ============================================================================
--
-- The point of this file is what is NOT in it.
--
-- There is no column anywhere below that can hold a student's last name, and
-- the check constraint on `students` means the database itself will refuse one
-- even if every other layer fails. Your browser shortens the name, the page
-- sends only the short form, and this file makes the long form impossible to
-- store. Three layers, each one independent of the other two.
--
-- Try it yourself once this has run. In the SQL Editor:
--
--     insert into students (class_id, display_name)
--     values ('00000000-0000-0000-0000-000000000000', 'Anthony Spinozzi');
--
-- Postgres answers:
--     new row for relation "students" violates check constraint
--     "display_name_is_shortened"
--
-- That error is the product. Everything else here is plumbing.

create extension if not exists pgcrypto;

-- ------------------------------------------------------------------ classes
create table if not exists classes (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  period      text,                                  -- "3rd period", or leave it empty
  archived    boolean not null default false,
  created_at  timestamptz not null default now()
);

-- ----------------------------------------------------------------- students
-- display_name is ALWAYS a first name, or a first name and a last initial.
-- "Jo" · "Anthony S." · "Anthony S. 2" when two of them shorten the same way.
create table if not exists students (
  id           uuid primary key default gen_random_uuid(),
  class_id     uuid not null references classes(id) on delete cascade,
  display_name text not null,
  sort_order   int  not null default 0,
  created_at   timestamptz not null default now(),

  unique (class_id, display_name),

  -- The line that does the work.
  --
  -- Accepts:  Jo · Ana · O'Neal · Anthony S. · Jean-Luc P. · James B. 12
  -- Refuses:  Anthony Spinozzi · Spinozzi, Anthony · Maria de la Cruz
  --           Anthony S. Spinozzi · anthony spinozzi
  --
  -- A doubled quote inside a SQL string is one literal apostrophe, which is
  -- how O'Neal gets through.
  constraint display_name_is_shortened check (
    display_name ~ '^[A-Za-z][A-Za-z''-]*( [A-Z]\.( [0-9]+)?)?$'
    and length(display_name) <= 24
  )
);

create index if not exists students_class_idx on students(class_id);

-- --------------------------------------------------------------------- RLS
-- Row Level Security is ON, and the two policies below let the anon key read
-- and write these two tables. Read that sentence again, because it means:
--
--   ANYONE WHO HAS BOTH YOUR PROJECT URL AND YOUR ANON KEY CAN READ AND
--   CHANGE THIS ROSTER.
--
-- Which is exactly why your roster file stays on your own computer and is
-- never published to the web, and it is also why the schema above is shaped
-- the way it is. The worst thing a leak of this database can show anybody is
-- a list that says "Anthony S." and "Maria C."
--
-- That is the whole idea: build it so that the bad day is a boring day.

alter table classes  enable row level security;
alter table students enable row level security;

create policy classes_all  on classes  for all using (true) with check (true);
create policy students_all on students for all using (true) with check (true);
