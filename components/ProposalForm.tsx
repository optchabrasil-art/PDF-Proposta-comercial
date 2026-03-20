import React from 'react';
import { ProposalData } from '@/types/proposal';

interface ProposalFormProps {
  data: ProposalData;
  onChange: (data: ProposalData) => void;
}

export function ProposalForm({ data, onChange }: ProposalFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  const inputClass = "w-full p-3 border border-brand-gray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent bg-white text-brand-dark";
  const labelClass = "block text-sm font-medium text-brand-dark mb-1";
  const sectionClass = "bg-white p-6 rounded-xl shadow-sm border border-brand-gray/50 space-y-4 mb-6";
  const sectionTitleClass = "text-lg font-semibold text-brand-dark border-b border-brand-gray pb-2 mb-4";

  return (
    <div className="space-y-6">
      <div className={sectionClass}>
        <h2 className={sectionTitleClass}>1. Informações Básicas (Capa)</h2>
        <div>
          <label className={labelClass}>Nome do Cliente</label>
          <input type="text" name="clientName" value={data.clientName} onChange={handleChange} className={inputClass} placeholder="Ex: Empresa XYZ" />
        </div>
        <div>
          <label className={labelClass}>Nome do Projeto</label>
          <input type="text" name="projectName" value={data.projectName} onChange={handleChange} className={inputClass} placeholder="Ex: Redesign de Website" />
        </div>
        <div>
          <label className={labelClass}>Data</label>
          <input type="date" name="date" value={data.date} onChange={handleChange} className={inputClass} />
        </div>
      </div>

      <div className={sectionClass}>
        <h2 className={sectionTitleClass}>2. Apresentação</h2>
        <div>
          <label className={labelClass}>Sobre a Empresa/Profissional</label>
          <textarea name="presentation" value={data.presentation} onChange={handleChange} className={inputClass} rows={4} placeholder="Breve introdução sobre você ou sua empresa, com tom de autoridade." />
        </div>
      </div>

      <div className={sectionClass}>
        <h2 className={sectionTitleClass}>3. Contexto & Diagnóstico</h2>
        <div>
          <label className={labelClass}>Contexto do Cliente</label>
          <textarea name="context" value={data.context} onChange={handleChange} className={inputClass} rows={3} placeholder="Resumo do que foi entendido na reunião." />
        </div>
        <div>
          <label className={labelClass}>Objetivos do Projeto</label>
          <textarea name="goals" value={data.goals} onChange={handleChange} className={inputClass} rows={3} placeholder="O que o cliente deseja alcançar." />
        </div>
        <div>
          <label className={labelClass}>Diagnóstico</label>
          <textarea name="diagnosis" value={data.diagnosis} onChange={handleChange} className={inputClass} rows={3} placeholder="Principais problemas, gargalos ou oportunidades." />
        </div>
      </div>

      <div className={sectionClass}>
        <h2 className={sectionTitleClass}>4. A Solução</h2>
        <div>
          <label className={labelClass}>Solução Proposta</label>
          <textarea name="solution" value={data.solution} onChange={handleChange} className={inputClass} rows={4} placeholder="Explicação clara da estratégia (foco em valor)." />
        </div>
        <div>
          <label className={labelClass}>Escopo do Projeto</label>
          <textarea name="scope" value={data.scope} onChange={handleChange} className={inputClass} rows={4} placeholder="Lista detalhada do que está incluso." />
        </div>
        <div>
          <label className={labelClass}>Entregáveis</label>
          <textarea name="deliverables" value={data.deliverables} onChange={handleChange} className={inputClass} rows={3} placeholder="O que será entregue ao cliente (ex: 1 PDF, 3 Telas, etc)." />
        </div>
      </div>

      <div className={sectionClass}>
        <h2 className={sectionTitleClass}>5. Prazos & Valores</h2>
        <div>
          <label className={labelClass}>Cronograma (Prazos e Etapas)</label>
          <textarea name="timeline" value={data.timeline} onChange={handleChange} className={inputClass} rows={3} placeholder="Ex: Etapa 1 (10 dias) - Pesquisa..." />
        </div>
        <div>
          <label className={labelClass}>Investimento</label>
          <textarea name="investment" value={data.investment} onChange={handleChange} className={inputClass} rows={3} placeholder="Valor do projeto e condições de pagamento." />
        </div>
      </div>

      <div className={sectionClass}>
        <h2 className={sectionTitleClass}>6. Fechamento</h2>
        <div>
          <label className={labelClass}>Diferenciais (Por que escolher você?)</label>
          <textarea name="differentials" value={data.differentials} onChange={handleChange} className={inputClass} rows={3} placeholder="Autoridade, método, experiência." />
        </div>
        <div>
          <label className={labelClass}>Call to Action</label>
          <input type="text" name="cta" value={data.cta} onChange={handleChange} className={inputClass} placeholder="Ex: Vamos começar?" />
        </div>
      </div>
    </div>
  );
}
