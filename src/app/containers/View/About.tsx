import * as React from 'react'
import { Col, Row } from 'react-bootstrap'
import { translate, InjectedTranslateProps } from 'react-i18next'

import LocationMap from '../../components/LocationMap/LocationMap'
import Block from '../../components/Block/Block'

const s = require('./About.less')

@translate()
class About extends React.Component<InjectedTranslateProps, any> {
  public render() {
    const { t } = this.props

    return (
      <div>
        <div className={ 'container' } >
          <Block title={ t('about_us_heading') } bigger ={ true }>
            <Row className={ s.img } >
              <Col md={6}>
                  <h2>Sonia Phương Trân</h2>
                  <img
                    src='http://www.incrediblethings.com/wp-content/uploads/2012/12/Alexa-Meade-Milk-Paintings-1.jpg'
                  />
              </Col>
              <Col md={6}>
                  <h2>Dean Walkerden</h2>
                  <img
                    src='http://4.bp.blogspot.com/-IrNv1zLJw-0/UIbGDQXXsmI/AAAAAAAAAGU/DjxOORCM0Lg/s1600/emma-hack_Car_shape_human_body_painting_interesting_art_sculpture.jpg'
                  />
              </Col>
            </Row>
            <div className= { s.text } dangerouslySetInnerHTML={{__html: t('about_us_content')}}>
            </div>
          </Block>
        </div>
        <LocationMap title={ t('home_location_heading') }/>
      </div>
    );
  }
}

export default About
