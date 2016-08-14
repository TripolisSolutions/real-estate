import * as React from 'react'
import { IOption } from 'formsy-react-components'

const s = require('./Dropdown.less')

interface IProps {
  defaultValue?: string
  placeHolder?: string
  options: IOption[]
  onChange(value: string)
}

function Dropdown(props: IProps) {
  return (
     <div className={ s.container } >
        <select defaultValue={ props.defaultValue } onChange={ (e) => props.onChange((e.target as any).value) }>
          {
            props.placeHolder ? (
              <option className={ s.option } value={ '' }>
                { props.placeHolder }
              </option>
            ) : undefined
          }
          {
            props.options.map((option, i) => (
              <option key={ option.value } className={ s.option } value={ option.value }>
                  { option.label }
              </option>
            ))
          }
        </select>
     </div>
  )
}

export default Dropdown
