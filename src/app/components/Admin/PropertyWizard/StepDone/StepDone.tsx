import * as React from 'react'
import { translate, InjectedTranslateProps } from 'react-i18next'
import {
  Grid, Row, Col,
} from 'react-bootstrap'

const s = require('./StepDone.less')

interface IProps extends InjectedTranslateProps {
  langCode: string
  isCreate: boolean
  onSubmit?()
}

const StepBasicInfo = (props: IProps) => {
  const { t } = props

  return (
    <div>
      <Grid>
        <Row>
          <Col xs={12}>
            <ul className={ s.dsBtn }>
              <li>
                <button className='btn btn-lg btn-success' onClick={ props.onSubmit }>
                  <i className='glyphicon glyphicon-ok pull-left'></i>
                  {
                    props.isCreate ? (
                      <span>
                        { t('create_the_property') }<br/>
                        <small>{ t('create_the_property_desc') }</small>
                      </span>
                    ) : (
                      <span>
                        { t('update_the_property') }<br/>
                        <small>{ t('update_the_property_desc') }</small>
                      </span>
                    )
                  }
                  
                </button>
              </li>
            </ul>
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

export default translate()(StepBasicInfo)
