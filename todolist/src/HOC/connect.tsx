import { debug, log } from '../constant'

export interface ExtraInfoType {
  debug: boolean
  log: (value: any) => void
}

export default function connect<T>(Component: React.ComponentType<T & ExtraInfoType>) {
  return function (props: Omit<T, keyof ExtraInfoType>) {
    return <Component {...(props as T)} debug={debug} log={log} />
  }
}
