/* eslint-disable */
declare global {

  namespace jest {
    interface Matchers<R> {
      toHasText(text: string | RegExp): R
    }
  }
}
/* eslint-enable */


export {}
