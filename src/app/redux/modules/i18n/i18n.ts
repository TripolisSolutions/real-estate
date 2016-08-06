import * as update from 'react/lib/update'

import { IAction, IHandler } from '../../models'

const SWITCH_LANGUAGE = 'SWITCH_LANGUAGE'

export interface IState {
  currentLangCode: string
  locales: Object // readonly
}

const INITIAL_STATE: IState = {
  currentLangCode: 'vi',
  locales: {},
}

const ACTION_HANDLERS = {
  [SWITCH_LANGUAGE]: (state: IState): IState => {
    const nextLangCode = state.currentLangCode === 'vi' ? 'en' : 'vi'
    return update(state, {
      currentLangCode: {
        $set: nextLangCode,
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
