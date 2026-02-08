import { useState } from 'react';
import { Card, PageHeader } from '../components/UI';

const sampleMessages = [
  { id: 1, author: 'Cliente', text: 'Olá! Qual sua disponibilidade?' },
  { id: 2, author: 'Profissional', text: 'Posso seg/qua à noite. Posso enviar detalhes.' }
];

export const ChatThread = () => {
  const [messages, setMessages] = useState(sampleMessages);
  const [newMessage, setNewMessage] = useState('');

  return (
    <div>
      <PageHeader title="Chat" subtitle="Mensagens em tempo real via Supabase." />
      <Card>
        <div className="space-y-3">
          {messages.map((message) => (
            <div key={message.id} className="rounded-lg bg-slate-50 p-3 text-sm">
              <p className="text-xs font-semibold text-slate-500">{message.author}</p>
              <p>{message.text}</p>
            </div>
          ))}
        </div>
        <form
          className="mt-4 flex flex-col gap-2 md:flex-row"
          onSubmit={(event) => {
            event.preventDefault();
            if (!newMessage) return;
            setMessages((prev) => [
              ...prev,
              { id: Date.now(), author: 'Você', text: newMessage }
            ]);
            setNewMessage('');
          }}
        >
          <input
            placeholder="Digite sua mensagem"
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
          />
          <button type="submit" className="bg-brand-600 text-white">
            Enviar
          </button>
        </form>
        <div className="mt-3 text-xs text-slate-500">
          <label>
            Anexar arquivo
            <input type="file" className="mt-1 text-xs" />
          </label>
        </div>
      </Card>
    </div>
  );
};
