import { Button, Modal, ModalProps } from 'antd';
import { useEffect, useState, useContext } from 'react';

import { SurveyContext } from '../../contexts/survey.context';
import { SurveyContextType } from '../../@types/survey';
import SurveySteps from '../SurveySteps';

const startFooter = (start: ()=> void) => [
  <Button key='start' type='primary' onClick={start}>Start</Button>
];
const surveyFooter = (back: () => void, next: ()=> void, canProceed: boolean) => [
  <Button key='back' onClick={back}>Back</Button>,
  <Button key='next' type='primary' onClick={next} disabled={!canProceed}>Next</Button>,
];
const submitFooter = (back: () => void, submit: ()=> void, canProceed: boolean) => [
  <Button key='back' onClick={back}>Back</Button>,
  <Button key='submit' type='primary' onClick={submit} disabled={!canProceed}>Submit</Button>
];

const SurveyPopup = (props: ModalProps) => {
  const [footer, setFooter] = useState<JSX.Element[] | null>(null);
  const { nextStep, backStep, submitSurvey, surveyData } = useContext(SurveyContext) as SurveyContextType;
  const [canOpenModal, setCanOpenModal] = useState(false);

  useEffect(() => {
    const newFooter = startFooter(()=> nextStep());
    setFooter(newFooter);

    setTimeout(() => {
      setCanOpenModal(!surveyData.submited)
    }, 2000);
  }, []); 

  useEffect(() => {
    if (surveyData.currentStep === 0) {
      setFooter(startFooter(nextStep));
    } else if (surveyData.currentStep === 4) {
      setFooter(submitFooter(backStep, submitSurvey, surveyData.canProceed));
    } else {
      setFooter(surveyFooter(backStep, nextStep, surveyData.canProceed));
    }
  }, [surveyData]);

  const [modalTitle, setModalTitle] = useState<string>('');

  return (
    <Modal {...props} open={canOpenModal} title={modalTitle} footer={footer} >
      <SurveySteps step={surveyData.currentStep} setTitle={setModalTitle} />
    </Modal>
  );
}

export default SurveyPopup;
