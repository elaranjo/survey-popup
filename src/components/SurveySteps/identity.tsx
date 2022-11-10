import { Typography, Divider, Form, Input } from 'antd';
import { useEffect } from 'react';
import SurveyWrapper, { SurveyStepsProps } from './formStep';

const { Title, Paragraph } = Typography;

const Identity = (props: SurveyStepsProps) => {
  useEffect(() => {
    const values = props.formValues ? props.formValues : {}
    props.setFormValues(values);
  }, [props.formValues]);

  const form = Form.useFormInstance()

  return (<>
    <Title>Who you are?</Title>
    <Paragraph>We want to know more about you</Paragraph>
    <Divider />
    <Form.Item label="Name" name="name">
      <Input
        onChange={(ev) => {
          const { value } = ev.target;
          props.setFormValues({...props.formValues, name: value})
        }
      }/>
    </Form.Item>
    <Form.Item label="Email" name="email">
      <Input 
        onChange={(ev) => {
          const { value } = ev.target;
          props.setFormValues({...props.formValues, password: value})
        }
      }/>
    </Form.Item>
  </>)
}

export default SurveyWrapper(Identity, 'Identity');
