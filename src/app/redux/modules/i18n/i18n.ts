import * as update from 'react/lib/update'

import { IAction, IHandler } from '../../models'

const SWITCH_LANGUAGE = 'SWITCH_LANGUAGE'
const SELECT_LANG_CODE = 'SELECT_LANG_CODE'
const SWITCH_CURRENCY = 'SWITCH_CURRENCY'

export interface IState {
  currentCurrency: string
  currentLangCode: string
  locales: Object // readonly
  savedInCookie: boolean
}

const INITIAL_STATE: IState = {
  currentCurrency: 'VND',
  currentLangCode: 'vi',
  locales: {},
  savedInCookie: false,
}

const ACTION_HANDLERS = {
  [SWITCH_LANGUAGE]: (state: IState): IState => {
    const nextLangCode = state.currentLangCode === 'vi' ? 'en' : 'vi'
    return update(state, {
      currentLangCode: {
        $set: nextLangCode,
      },
      savedInCookie: {
        $set: true,
      },
    })
  },
  [SELECT_LANG_CODE]: (state: IState, action: IAction<string>): IState => {
    return update(state, {
      currentLangCode: {
        $set: action.payload,
      },
      savedInCookie: {
        $set: true,
      },
    })
  },
  [SWITCH_CURRENCY]: (state: IState): IState => {
    const next = state.currentCurrency === 'VND' ? 'USD' : 'VND'
    return update(state, {
      currentCurrency: {
        $set: next,
      },
    })
  },
}

export function i18nReducer(state = INITIAL_STATE, action: IAction<any>): IState {
  const handler: IHandler<IState> = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

/** Action Creator */
export function switchLanguage() {
  return {
    type: SWITCH_LANGUAGE,
  }
}

/** Action Creator */
export function switchCurrency() {
  return {
    type: SWITCH_CURRENCY,
  }
}

export function selectLangCode(langCode: string) {
  return {
    type: SELECT_LANG_CODE,
    payload: langCode,
  }
}
