import { Card, PageHeader, Badge } from '../components/UI';

const sampleJobs = [
  { id: 1, title: 'Cuidador noturno', status: 'open', proposals: 4 },
  { id: 2, title: 'Acompanhamento pós-cirúrgico', status: 'in_analysis', proposals: 2 },
  { id: 3, title: 'Fisioterapia domiciliar', status: 'closed', proposals: 6 }
];

export const JobsList = () => (
  <div>
    <PageHeader title="Seus cards" subtitle="Acompanhe status e propostas." />
    <div className="grid gap-4">
      {sampleJobs.map((job) => (
        <Card key={job.id}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold text-slate-900">{job.title}</h3>
              <p className="text-xs text-slate-500">{job.proposals} propostas recebidas</p>
            </div>
            <Badge
              label={job.status}
              tone={job.status === 'closed' ? 'success' : job.status === 'open' ? 'brand' : 'warning'}
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="border border-slate-200 bg-white text-slate-700">Ver propostas</button>
            <button className="bg-brand-600 text-white">Editar</button>
            {job.status === 'closed' && (
              <button className="border border-brand-600 text-brand-600">Reabrir</button>
            )}
          </div>
        </Card>
      ))}
    </div>
  </div>
);
