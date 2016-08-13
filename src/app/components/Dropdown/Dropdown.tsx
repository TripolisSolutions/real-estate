import * as React from 'react'

const s = require('./Dropdown.less')

function Dropdown(props) {
  return (
     <div className={ s.container } >
        <ul>
          <li className={ s.option } >
            { props.defaultValue }
          </li>
          {
            this.props.options.map((option, i) => (
              <li className={ s.option } >
                  { option.value }
              </li>
            ))
          }
        </ul>
     </div>
  )
}

export default Dropdown

