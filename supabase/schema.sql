-- CuidaJá schema

create extension if not exists "uuid-ossp";

create type role_type as enum ('admin', 'cliente', 'profissional');
create type verification_status as enum ('pending_review', 'approved', 'rejected');
create type job_status as enum ('open', 'in_analysis', 'negotiating', 'awaiting_confirmation', 'closed', 'reopened');
create type proposal_status as enum ('sent', 'countered', 'accepted', 'rejected');
create type booking_status as enum ('requested', 'confirmed', 'cancelled', 'completed');
create type subscription_status as enum ('trial', 'active', 'past_due', 'canceled');

create table if not exists users_profile (
  id uuid primary key references auth.users on delete cascade,
  full_name text not null,
  role role_type not null default 'cliente',
  status_verificacao verification_status,
  created_at timestamptz not null default now()
);

create table if not exists clients (
  user_id uuid primary key references users_profile(id) on delete cascade,
  full_name text not null,
  phone text,
  location text,
  created_at timestamptz not null default now()
);

create table if not exists professionals (
  user_id uuid primary key references users_profile(id) on delete cascade,
  full_name text not null,
  phone text,
  address text,
  profession text,
  council text,
  education text,
  experience_years integer,
  bio text,
  price_hour numeric,
  status_verificacao verification_status not null default 'pending_review',
  trial_started_at timestamptz default now(),
  trial_ends_at timestamptz default (now() + interval '30 days'),
  created_at timestamptz not null default now()
);

create table if not exists professional_documents (
  id uuid primary key default uuid_generate_v4(),
  professional_id uuid not null references professionals(user_id) on delete cascade,
  doc_type text not null,
  file_path text not null,
  verified boolean default false,
  created_at timestamptz not null default now()
);

create table if not exists professional_skills (
  id uuid primary key default uuid_generate_v4(),
  professional_id uuid not null references professionals(user_id) on delete cascade,
  skill text not null,
  created_at timestamptz not null default now()
);

create table if not exists availability_slots (
  id uuid primary key default uuid_generate_v4(),
  professional_id uuid not null references professionals(user_id) on delete cascade,
  weekday integer not null,
  start_time time not null,
  end_time time not null,
  created_at timestamptz not null default now()
);

create table if not exists availability_blocks (
  id uuid primary key default uuid_generate_v4(),
  professional_id uuid not null references professionals(user_id) on delete cascade,
  start_at timestamptz not null,
  end_at timestamptz not null,
  reason text,
  created_at timestamptz not null default now()
);

create table if not exists jobs (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid not null references clients(user_id) on delete cascade,
  title text not null,
  description text not null,
  budget numeric not null,
  location text,
  status job_status not null default 'open',
  negotiation_variation numeric not null default 0.5,
  created_at timestamptz not null default now()
);

create table if not exists job_requirements (
  id uuid primary key default uuid_generate_v4(),
  job_id uuid not null references jobs(id) on delete cascade,
  requirement text not null
);

create table if not exists job_proposals (
  id uuid primary key default uuid_generate_v4(),
  job_id uuid not null references jobs(id) on delete cascade,
  professional_id uuid not null references professionals(user_id) on delete cascade,
  proposed_price numeric not null,
  message text,
  availability_notes text,
  status proposal_status not null default 'sent',
  created_at timestamptz not null default now()
);

create table if not exists bookings (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid not null references clients(user_id) on delete cascade,
  professional_id uuid not null references professionals(user_id) on delete cascade,
  status booking_status not null default 'requested',
  start_at timestamptz,
  end_at timestamptz,
  price numeric,
  created_at timestamptz not null default now()
);

create table if not exists chats (
  id uuid primary key default uuid_generate_v4(),
  job_id uuid references jobs(id) on delete cascade,
  booking_id uuid references bookings(id) on delete cascade,
  client_id uuid not null references clients(user_id) on delete cascade,
  professional_id uuid not null references professionals(user_id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists messages (
  id uuid primary key default uuid_generate_v4(),
  chat_id uuid not null references chats(id) on delete cascade,
  sender_id uuid not null references users_profile(id) on delete cascade,
  content text,
  attachment_path text,
  created_at timestamptz not null default now()
);

create table if not exists subscriptions (
  id uuid primary key default uuid_generate_v4(),
  professional_id uuid not null references professionals(user_id) on delete cascade,
  status subscription_status not null default 'trial',
  trial_start timestamptz not null default now(),
  trial_end timestamptz not null default (now() + interval '30 days'),
  current_period_end timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists admin_actions_log (
  id uuid primary key default uuid_generate_v4(),
  admin_id uuid not null references users_profile(id) on delete cascade,
  professional_id uuid not null references professionals(user_id) on delete cascade,
  action text not null,
  reason text,
  created_at timestamptz not null default now()
);

-- helper functions
create or replace function is_admin()
returns boolean
language sql
stable
as $$
  select exists (
    select 1 from users_profile
    where id = auth.uid() and role = 'admin'
  );
$$;

create or replace function professional_is_approved(professional uuid)
returns boolean
language sql
stable
as $$
  select exists (
    select 1 from professionals
    where user_id = professional and status_verificacao = 'approved'
  );
$$;

create or replace function can_submit_monthly_proposal(professional uuid)
returns boolean
language sql
stable
as $$
  select count(*) < 20
  from job_proposals
  where professional_id = professional
    and date_trunc('month', created_at) = date_trunc('month', now());
$$;

create or replace function within_negotiation(job uuid, proposed numeric)
returns boolean
language sql
stable
as $$
  select proposed between
    (jobs.budget * (1 - jobs.negotiation_variation))
    and (jobs.budget * (1 + jobs.negotiation_variation))
  from jobs where jobs.id = job;
$$;

-- RLS
alter table users_profile enable row level security;
alter table clients enable row level security;
alter table professionals enable row level security;
alter table professional_documents enable row level security;
alter table professional_skills enable row level security;
alter table availability_slots enable row level security;
alter table availability_blocks enable row level security;
alter table jobs enable row level security;
alter table job_requirements enable row level security;
alter table job_proposals enable row level security;
alter table bookings enable row level security;
alter table chats enable row level security;
alter table messages enable row level security;
alter table subscriptions enable row level security;
alter table admin_actions_log enable row level security;

-- users_profile policies
create policy "Users can view own profile" on users_profile
  for select using (auth.uid() = id or is_admin());
create policy "Users can update own profile" on users_profile
  for update using (auth.uid() = id or is_admin());

-- clients policies
create policy "Clients manage own profile" on clients
  for all using (auth.uid() = user_id or is_admin())
  with check (auth.uid() = user_id or is_admin());

-- professionals policies
create policy "Professionals view own or approved" on professionals
  for select using (
    auth.uid() = user_id or is_admin() or status_verificacao = 'approved'
  );
create policy "Professionals manage own profile" on professionals
  for update using (auth.uid() = user_id or is_admin())
  with check (auth.uid() = user_id or is_admin());
create policy "Professionals insert own profile" on professionals
  for insert with check (auth.uid() = user_id);

-- professional documents
create policy "Professionals manage documents" on professional_documents
  for all using (auth.uid() = professional_id or is_admin())
  with check (auth.uid() = professional_id or is_admin());

-- professional skills
create policy "Skills readable when approved" on professional_skills
  for select using (
    auth.uid() = professional_id or is_admin() or professional_is_approved(professional_id)
  );
create policy "Skills manage own" on professional_skills
  for all using (auth.uid() = professional_id or is_admin())
  with check (auth.uid() = professional_id or is_admin());

-- availability
create policy "Availability readable" on availability_slots
  for select using (
    auth.uid() = professional_id or is_admin() or professional_is_approved(professional_id)
  );
create policy "Availability manage own" on availability_slots
  for all using (auth.uid() = professional_id or is_admin())
  with check (auth.uid() = professional_id or is_admin());

create policy "Blocks readable" on availability_blocks
  for select using (
    auth.uid() = professional_id or is_admin() or professional_is_approved(professional_id)
  );
create policy "Blocks manage own" on availability_blocks
  for all using (auth.uid() = professional_id or is_admin())
  with check (auth.uid() = professional_id or is_admin());

-- jobs policies
create policy "Clients manage own jobs" on jobs
  for all using (auth.uid() = client_id or is_admin())
  with check (auth.uid() = client_id or is_admin());
create policy "Professionals view open jobs" on jobs
  for select using (
    is_admin() or status in ('open', 'reopened') or exists (
      select 1 from job_proposals
      where job_proposals.job_id = jobs.id and job_proposals.professional_id = auth.uid()
    )
  );

-- job requirements
create policy "Job requirements manage by owner" on job_requirements
  for all using (
    exists (select 1 from jobs where jobs.id = job_requirements.job_id and jobs.client_id = auth.uid())
    or is_admin()
  )
  with check (
    exists (select 1 from jobs where jobs.id = job_requirements.job_id and jobs.client_id = auth.uid())
    or is_admin()
  );

-- job proposals
create policy "Professionals can propose" on job_proposals
  for insert with check (
    auth.uid() = professional_id
    and professional_is_approved(auth.uid())
    and can_submit_monthly_proposal(auth.uid())
    and within_negotiation(job_id, proposed_price)
  );
create policy "Proposals visible to owners" on job_proposals
  for select using (
    auth.uid() = professional_id
    or exists (select 1 from jobs where jobs.id = job_proposals.job_id and jobs.client_id = auth.uid())
    or is_admin()
  );
create policy "Proposals update by professional" on job_proposals
  for update using (auth.uid() = professional_id or is_admin())
  with check (auth.uid() = professional_id or is_admin());

-- bookings
create policy "Bookings select by participants" on bookings
  for select using (
    auth.uid() = client_id or auth.uid() = professional_id or is_admin()
  );
create policy "Bookings insert by client" on bookings
  for insert with check (auth.uid() = client_id);
create policy "Bookings update by participants" on bookings
  for update using (auth.uid() = client_id or auth.uid() = professional_id or is_admin())
  with check (auth.uid() = client_id or auth.uid() = professional_id or is_admin());

-- chats
create policy "Chat participants select" on chats
  for select using (auth.uid() = client_id or auth.uid() = professional_id or is_admin());
create policy "Chat insert by participants" on chats
  for insert with check (auth.uid() = client_id or auth.uid() = professional_id);

-- messages
create policy "Messages select by participants" on messages
  for select using (
    exists (
      select 1 from chats
      where chats.id = messages.chat_id
        and (chats.client_id = auth.uid() or chats.professional_id = auth.uid() or is_admin())
    )
  );
create policy "Messages insert by participants" on messages
  for insert with check (
    exists (
      select 1 from chats
      where chats.id = messages.chat_id
        and (chats.client_id = auth.uid() or chats.professional_id = auth.uid())
    )
  );

-- subscriptions
create policy "Subscriptions view/manage" on subscriptions
  for all using (auth.uid() = professional_id or is_admin())
  with check (auth.uid() = professional_id or is_admin());

-- admin log
create policy "Admin log manage" on admin_actions_log
  for all using (is_admin()) with check (is_admin());

-- storage buckets
insert into storage.buckets (id, name, public)
values ('professional-documents', 'professional-documents', false)
on conflict do nothing;

insert into storage.buckets (id, name, public)
values ('chat-attachments', 'chat-attachments', false)
on conflict do nothing;

-- realtime
alter publication supabase_realtime add table messages;
