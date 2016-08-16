import * as React from 'react'
import * as _ from 'lodash'
import { translate, InjectedTranslateProps } from 'react-i18next'
// import * as log from 'loglevel'
import {
  Grid, Row, Col,
} from 'react-bootstrap'

const ReactQuill = require('react-quill')

require('./quill.snow.less')
const s = require('./StepDescription.less')

interface IProps extends InjectedTranslateProps {
  langCode: string
  initialValue: string
  onChange(desc: string)
  onNext()
}

class StepDescription extends React.Component<IProps, void> {

  constructor(props: IProps) {
    super(props)
  }

  public render() {
    const { t } = this.props

    return (
      <Grid>
        <Row>
          <Col xs={12} className={ s.editor }>
            <ReactQuill theme='snow'
              className={ s.editor }
              defaultValue={ this.props.initialValue }
              onChange={_.debounce(this.props.onChange, 300) }
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <fieldset>
              <input className='btn btn-primary'
                formNoValidate={ true } type='button' defaultValue={ t('ok') }
                onClick={ this.props.onNext }
              />
            </fieldset>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default translate()(StepDescription)
