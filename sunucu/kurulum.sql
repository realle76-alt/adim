-- ADIM-İST çevrimiçi deneme tablosu (yalnızca kodlu adım; ad/telefon/okul YOK)
create table if not exists public.adim_deneme (
  id bigint generated always as identity primary key,
  kod text not null check (kod ~ '^[A-Za-z0-9-]{3,16}$'),
  tarih date not null,
  adim integer not null check (adim between 0 and 100000),
  kaynak text check (char_length(kaynak) <= 40),
  surum text check (char_length(surum) <= 20),
  alindi timestamptz not null default now()
);
alter table public.adim_deneme enable row level security;
-- Telefon (anon) yalnızca ekler, okuyamaz ve silemez
create policy "telefon_ekler" on public.adim_deneme for insert to anon
  with check (tarih between current_date - 30 and current_date + 1);
-- Panelde giriş yapan hesaplar okur
create policy "panel_okur" on public.adim_deneme for select to authenticated using (true);
-- Her kod ve gün için en son gönderim
create or replace view public.adim_gunluk with (security_invoker = true) as
  select distinct on (kod, tarih) kod, tarih, adim, kaynak, alindi
  from public.adim_deneme order by kod, tarih, alindi desc;
grant select on public.adim_gunluk to authenticated;
-- Deneme bitince:  drop view public.adim_gunluk; drop table public.adim_deneme;
