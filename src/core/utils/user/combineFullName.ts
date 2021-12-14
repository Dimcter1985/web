export default function combineFullName({ firstName, lastName }: ICustomer): string {
  return [firstName, lastName].join(' ')
}