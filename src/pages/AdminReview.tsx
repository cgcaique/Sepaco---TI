import { Card, PageHeader, Badge } from '../components/UI';

const pendingProfessionals = [
  { id: 1, name: 'Marina Costa', profession: 'Cuidadora', status: 'pending_review' },
  { id: 2, name: 'Pedro Almeida', profession: 'Enfermeiro', status: 'pending_review' }
];

export const AdminReview = () => (
  <div>
    <PageHeader title="Admin" subtitle="Aprovação de profissionais" />
    <div className="grid gap-4">
      {pendingProfessionals.map((professional) => (
        <Card key={professional.id}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold">{professional.name}</h3>
              <p className="text-xs text-slate-500">{professional.profession}</p>
            </div>
            <Badge label={professional.status} tone="warning" />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="bg-brand-600 text-white">Aprovar</button>
            <button className="border border-rose-200 bg-rose-50 text-rose-600">Rejeitar</button>
          </div>
        </Card>
      ))}
    </div>
  </div>
);
