/* tslint:disable:no-internal-module */
declare module 'react-multistep' {

  export interface IStep {
    name: string
    component: __React.ReactElement<any>
  }

  export interface IProps {
    showNavigation: boolean
    steps: IStep[]
  }

  export interface IState {}

  export default class Multistep extends __React.Component<IProps, IState>{
    render(): __React.DOMElement<any, any>
  }
}
/* tslint:enable*/