import * as update from 'react/lib/update'

import { IAction, IHandler } from '../../models'
import { ICategory } from './categories.model'

const CATEGORIES_REQUEST = 'CATEGORIES_REQUEST'
const CATEGORIES_SUCCESS = 'CATEGORIES_SUCCESS'
const CATEGORIES_FAILURE = 'CATEGORIES_FAILURE'

export interface IState {
  cateogry?: ICategory,
  categories: ICategory[]
  isFetching: boolean
}

const INITIAL_STATE: IState = {
  categories: [],
  isFetching: false,
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
  [CATEGORIES_SUCCESS]: (state: IState, action: IAction<ICategory[]>): IState => {
    return update(state, {
      categories: {
        $set: action.payload,
      },
      isFetching: {
        $set: false,
      },
    });
  },
}

export function categoriesReducer(state = INITIAL_STATE, action: IAction<any>): IState {
  const handler: IHandler<IState> = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

/** Async Action Creator */
export function triggerFetchCategories(): Redux.Dispatch {
  return dispatch => {
    dispatch(categoriesRequest());

    return fetch('/api/categories')
      .then(res => {
        if (res.ok) {
          return res.json()
            .then(res => dispatch(categoriesSuccess(res)));
        } else {
          return res.json()
            .then(res => dispatch(categoriesFailure(res)));
        }
      })
      .catch(err => dispatch(categoriesFailure(err)));
  };
}

/** Action Creator */
export function categoriesRequest() {
  return {
    type: CATEGORIES_REQUEST,
  };
}

/** Action Creator */
export function categoriesSuccess(items: ICategory[]): IAction<ICategory[]> {
  return {
    type: CATEGORIES_SUCCESS,
    payload: items,
  };
}

/** Action Creator */
export function categoriesFailure(error: Error) {
  return {
    type: CATEGORIES_FAILURE,
    error: error,
  };
}
