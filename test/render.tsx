import { fireEvent, render, queries, within, RenderResult, waitFor as wait } from '@testing-library/react'

export type CustomRender = {
  fillWith: (selector: string | RegExp, value: string) => void
  press: (selector: string | RegExp) => void
  withIn: (selector: string, fn: () => any) => void
  waitFor: (selector: string) => ReturnType<typeof wait>
} & RenderResult


const defaultOptions = { options: { debug: { omitProps: ['style'] } } }

function customRender(element: JSX.Element, options: any = {}): CustomRender {
  const nativeRender = render(element, { ...defaultOptions, ...options })
  let root: typeof nativeRender.container = nativeRender.container
  return {
    ...nativeRender,
    fillWith: (selector: string | RegExp, value: string): void => {
      const { queryByPlaceholderText, queryByDisplayValue, queryByTestId, queryByRole } = within(root, queries)
      const input =
        queryByPlaceholderText(selector) ||
        queryByDisplayValue(selector) ||
        queryByRole(selector) ||
        queryByTestId(selector)
      
      if (!input) throw new Error(`Selector "${selector}" is not found`)

      fireEvent.change(input, { target: { value } })
    },
    press: (selector: string | RegExp): void => {
      const { queryByText, queryByTitle, queryByRole, queryByTestId, queryByLabelText } = within(root, queries)
      const button = queryByText(selector) ||
        queryByTitle(selector) ||
        queryByRole(selector) ||
        queryByLabelText(selector) ||
        queryByTestId(selector)

      if (!button) throw new Error(`Selector "${selector}" is not found`)

      fireEvent.click(button)
    },
    withIn: (selector, fn): void => {
      const { queryByTitle, queryByRole, queryByTestId, queryByLabelText } = within(root, queries)
      const container =
        queryByTitle(selector) ||
        queryByRole(selector) ||
        queryByLabelText(selector) ||
        queryByTestId(selector)

      if (!container) throw new Error(`Selector "${selector}" is not found`)
      const prevRoot = root
      root = container
      fn()
      root = prevRoot
    },
    waitFor: (selector): Promise<unknown> => {
      const { queryByText, queryByTitle, queryByRole, queryByTestId, queryByLabelText } = within(root, queries)
      return wait(() => {
        const el = 
          queryByText(selector) ||
          queryByTitle(selector) ||
          queryByRole(selector) ||
          queryByTestId(selector) ||
          queryByLabelText(selector)
        if (!el) throw new Error(`Selector "${selector}" is not found`)
        return el
      })
    },
  }
}

export { customRender as render }
