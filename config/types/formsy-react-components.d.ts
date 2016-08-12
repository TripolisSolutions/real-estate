/* tslint:disable:no-internal-module */
declare module 'formsy-react-components' {

  interface IElementProps {
    name: string
    value?: string
    defaultValue?: string
    label?: string
    placeholder?: string
    type?: string
    labelClassName?: string
    addonAfter?: __React.ReactElement<any>
  }

  export class Checkbox extends __React.Component<IElementProps, {}>{
    render(): __React.DOMElement<any, any>
  }

  export class CheckboxGroup extends __React.Component<IElementProps, {}>{
    render(): __React.DOMElement<any, any>
  }

  export class Input extends __React.Component<IElementProps, {}>{
    render(): __React.DOMElement<any, any>
  }

  export class RadioGroup extends __React.Component<IElementProps, {}>{
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

  interface ISelectProps extends IElementProps {
    options: IOption[]
  }

  export class Select extends __React.Component<ISelectProps, {}>{
    render(): __React.DOMElement<any, any>
  }
}
/* tslint:enable*/