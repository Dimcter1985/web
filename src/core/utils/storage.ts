class Storage {
  private storage: INativeStorage

  private env: IEnvironment

  constructor(storage: INativeStorage, env: IEnvironment) {
    this.storage = storage
    this.env = env
    this.setGlobals()
  }

  private getKey(key: string): string {
    return `${this.env.ENVIRONMENT}.snailz.${key}`
  }

  private setGlobals(): void {
    global.baseUrl = this.env.BASE_URL
  }

  async getItem<T>(key: string): Promise<T | null> {
    try {
      const data = await this.storage.getItem(this.getKey(key))
      return data ? JSON.parse(data) : null
    } catch(error) {
      return null
    }
  }

  async setItem(key: string, data: any): Promise<void> {
    await this.storage.setItem(this.getKey(key), JSON.stringify(data))
  }

  async removeItem(key: string): Promise<void> {
    await this.storage.removeItem(this.getKey(key))
  }
}

export default Storage