/* tslint:disable:no-internal-module */
declare module 'formsy-react' {

  interface Decorate<P> {
    (element: __React.SFC<any>): __React.SFC<P>
  }
  
  export function Decorator<P>(): Decorate<P>

  export interface IFormElementProps {
    setValue(v: any)
    getValue(): any
    isRequired(): boolean
  }

  export class Form extends __React.Component<{
    className: string
    onSubmit(data: any)
    onChange(data: any)
  }, {}>{
    render(): __React.DOMElement<any, any>
  }
}
/* tslint:enable*/