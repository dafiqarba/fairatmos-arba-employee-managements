import { twMerge } from 'tailwind-merge'
import { clsx, type ClassValue } from 'clsx'

export const capitalizeFirstLetter = (inputString: string) => {
  const ACRONYMS = ['IT']

  return inputString
    .trim()
    .split(' ')
    .map((word) => {
      if (ACRONYMS.includes(word.toUpperCase())) {
        return word.toUpperCase()
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join(' ')
}

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}
