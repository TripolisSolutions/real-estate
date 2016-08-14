import * as React from 'react';
import * as Helmet from 'react-helmet';
import * as nconf from 'nconf'

interface IHtmlProps {
  manifest?: Object;
  markup?: string;
  store?: Redux.Store;
}

class Html extends React.Component<IHtmlProps, {}> {
  private resolve(files) {
    if (!this.props.manifest) {
      return files.map((src) => {
        return '/public/js/' + src
      })
    }

    return files.map((src) => {
      if (!this.props.manifest[src]) { return; }
      return '/public/' + this.props.manifest[src];
    }).filter((file) => file !== undefined);
  }

  public render() {
    const head = Helmet.rewind();
    const { markup, store } = this.props;

    const styles = this.resolve(['vendor.css', 'app.css']);
    const renderStyles = styles.map((src, i) =>
      process.env.NODE_ENV !== 'production' ? undefined : <link key={i} rel='stylesheet' type='text/css' href={src} />
    );

    const scripts = this.resolve(['vendor.js', 'app.js']);
    const renderScripts = scripts.map((src, i) =>
      <script src={src} key={i}></script>
    );

    const config = {
      googleMapAPIKey: nconf.get('SETTINGS_GOOGLE_MAP_API_KEY'),
      imageRootUrl: nconf.get('SETTINGS_IMAGE_ROOT_URL'),
    }

    // tslint:disable-next-line:max-line-length
    const initialState = (<script dangerouslySetInnerHTML={{__html: `window.__INITIAL_STATE__=${JSON.stringify(store.getState())}; window.__CONFIG__=${ JSON.stringify(config) }`}} charSet='UTF-8' />);

    return (
      <html>
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css'></link>
          <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.3/toastr.min.css'></link>
          {head.link.toComponent()}
          {head.script.toComponent()}

          {renderStyles}
          <link rel='shortcut icon' href='/favicon.ico' />
        </head>
        <body>
          <main id='app' dangerouslySetInnerHTML={{ __html: markup }}></main>
          {initialState}
          <script dangerouslySetInnerHTML={{
            __html: `
              window.ALLOYEDITOR_BASEPATH = '/node_modules/alloyeditor/dist/alloy-editor/';
              window.CKEDITOR_BASEPATH = '/node_modules/alloyeditor/dist/alloy-editor/';
            `,
          }}>
          </script>
          {renderScripts}
        </body>
      </html>
    );
  }
}

export { Html }
