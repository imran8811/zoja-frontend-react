import { useState } from "react";

const Steps = (props) => {
  const { steps, setActiveStep, initialStep } = props;
  return (
    <ul className="steps mb-2">
      { steps.map(step => {
        return (
          <li 
            key={step.stepNo} 
            className={initialStep===step.stepNo? 'active' : '' + 'cursor-pointer text-capitalize'} 
            onClick={() => {setActiveStep(step.stepNo)}}>{step.label}
          </li>
        )
      })}
    </ul>
  )
}

export default Steps;