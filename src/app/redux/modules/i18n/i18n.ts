import * as update from 'react/lib/update'

import { IAction, IHandler } from '../../models'

const CATEGORIES_REQUEST = 'CATEGORIES_REQUEST'
const CATEGORIES_FAILURE = 'CATEGORIES_FAILURE'

export interface IState {
  currentLangCode: string
  locales: Object // readonly
}

const INITIAL_STATE: IState = {
  currentLangCode: 'vi',
  locales: {},
}

const ACTION_HANDLERS = {
  [CATEGORIES_REQUEST]: (state: IState): IState => {
    return update(state, {
      isFetching: {
        $set: true,
      },
    })
  },
  [CATEGORIES_FAILURE]: (state: IState): IState => {
    return update(state, {
      isFetching: {
        $set: false,
      },
    })
  },
}

export function i18nReducer(state = INITIAL_STATE, action: IAction<any>): IState {
  const handler: IHandler<IState> = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
