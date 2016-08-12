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
  if (!field) {
    return ''
  }

  const rs = field.filter((tran) => getLangCodeFromLanguage(tran.language) === langCode)
  if (rs.length === 0) {
    return ''
  }
  return rs[0].text
}

export function translatePrice(field: ITranslatablePrice[], currency) {
  if (!field) {
    return 0
  }

  const rs = field.filter((tran) => tran.currency === currency)
  if (rs.length === 0) {
    return 0
  }
  return rs[0].value
}
