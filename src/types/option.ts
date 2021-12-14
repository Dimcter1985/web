
type PrimaryKey = string | number

export interface IOption<T = PrimaryKey> {
  id: T
  name: PrimaryKey
  disabled?: boolean
}
