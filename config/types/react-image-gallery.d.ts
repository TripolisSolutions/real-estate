/* tslint:disable:no-internal-module */
declare module reactImageGallery {

  export interface IProps {
    showThumbnails: boolean
    items: any
  }

  export interface IState {}

  export class ReactImageGallery extends __React.Component<IProps, IState>{
    render(): __React.DOMElement<any, any>
  }
}

declare var ImageGallery: typeof reactImageGallery.ReactImageGallery
declare module 'react-image-gallery' {
  export default ImageGallery
}
/* tslint:enable*/