/* tslint:disable:no-internal-module */
declare module googleMapReact {

  export interface IProps {
    bootstrapURLKeys?: Object
    options?: Object
    center?: any
    zoom?: any
    onClick?: Function
    onChange?: Function
  }

  export interface IState {}

  export class GoogleMapReact extends __React.Component<IProps, IState>{
    render(): __React.DOMElement<any, any>
  }
}

declare var GoogleMapReact: typeof googleMapReact.GoogleMapReact
declare module 'google-map-react' {
  export default GoogleMapReact
}
/* tslint:enable*/