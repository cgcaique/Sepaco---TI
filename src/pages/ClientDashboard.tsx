import { Link } from 'react-router-dom';
import { Card, PageHeader } from '../components/UI';

export const ClientDashboard = () => (
  <div>
    <PageHeader title="Dashboard do Cliente" subtitle="Gerencie seus cards e encontre profissionais." />
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <h2 className="text-base font-semibold text-slate-900">Criar card</h2>
        <p className="mt-2 text-sm text-slate-600">Descreva a necessidade e receba candidaturas.</p>
        <Link to="/cliente/cards/novo" className="mt-4 inline-flex bg-brand-600 text-white">
          Novo card
        </Link>
      </Card>
      <Card>
        <h2 className="text-base font-semibold text-slate-900">Buscar profissionais</h2>
        <p className="mt-2 text-sm text-slate-600">Navegue pelo marketplace e agende com disponibilidade.</p>
        <Link to="/marketplace" className="mt-4 inline-flex border border-slate-200 bg-white text-slate-700">
          Ver marketplace
        </Link>
      </Card>
    </div>
  </div>
);
