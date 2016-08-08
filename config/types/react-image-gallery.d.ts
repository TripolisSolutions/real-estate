/* tslint:disable:no-internal-module */
declare module reactImageGallery {

  export interface IProps {
    items: any
    infinite?: boolean
    lazyLoad?: boolean
    showThumbnails?: boolean
    showNav?: boolean
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