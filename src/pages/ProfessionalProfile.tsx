import { Card, PageHeader, SectionTitle } from '../components/UI';

export const ProfessionalProfile = () => (
  <div>
    <PageHeader title="Perfil do Profissional" subtitle="Disponibilidade e habilidades." />
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <h2 className="text-lg font-semibold">Fernanda Oliveira</h2>
        <p className="text-sm text-slate-500">Enfermeira · CRM 12345</p>
        <p className="mt-3 text-sm text-slate-600">
          Especialidades: pós-operatório, curativos, administração de medicamentos.
        </p>
        <p className="mt-3 text-xs text-slate-500">Localização: São Paulo (endereço completo protegido).</p>
      </Card>
      <Card>
        <SectionTitle label="Disponibilidade" />
        <ul className="space-y-2 text-sm text-slate-600">
          <li>Segunda: 08h - 12h</li>
          <li>Quarta: 14h - 18h</li>
          <li>Sábado: 09h - 12h</li>
        </ul>
        <button className="mt-4 bg-brand-600 text-white">Solicitar agendamento</button>
      </Card>
    </div>
  </div>
);
