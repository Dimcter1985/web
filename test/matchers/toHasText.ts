import { CustomRender } from '../render'

export default function toHasText(this: any, subject: CustomRender, text: string | RegExp): any {
  const pass = !!subject.queryAllByText(text).length
  const to = this.isNot ? 'not to' : 'to'

  return {
    pass,
    message: (): string => (
      `Expected element ${to} have text content: ${text}`
    ),
  }
}