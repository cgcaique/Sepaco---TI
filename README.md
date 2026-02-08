# CuidaJá MVP

MVP funcional do marketplace de home care com React + Vite + TypeScript + Tailwind e backend via Supabase (Auth + Postgres + Storage + Realtime).

## ✅ Requisitos atendidos
- Dois modos: **Cliente publica Card** e **Cliente escolhe Profissional**.
- Perfis: admin, cliente, profissional.
- Profissional com aprovação (`status_verificacao`), limitação de candidaturas (20/mês), contra-proposta com variação parametrizável, chat realtime e disponibilidade.

## Stack
- React + Vite + TypeScript
- TailwindCSS
- Supabase (Auth + Postgres + Storage + Realtime)

## Setup do projeto

### 1) Instalar dependências
```bash
npm install
```

### 2) Configurar variáveis de ambiente
Crie um arquivo `.env` com base em `.env.example`:
```bash
cp .env.example .env
```
Preencha com a URL e chave pública do seu projeto Supabase.

### 3) Aplicar o schema no Supabase
No Supabase SQL Editor, execute:
```sql
-- arquivo em /supabase/schema.sql
```

### 4) Rodar localmente
```bash
npm run dev
```

## Estrutura do banco (Supabase)
O schema completo está em [`/supabase/schema.sql`](supabase/schema.sql).

Inclui:
- Tabelas de usuários base e perfis específicos
- Jobs (cards), propostas, bookings
- Disponibilidade e bloqueios
- Chats, mensagens e anexos
- Assinaturas
- Logs de ações admin
- Políticas RLS para cliente, profissional e admin
- Buckets privados para documentos e anexos

## Regras de negócio (MVP)
- Profissional bloqueado até aprovação do admin.
- Cadastro do profissional com documentos obrigatórios (bucket privado).
- Limite de 20 candidaturas por mês (RLS + função).
- Contra-proposta: variação padrão ±50% (campo `negotiation_variation` em jobs).
- Status do card: open, in_analysis, negotiating, awaiting_confirmation, closed, reopened.
- Chat com mensagens persistidas e realtime.
- Disponibilidade por semana + bloqueios.
- Trial 30 dias e assinatura R$50/mês modelada em `subscriptions`.

## Scripts úteis
- `npm run dev`: inicia o frontend
- `npm run build`: build de produção
- `npm run lint`: lint

## Observações de segurança
- Endereço completo do cliente não é exibido no marketplace antes do match.
- Buckets de Storage são privados.
