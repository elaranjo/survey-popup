export interface iQuestion {
  title: string;
  answer: Record<string, any>;
}

export interface iSurvey {
  currentStep: number;
  submited: boolean;
  canProceed: boolean;
  answers: iQuestion[];
}

export type SurveyContextType = {
  surveyData: iSurvey;
  updateSurvey: (newSurveyData: iSurvey) => void;
  nextStep: () => void;
  backStep: () => void;
  loadSurvey: () => iSurvey;
  submitSurvey: () => void;
}

