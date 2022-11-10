import { Typography, Divider, Form, Input, Checkbox } from 'antd';

import SurveyWrapper, { SurveyStepsProps } from './formStep';

const { Title, Paragraph } = Typography;
const Identity = (props: SurveyStepsProps) => {
  
  return (<>
    <Title>About your preferences</Title>
    <Paragraph>tell us what you like</Paragraph>
    <Divider />
    <Form.Item label="Favorite Book" name="book" rules={[{ required: true }]}>
      <Input
        onChange={(value) => {
          props.setFormValues({...props.formValues, book: value})
        }
      }/>
    </Form.Item>
    <Form.Item label="Favorite Colors" name="colors" rules={[{ required: true }]}>
      <Checkbox.Group
        options={['Black', 'White', 'Purple', 'Red', 'Yellow', 'Pink']}
        onChange={(value) => {
          props.setFormValues({...props.formValues, colors: value})
        }
      }/>
    </Form.Item>
  </>)
}

export default SurveyWrapper(Identity, 'Favorites');
