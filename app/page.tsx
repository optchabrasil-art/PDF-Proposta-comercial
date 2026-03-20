'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ProposalData, defaultProposalData } from '@/types/proposal';
import { ProposalForm } from '@/components/ProposalForm';
import { ProposalPreview } from '@/components/ProposalPreview';
import { FileDown, Save, RefreshCw } from 'lucide-react';

export default function Home() {
  const [data, setData] = useState<ProposalData>(defaultProposalData);
  const [isClient, setIsClient] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  // Load from localStorage on mount
  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem('proposalData');
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved data', e);
      }
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('proposalData', JSON.stringify(data));
    }
  }, [data, isClient]);

  const handleGeneratePDF = async () => {
    if (!previewRef.current) return;
    setIsGenerating(true);

    try {
      // Dynamically import html2pdf to avoid SSR issues
      const html2pdf = (await import('html2pdf.js')).default;
      
      const element = previewRef.current;
      const opt = {
        margin:       0,
        filename:     `Proposta_${data.clientName || 'Cliente'}.pdf`,
        image:        { type: 'jpeg' as const, quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, logging: false },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' as const }
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Ocorreu um erro ao gerar o PDF. Tente novamente.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('Tem certeza que deseja limpar todos os dados?')) {
      setData(defaultProposalData);
      localStorage.removeItem('proposalData');
    }
  };

  if (!isClient) return null; // Prevent hydration mismatch

  return (
    <div className="min-h-screen bg-brand-bg text-brand-dark font-sans flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-brand-gray sticky top-0 z-10 flex-shrink-0">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-accent rounded flex items-center justify-center text-white font-bold text-xl">
              P
            </div>
            <h1 className="text-xl font-bold tracking-tight">Proposta Pro</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-brand-accent transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Limpar</span>
            </button>
            <button
              onClick={handleGeneratePDF}
              disabled={isGenerating}
              className="flex items-center gap-2 px-5 py-2.5 bg-brand-accent hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <FileDown className="w-4 h-4" />
              )}
              <span>{isGenerating ? 'Gerando...' : 'Gerar PDF'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 h-[calc(100vh-4rem)]">
        {/* Left Column: Form */}
        <div className="w-full lg:w-1/2 xl:w-[45%] flex flex-col h-full bg-white rounded-2xl shadow-sm border border-brand-gray overflow-hidden">
          <div className="p-6 border-b border-brand-gray bg-gray-50 flex-shrink-0">
            <h2 className="text-2xl font-bold text-brand-dark mb-1">Preencha os dados</h2>
            <p className="text-gray-500 text-sm">As alterações são salvas automaticamente no seu navegador.</p>
          </div>
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            <ProposalForm data={data} onChange={setData} />
          </div>
        </div>

        {/* Right Column: Preview */}
        <div className="w-full lg:w-1/2 xl:w-[55%] bg-gray-200/50 p-4 sm:p-8 rounded-2xl border border-brand-gray overflow-y-auto flex justify-center items-start h-full custom-scrollbar relative">
          <div className="absolute top-4 right-4 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs font-medium text-gray-500 border border-gray-200 shadow-sm z-10">
            Preview em tempo real
          </div>
          <div className="transform origin-top scale-[0.5] sm:scale-75 md:scale-90 lg:scale-[0.65] xl:scale-75 2xl:scale-90 transition-transform pb-32">
            <ProposalPreview data={data} ref={previewRef} />
          </div>
        </div>
      </main>
    </div>
  );
}
