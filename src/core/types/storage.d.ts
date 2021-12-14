declare interface IStorage {
  setItem: (key: string, data: any) => Promise<void>,
  getItem: <T = any>(key: string) => Promise<T | null>,
  removeItem: (key: string) => Promise<void>
}

declare interface INativeStorage {
  setItem: (key: string, data: any) => Promise<void>,
  getItem: (key: string) => Promise<any>,
  removeItem: (key: string) => Promise<void>
}