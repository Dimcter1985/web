interface IFullName {
  firstName: string
  lastName: string
}

export default function splitFullName(fullName: string): IFullName {
  const [firstName, ...lastNames] = fullName.trim().split(/\s+/)
  const lastName = lastNames.join(' ')
  return { firstName, lastName }
}