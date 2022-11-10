import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { SurveyContextType, iSurvey } from "../@types/survey";
import storage from 'store';

interface SurveyProviderProps {
  children: ReactNode;
}

export const SurveyContext = createContext<SurveyContextType | null>(null);

const initialState: iSurvey = {
  currentStep: 0,
  submited: false,
  canProceed: false,
  answers: [],
}

const SurveyProvider: FC<SurveyProviderProps> = ({ children }) => {
  const localData = storage.get('yieldstreet-test')
  const [surveyData, setSurveyData] = useState<iSurvey>(localData ? localData : initialState);
  
  useEffect(() => {
    storage.set('yieldstreet-test', surveyData);
  }, [surveyData]);

  const updateSurvey = (newSurveyData: iSurvey) => {
    setSurveyData({...newSurveyData})
  }

  const nextStep = () => {
    setSurveyData((data) => {
      const newData = {...data, currentStep: data.currentStep + 1};      
      storage.set('yieldstreet-test', newData);
      return newData;
    })
  }

  const backStep = () => {
    setSurveyData((data) => {
      const newData = {...data, currentStep: data.currentStep - 1};      
      storage.set('yieldstreet-test', newData);
      return newData;
    })
  }

  const loadSurvey = () => {
    const data = storage.get('yieldstreet-test');
    setSurveyData({...data});
    return data;
  }

  const submitSurvey = () => {
    setSurveyData({...surveyData, submited: true});
  }
  
  return (<SurveyContext.Provider value={{ surveyData, updateSurvey, nextStep, backStep, loadSurvey, submitSurvey }}>
    {children}
  </SurveyContext.Provider>)
}

export default SurveyProvider;