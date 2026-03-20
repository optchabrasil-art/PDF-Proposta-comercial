export interface ProposalData {
  clientName: string;
  projectName: string;
  date: string;
  presentation: string;
  context: string;
  goals: string;
  diagnosis: string;
  solution: string;
  scope: string;
  deliverables: string;
  timeline: string;
  investment: string;
  differentials: string;
  cta: string;
}

export const defaultProposalData: ProposalData = {
  clientName: '',
  projectName: '',
  date: new Date().toISOString().split('T')[0],
  presentation: '',
  context: '',
  goals: '',
  diagnosis: '',
  solution: '',
  scope: '',
  deliverables: '',
  timeline: '',
  investment: '',
  differentials: '',
  cta: 'Vamos começar?',
};
