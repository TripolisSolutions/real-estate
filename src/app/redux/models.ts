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

export interface ITranslatablePrice {
  value: number
  currency: string
}

export function getLangCodeFromLanguage(language: string) {
  switch (language) {
    case 'vietnamese':
      return 'vi'
    case 'english':
      return 'en'
    default:
      throw new Error('unsupported language: ' + language)
  }
}

export function translateText(field: ITranslatableText[], langCode) {
  return field.filter((tran) => getLangCodeFromLanguage(tran.language) === langCode)[0].text
}

export function translatePrice(field: ITranslatablePrice[], currency) {
  return field.filter((tran) => getLangCodeFromLanguage(tran.currency) === currency)[0].value
}
