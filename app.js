import TimeLineSlider from './node_modules/timeline-slider/src/TimeLineSlider.js';
// console.log(/)
// import TimeLineSlider from 'timeline-slider'; 

// import 'timeline-slider/css';

const timeLineSlider = new TimeLineSlider();

timeLineSlider.setStartEnd(1950,2020)
timeLineSlider.setStep(1);
timeLineSlider.setSpecialStep(10);