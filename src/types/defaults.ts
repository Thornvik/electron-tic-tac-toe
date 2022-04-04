import { ReactNode } from 'react'


export type Props<T = Record<string, unknown>> = T & {
  className?: string
  children?: ReactNode
}