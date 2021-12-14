export default function select(selector: string): HTMLDivElement | null {
  return document.querySelector(selector)
}