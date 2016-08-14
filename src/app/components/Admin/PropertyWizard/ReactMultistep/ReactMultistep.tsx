import * as React from 'react'
import { Component } from 'react'

export interface IStep {
  name: string
  component: React.ReactElement<any>
}

interface IProps {
  showNavigation: boolean
  steps: IStep[]
  onNavigated?(step: IStep, index: number)
}

interface IState {
  showPreviousBtn: boolean
  showNextBtn: boolean
  compState: number
  navState: {
    styles: string[]
    current: number
  }
}

export default class MultiStep extends Component<IProps, IState> {
  private hidden: Object

  constructor(props: IProps) {
    super(props)
    this.state = {
      showPreviousBtn: false,
      showNextBtn: true,
      compState: 0,
      navState: this.getNavStates(0, this.props.steps.length),
    }
    this.hidden = {
      display: 'none',
    }
    this.handleOnClick = this.handleOnClick.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
  }

  public getNavStates(indx, length) {
    let styles = []
    for (let i = 0; i < length; i++) {
      if (i < indx) {
        styles.push('done')
      } else if (i === indx) {
        styles.push('doing')
      } else {
        styles.push('todo')
      }
    }
    return { current: indx, styles: styles }
  }

  public checkNavState(currentStep) {
    if (currentStep > 0 && currentStep !== this.props.steps.length - 1) {
      this.setState(Object.assign({
        showPreviousBtn: true,
        showNextBtn: true,
      }))
    } else if (currentStep === 0) {
      this.setState(Object.assign({
        showPreviousBtn: false,
        showNextBtn: true,
      }))
    } else {
      this.setState(Object.assign({
        showPreviousBtn: true,
        showNextBtn: false,
      }))
    }
  }

  public setNavState(next) {
    this.setState(Object.assign({navState: this.getNavStates(next, this.props.steps.length)}))
    if (next < this.props.steps.length) {
      this.setState(Object.assign({compState: next}))
    }
    this.checkNavState(next)

    if (this.props.onNavigated) {
      this.props.onNavigated(this.props.steps[next], next)
    }
  }

  private handleKeyDown(evt) {
    if (evt.which === 13) {
      // this.next()
    }
  }

  private handleOnClick(evt) {
    if (evt.currentTarget.value === (this.props.steps.length - 1) &&
      this.state.compState === (this.props.steps.length - 1)) {
      this.setNavState(this.props.steps.length)
    } else {
      this.setNavState(evt.currentTarget.value)
    }
  }

  private next() {
    this.setNavState(this.state.compState + 1)
  }

  private previous() {
    if (this.state.compState > 0) {
      this.setNavState(this.state.compState - 1)
    }
  }

  private getClassName(className, i) {
    return className + '-' + this.state.navState.styles[i]
  }

  private renderSteps() {
    return this.props.steps.map((s, i) => (
      <li className={this.getClassName('progtrckr', i)} onClick={this.handleOnClick} key={i} value={i}>
        <em>{i + 1}</em>
        <span>{this.props.steps[i].name}</span>
      </li>
    ))
  }

  public render() {
    return (
      <div className='container' onKeyDown={this.handleKeyDown}>
        <ol className='progtrckr'>
          {this.renderSteps()}
        </ol>
        {
          this.props.steps.map((step, i) => (
            <div key={ step.name } style={{
              display: i === this.state.compState ? 'block' : 'none',
            }}>
              { step.component }
            </div>
          ))
        }
        <div style={this.props.showNavigation ? {} : this.hidden}>
          <button style={this.state.showPreviousBtn ? {} : this.hidden}
                  className='multistep__btn--prev'
                  onClick={this.previous}>Previous</button>

          <button style={this.state.showNextBtn ? {} : this.hidden}
                  className='multistep__btn--next'
                  onClick={this.next}>Next</button>
        </div>
      </div>
    )
  }
}
