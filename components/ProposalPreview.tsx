import React, { forwardRef } from 'react';
import { ProposalData } from '@/types/proposal';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ProposalPreviewProps {
  data: ProposalData;
}

const Section = ({ title, content }: { title: string; content: string }) => {
  if (!content) return null;
  return (
    <div className="mb-10 break-inside-avoid">
      <h3 className="text-xl font-bold text-brand-dark mb-4 flex items-center">
        <span className="w-2 h-6 bg-brand-accent mr-3 inline-block rounded-sm"></span>
        {title}
      </h3>
      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-[15px]">
        {content}
      </p>
    </div>
  );
};

export const ProposalPreview = forwardRef<HTMLDivElement, ProposalPreviewProps>(
  ({ data }, ref) => {
    const formattedDate = data.date
      ? format(new Date(data.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
      : '';

    return (
      <div
        ref={ref}
        className="bg-white w-full max-w-[210mm] mx-auto min-h-[297mm] shadow-2xl overflow-hidden text-brand-dark relative"
        style={{
          padding: '20mm',
          boxSizing: 'border-box',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* Capa */}
        <div className="min-h-[257mm] flex flex-col justify-center items-start relative z-10 mb-20">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-bg rounded-bl-full -z-10 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-accent rounded-tr-full -z-10 opacity-10"></div>
          
          <div className="border-l-8 border-brand-accent pl-10 py-4">
            <p className="text-brand-accent uppercase tracking-[0.2em] text-sm font-bold mb-6">
              Proposta Comercial
            </p>
            <h1 className="text-6xl font-black text-brand-dark mb-8 leading-[1.1] tracking-tight">
              {data.projectName || 'Nome do Projeto'}
            </h1>
            <div className="bg-brand-bg px-6 py-4 inline-block rounded-r-lg border-l-2 border-brand-dark">
              <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Preparado para</p>
              <p className="text-2xl font-bold text-brand-dark">
                {data.clientName || 'Nome do Cliente'}
              </p>
            </div>
          </div>
          
          <div className="mt-auto pt-20 w-full flex justify-between items-end border-t border-brand-gray">
            <p className="text-gray-500 font-medium">{formattedDate}</p>
            <div className="text-right">
              <p className="text-sm text-gray-400 uppercase tracking-widest">Confidencial</p>
            </div>
          </div>
        </div>

        <div className="html2pdf__page-break"></div>

        {/* Apresentação */}
        {data.presentation && (
          <div className="mb-14 break-inside-avoid">
            <h2 className="text-3xl font-black text-brand-dark mb-8 tracking-tight">Apresentação</h2>
            <div className="bg-brand-bg p-8 rounded-2xl border-l-4 border-brand-accent text-gray-800 leading-relaxed whitespace-pre-wrap text-[15px] shadow-sm">
              {data.presentation}
            </div>
          </div>
        )}

        {/* Contexto & Diagnóstico */}
        {(data.context || data.diagnosis || data.goals) && (
          <div className="mb-14">
            <h2 className="text-3xl font-black text-brand-dark mb-8 tracking-tight">O Desafio</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              <div>
                <Section title="Contexto do Cliente" content={data.context} />
                <Section title="Diagnóstico" content={data.diagnosis} />
              </div>
              <div>
                <Section title="Objetivos do Projeto" content={data.goals} />
              </div>
            </div>
          </div>
        )}

        <div className="html2pdf__page-break"></div>

        {/* A Solução */}
        {(data.solution || data.scope || data.deliverables) && (
          <div className="mb-14">
            <h2 className="text-3xl font-black text-brand-dark mb-8 tracking-tight">A Solução</h2>
            
            {data.solution && (
              <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap mb-10 text-[15px]">
                {data.solution}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              <Section title="Escopo do Projeto" content={data.scope} />
              <Section title="Entregáveis" content={data.deliverables} />
            </div>
          </div>
        )}

        {/* Prazos & Valores */}
        {(data.timeline || data.investment) && (
          <div className="mb-14 break-inside-avoid">
            <h2 className="text-3xl font-black text-brand-dark mb-8 tracking-tight">Prazos & Investimento</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.timeline && (
                <div className="bg-white p-8 rounded-2xl border border-brand-gray shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-brand-dark"></div>
                  <h3 className="text-xl font-bold text-brand-dark mb-4 flex items-center">
                    <span className="text-brand-gray font-black text-3xl mr-3 opacity-50">01</span>
                    Cronograma
                  </h3>
                  <p className="text-gray-700 whitespace-pre-wrap text-[15px]">{data.timeline}</p>
                </div>
              )}
              
              {data.investment && (
                <div className="bg-brand-dark p-8 rounded-2xl shadow-lg relative overflow-hidden text-white">
                  <div className="absolute top-0 left-0 w-full h-1 bg-brand-accent"></div>
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <span className="text-gray-600 font-black text-3xl mr-3 opacity-50">02</span>
                    Investimento
                  </h3>
                  <p className="text-gray-200 whitespace-pre-wrap text-[15px] font-medium">{data.investment}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Diferenciais */}
        {data.differentials && (
          <div className="mb-14 break-inside-avoid">
            <h2 className="text-3xl font-black text-brand-dark mb-8 tracking-tight">Por que nos escolher?</h2>
            <div className="bg-brand-bg p-8 rounded-2xl text-gray-800 leading-relaxed whitespace-pre-wrap text-[15px]">
              {data.differentials}
            </div>
          </div>
        )}

        {/* CTA */}
        {data.cta && (
          <div className="mt-20 text-center bg-brand-accent text-white p-16 rounded-2xl shadow-xl break-inside-avoid relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white rounded-full opacity-10"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-black rounded-full opacity-10"></div>
            
            <h2 className="text-4xl font-black mb-6 relative z-10">{data.cta}</h2>
            <p className="text-white/90 text-lg relative z-10">Aguardamos o seu retorno para darmos o próximo passo.</p>
          </div>
        )}
      </div>
    );
  }
);

ProposalPreview.displayName = 'ProposalPreview';

