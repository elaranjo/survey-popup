import { Typography, Divider, Form, Select, Radio } from 'antd';

import SurveyWrapper, { SurveyStepsProps } from './formStep';

const { Title, Paragraph } = Typography;
const Identity = (props: SurveyStepsProps) => {
  
  return (<>
    <Title>Tell more about you</Title>
    <Paragraph>Give us some extra details</Paragraph>
    <Divider />
    <Form.Item label="Age" name="age" rules={[{ required: true }]}>
      <Select
        options={[...Array.from({length: 100}, (_, idx) => ({value: idx+1, label: idx+1}))]}
        onChange={(value) => {
          props.setFormValues({...props.formValues, age: value})
        }
      }/>
    </Form.Item>
    <Form.Item label="Gender" name="gender" rules={[{ required: true }]}>
      <Radio.Group 
        onChange={(ev) => {
          const { value } = ev.target;
          props.setFormValues({...props.formValues, password: value})
        }
      }>
        <Radio value='Male'>Male</Radio>
        <Radio value='Female'>Female</Radio>
        <Radio value='Other'>Other</Radio>
      </Radio.Group>
    </Form.Item>
  </>)
}

export default SurveyWrapper(Identity, 'Details');
