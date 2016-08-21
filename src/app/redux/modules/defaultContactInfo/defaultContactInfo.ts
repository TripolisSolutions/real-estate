import * as update from 'react/lib/update'
import * as urljoin from 'url-join'
import * as log from 'loglevel'

import rootUrl from '../../rootUrl'
import { IAction, IHandler } from '../../models'
import { IContactInfo } from '../properties/properties.model'

const DEFAULT_CONTACT_INFO_REQUEST = 'DEFAULT_CONTACT_INFO_REQUEST'
const DEFAULT_CONTACT_INFO_SUCCESS = 'DEFAULT_CONTACT_INFO_SUCCESS'
const DEFAULT_CONTACT_INFO_FAILURE = 'DEFAULT_CONTACT_INFO_FAILURE'

export interface IState {
  defaultContactInfo?: IContactInfo,
  isFetching: boolean
}

const INITIAL_STATE: IState = {
  isFetching: false,
}

const ACTION_HANDLERS = {
  [DEFAULT_CONTACT_INFO_REQUEST]: (state: IState): IState => {
    return update(state, {
      isFetching: {
        $set: true,
      },
    })
  },
  [DEFAULT_CONTACT_INFO_FAILURE]: (state: IState): IState => {
    return update(state, {
      isFetching: {
        $set: false,
      },
    })
  },
  [DEFAULT_CONTACT_INFO_SUCCESS]: (state: IState, action: IAction<IContactInfo[]>): IState => {
    return update(state, {
      defaultContactInfo: {
        $set: action.payload[0],
      },
      isFetching: {
        $set: false,
      },
    });
  },
}

export function defaultContactInfoReducer(state = INITIAL_STATE, action: IAction<any>): IState {
  const handler: IHandler<IState> = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

/** Async Action Creator */
export function triggerFetchDefaultContactInfo() {
  return (dispatch, getState: () => any) => {
    dispatch(defaultContactInfoRequest());

    const url = urljoin(rootUrl, 'contact_info/defaults')

    return fetch(url)
      .then(res => {
        if (res.ok) {
          return res.json()
            .then(res => dispatch(defaultContactInfoSuccess(res.docs)));
        } else {
          return res.json()
            .then(res => dispatch(defaultContactInfoFailure(res)));
        }
      })
      .catch(err => dispatch(defaultContactInfoFailure(err)));
  };
}

/** Action Creator */
export function defaultContactInfoRequest() {
  return {
    type: DEFAULT_CONTACT_INFO_REQUEST,
  };
}

/** Action Creator */
export function defaultContactInfoSuccess(items: IContactInfo[]): IAction<IContactInfo[]> {
  return {
    type: DEFAULT_CONTACT_INFO_SUCCESS,
    payload: items,
  };
}

/** Action Creator */
export function defaultContactInfoFailure(error: Error) {
  return {
    type: DEFAULT_CONTACT_INFO_FAILURE,
    error: error,
  };
}
