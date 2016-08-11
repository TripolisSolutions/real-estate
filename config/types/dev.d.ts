/**
 * Type declerations for global development variables
 */

// A hack for the Redux DevTools Chrome extension.
interface Window {
  devToolsExtension?: () => any;
  __CONFIG__?: any
  __INITIAL_STATE__?: any;
  ALLOYEDITOR_BASEPATH: string
  CKEDITOR_BASEPATH: string
}

interface ObjectConstructor {
  assign(target: any, ...sources: any[]): any;
}

/* tslint:disable:no-internal-module */
declare module 'react/lib/update' {
  namespace update {}
  function update (...arg: any[]): any
  export = update
}
/* tslint:enable*/