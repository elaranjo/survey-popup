import { FC, useContext, useEffect, useState } from "react";
import { Form } from 'antd';
import { iQuestion, SurveyContextType } from "../../@types/survey";
import { SurveyContext } from '../../contexts/survey.context';


export type SurveyProps = {
  step: number;
  setTitle: (title: string) => void,
};

export type SurveyStepsProps = {
  step: number;
  formValues: Record<string, any>;
  setTitle: (title: string) => void,
  setFormValues: (values: any) => void,
}

const SurveyWrapper = (WrappedComponent: FC<SurveyStepsProps>, title: string) => {
  return (props: SurveyStepsProps) => {
    const { updateSurvey, loadSurvey, surveyData } = useContext(SurveyContext) as SurveyContextType;

    const [formValues, setFormValues] = useState({});
    const [formErrors, setFormErrors] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
      props.setTitle(title);
      const survey = loadSurvey();
      const currentAnswer = survey?.answers[props.step - 1];
      if (currentAnswer) {
        setFormValues(currentAnswer.answer)
      } else if (!title.localeCompare('Summary')) {
        setFormValues(surveyData.answers)
      }
    }, []);

    useEffect(() => {
      !!props.step && form.validateFields()
        .then(fields => {
          hasValue(fields) && saveQuestion({ title, answer: fields})
          canSubmit(true);
        })
        .catch(err => {
          setFormErrors(!err.errorFields.length);
          canSubmit(false);
        })
    }, [formValues]);

    const canSubmit = (enabled: boolean) => {
      updateSurvey({...surveyData, canProceed: enabled})
    }

    const saveQuestion = (answer: iQuestion) => {
      const answers = surveyData.answers;
      if(answers.length < surveyData.currentStep) {
        answers.push(answer);
      } else {
        answers[surveyData.currentStep - 1] = answer;
      }
      updateSurvey({...surveyData, answers});
    }

    const hasValue = (fields: Record<string, any>) => {
      const keys = Object.keys(fields)
      const values: string[] = [];
      keys.forEach(key => {
        if (!!fields[key] && fields[key] !== undefined)
          values.push(fields[key]);
      });
      return !!values.length;
    }
    
    return (
      <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} form={form} initialValues={surveyData?.answers[props.step -1]?.answer || {}}>
        <WrappedComponent 
          {...props} 
          formValues={formValues}
          setFormValues={setFormValues} 
        />
      </Form>
    )
  }
}

export default SurveyWrapper;
