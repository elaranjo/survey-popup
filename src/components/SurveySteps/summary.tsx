import { Typography, Divider } from 'antd';

import SurveyWrapper, { SurveyStepsProps } from './formStep';

const { Title, Paragraph } = Typography;

const Summary = ({ formValues }: SurveyStepsProps) => {
  
  const listAnswers = (fields: string[], answer: Record<string, any>) => {
    return fields.map(fieldName => <>
      <Title key={`t-a-${fieldName.toUpperCase()}`} level={5}>{fieldName.toUpperCase()}</Title>
      <Paragraph key={`p-a-${fieldName.toUpperCase()}`}>{answer[fieldName]}</Paragraph>
    </>)
  }

  const listGroupAnswares = () => {
    const list = formValues.map((stepAnswers: any) => <>
      <Title key={`t-g-${stepAnswers.title.toUpperCase()}`} level={3}>{stepAnswers.title.toUpperCase()}</Title>
      {listAnswers(Object.keys(stepAnswers.answer), stepAnswers.answer)}
    </>)
    return (<>
      {list}
    </>)
  }

  return (<>
    <Title>Thank you</Title>
    <Paragraph>Please, review Your answers</Paragraph>
    <Divider />

    { formValues.length && listGroupAnswares() }
  </>)
}

export default SurveyWrapper(Summary, 'Summary');
