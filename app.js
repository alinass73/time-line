// console.log(/)
// import TimeLineSlider from 'timeline-slider'; 
import TimeLineSlider from './TimeLineSlider.js';

// import 'timeline-slider/css';

const timeLineSlider = new TimeLineSlider();

timeLineSlider.setStartEnd(1950,2020)
timeLineSlider.setStep(1);
timeLineSlider.setSpecialStep(10);
