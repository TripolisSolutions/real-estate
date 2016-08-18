/* tslint:disable:no-internal-module */
declare module 'formsy-react-components' {

  interface IElementProps {
    name: string
    defaultValue?: string
    label?: string
    placeholder?: string
    type?: string
    labelClassName?: string
    disabled?: boolean
    addonAfter?: __React.ReactElement<any>
  }

  interface IInputProps extends IElementProps {
    value?: string
  }

  interface ICheckboxProps extends IElementProps {
    value?: boolean
  }

  export class Checkbox extends __React.Component<ICheckboxProps, {}>{
    render(): __React.DOMElement<any, any>
  }

  export class CheckboxGroup extends __React.Component<ICheckboxProps, {}>{
    render(): __React.DOMElement<any, any>
  }

  export class Input extends __React.Component<IInputProps, {}>{
    render(): __React.DOMElement<any, any>
  }

  export class RadioGroup extends __React.Component<IInputProps, {}>{
    render(): __React.DOMElement<any, any>
  }

  interface IRowProps {
    label?: string
    layout?: string
  }

  export class Row extends __React.Component<IRowProps, {}>{
    render(): __React.DOMElement<any, any>
  }

  export interface IOption {
    value: string
    label: string
  }

  interface ISelectProps extends IInputProps {
    options: IOption[]
  }

  export class Select extends __React.Component<ISelectProps, {}>{
    render(): __React.DOMElement<any, any>
  }
}
/* tslint:enable*/