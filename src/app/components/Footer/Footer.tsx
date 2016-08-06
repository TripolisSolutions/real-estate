import * as React from 'react'

import Icon from '../Icon/Icon'
import ButtonIcon from '../ButtonIcon/ButtonIcon'

const s = require('./Footer.less')

function Footer(props) {
  return (
    <div className={ 'container' }>
      <div className={ s.container }>
        <div className={ s.left }>
          <ul className={ s.items }>
            <li>
              <Icon icon='map-marker' />
              <p>215F3 Nguyen Van Huong st. Thao Dien, District 2, HCMC, Vietnam</p>
            </li>
            <li>
              <Icon icon='phone' />
              <p>(84) 1231549)</p>
            </li>
            <li>
              <Icon icon='envelope' />
              <p>myemail@gmail.com</p>
            </li>
          </ul>
        </div>
        <div className={ s.right }>
          <div className={ 'row' }>
            <div className={ s.button } >
              <ButtonIcon icon='twitter'/>
            </div>
            <div className={ s.button } >
              <ButtonIcon icon='facebook'/>
            </div>
          </div>
          <p>Copy &copy; 2016 by YOUR SIDE</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
