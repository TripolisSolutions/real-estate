import * as React from 'react'
import { Row } from 'react-bootstrap'

import Icon from '../Icon/Icon'
import ButtonIcon from '../ButtonIcon/ButtonIcon'

const s = require('./Footer.less')

function Footer(props) {
  return (
    <div className={ 'container' }>
      <div className={ s.container }>
        <div className={ s.left }>
          <ul className={ s.items }>
            <li className={ s.phone }>
              <div>
                <Icon icon='phone' />
              </div>
              <div>
                <strong>English speaker:</strong>
                <p>Dean Walkerden (+84) 981 688 075</p>
                <strong>French-English-Vietnamese speaker:</strong>
                <p>Sonia-Phuong Tran (+84) 981 688 076</p>
              </div>
            </li>
            <li>
              <Icon icon='envelope' />
              <p>d2realstate@gmail.com</p>
            </li>
          </ul>
        </div>
        <div className={ s.right }>
          <Row>
            <div className={ s.button } >
              <ButtonIcon icon='facebook'/>
            </div>
            <div className={ s.button } >
              <ButtonIcon icon='facebook' text='share'/>
            </div>
            <div className={ s.button } >
              <ButtonIcon icon='twitter'/>
            </div>
            <div className={ s.button } >
              <ButtonIcon icon='twitter' text='tweet'/>
            </div>
          </Row>
          <p>Copy &copy; 2016 by YOUR SIDE</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
