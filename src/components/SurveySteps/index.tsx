import Presentation from "./presentation";
import Identity from "./identity";
import Details from "./details";
import Favorites from "./favorites";
import Summary from "./summary";
import { SurveyProps, SurveyStepsProps } from './formStep';

const steps = (props: SurveyStepsProps) => [
  <Presentation {...props} />,
  <Identity {...props} />,
  <Details {...props} />,
  <Favorites {...props} />,
  <Summary {...props} />,
];

const SurveySteps = (props: SurveyProps) => {
  const { step } = props;

  return <>{ steps(props as SurveyStepsProps)[step] }</>
} 


export default SurveySteps;
