import * as React from 'react'

const s = require('./Dropdown.less')

function Dropdown(props) {
  return (
     <div className={ s.container } >
        <select>
          <option className={ s.option } value={ props.defaultValue }>
            { props.defaultValue }
          </option>
          {
            props.options.map((option, i) => (
              <option className={ s.option } value={ option.value }>
                  { option.value }
              </option>
            ))
          }
        </select>
     </div>
  )
}

export default Dropdown

