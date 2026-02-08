import { Card, PageHeader, Badge } from '../components/UI';

export const ProfessionalDashboard = () => (
  <div>
    <PageHeader title="Dashboard do Profissional" subtitle="Acompanhe candidaturas e agenda." />
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <h3 className="text-sm font-semibold text-slate-900">Cards abertos</h3>
        <p className="mt-2 text-2xl font-semibold text-brand-600">12</p>
      </Card>
      <Card>
        <h3 className="text-sm font-semibold text-slate-900">Minhas candidaturas</h3>
        <p className="mt-2 text-2xl font-semibold text-brand-600">4</p>
      </Card>
      <Card>
        <h3 className="text-sm font-semibold text-slate-900">Agenda da semana</h3>
        <p className="mt-2 text-sm text-slate-600">2 atendimentos confirmados</p>
      </Card>
    </div>
    <div className="mt-6 grid gap-4">
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-base font-semibold">Acompanhamento pós-cirúrgico</h4>
            <p className="text-xs text-slate-500">Cliente: Ana</p>
          </div>
          <Badge label="Em negociação" tone="warning" />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button className="bg-brand-600 text-white">Enviar disponibilidade</button>
          <button className="border border-slate-200 bg-white text-slate-700">Editar proposta</button>
        </div>
      </Card>
    </div>
  </div>
);
