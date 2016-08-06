export interface IAction<P> {
  type: string
  payload: P
  error?: Error
}

export interface IHandler<S> {
  (state: S, action: any): S
}

export interface ITranslatableText {
  language: string
  text: string
}
