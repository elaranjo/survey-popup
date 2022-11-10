import { Typography } from 'antd';

import SurveyWrapper, { SurveyProps } from './formStep';

const { Title, Paragraph } = Typography;

const Presentation = (props: SurveyProps) => {
  
  return (<>
    <Title>Welcome to our survey</Title>
    <Paragraph>Please answer the following questions and click on the buttons to navigate between the questions.</Paragraph>
  </>)
}

export default SurveyWrapper(Presentation, 'Welcome');