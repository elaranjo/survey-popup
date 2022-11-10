import 'antd/dist/antd.css';
import SurveyProvider from './contexts/survey.context';

import SurveyModal from './components/SurveyModal';

function App() {
  return (
    <SurveyProvider>
      <div className="App">
        <SurveyModal />
      </div>
    </SurveyProvider>
  )
}

export default App
