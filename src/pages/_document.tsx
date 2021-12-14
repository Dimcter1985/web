import React from 'react'
import { ServerStyleSheets } from '@material-ui/core/styles'
import Document, { Html, Head, Main, NextScript, DocumentInitialProps, DocumentContext } from 'next/document'

class MyDocument extends Document {

  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const sheets = new ServerStyleSheets()
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = (): any => (
      originalRenderPage({
        enhanceApp: (App) => (props): any => sheets.collect(<App {...props} />),
      })
    )

    const initialProps = await Document.getInitialProps(ctx)

    return {
      ...initialProps,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    }
  }

  render(): JSX.Element {
    return (
      <Html lang='en'>
        <Head>
          <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
          <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
          <link rel='manifest' href='/site.webmanifest' />
          <meta name='theme-color' content='#ffffff' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument