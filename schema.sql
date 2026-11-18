create table if not exists events (
  id serial primary key,
  kind text not null,
  created_at timestamptz default now()
);
