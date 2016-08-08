import * as React from 'react'

interface IProps extends React.Props<any> {
  stepNumber?: number
  isActive?: boolean
  isSibling?: boolean
  customNavigator?: string
}

const Step = (props: IProps) => (
  <div
    className={`step-item step-${props.stepNumber} active-${props.isActive}`}
    style={{display: props.isActive ? 'block' : 'none'}}
  >
    {props.isActive || props.isSibling ? props.children : ''}
  </div>
)

export default Step
