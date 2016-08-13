import * as update from 'react/lib/update'
import * as log from 'loglevel'
import * as urljoin from 'url-join'
import * as _ from 'lodash'

import rootUrl from '../../rootUrl'

import { IAction, IHandler } from '../../models'
import { token } from '../../../helpers/auth'
import { IProperty } from './properties.model'

const PROPERTIES_REQUEST = 'PROPERTIES_REQUEST'
const PROPERTIES_SUCCESS = 'PROPERTIES_SUCCESS'
const PROPERTIES_FAILURE = 'PROPERTIES_FAILURE'

const PROPERTY_REQUEST = 'PROPERTY_REQUEST'
const PROPERTY_SUCCESS = 'PROPERTY_SUCCESS'
const PROPERTY_FAILURE = 'PROPERTY_FAILURE'

const CREATE_NEW_PROPERTY_REQUEST = 'CREATE_NEW_PROPERTY_REQUEST'
const CREATE_NEW_PROPERTY_SUCCESS = 'CREATE_NEW_PROPERTY_SUCCESS'
const CREATE_NEW_PROPERTY_FAILURE = 'CREATE_NEW_PROPERTY_FAILURE'

const UPDATE_PROPERTY_REQUEST = 'UPDATE_PROPERTY_REQUEST'
const UPDATE_PROPERTY_SUCCESS = 'UPDATE_PROPERTY_SUCCESS'
const UPDATE_PROPERTY_FAILURE = 'UPDATE_PROPERTY_FAILURE'

const DELETE_PROPERTY_REQUEST = 'DELETE_PROPERTY_REQUEST'
const DELETE_PROPERTY_SUCCESS = 'DELETE_PROPERTY_SUCCESS'
const DELETE_PROPERTY_FAILURE = 'DELETE_PROPERTY_FAILURE'

export interface IState {
  property?: IProperty
  properties: IProperty[]
  isFetching: boolean
}

const INITIAL_STATE: IState = {
  properties: [],
  isFetching: false,
}

const ACTION_HANDLERS = {
  [PROPERTIES_REQUEST]: (state: IState): IState => {
    return update(state, {
      isFetching: {
        $set: true,
      },
    })
  },
  [PROPERTIES_FAILURE]: (state: IState): IState => {
    return update(state, {
      isFetching: {
        $set: false,
      },
    })
  },
  [PROPERTIES_SUCCESS]: (state: IState, action: IAction<IProperty[]>): IState => {
    return update(state, {
      properties: {
        $set: action.payload,
      },
      isFetching: {
        $set: false,
      },
    });
  },
  [PROPERTY_REQUEST]: (state: IState): IState => {
    return update(state, {
      isFetching: {
        $set: true,
      },
    })
  },
  [PROPERTY_FAILURE]: (state: IState): IState => {
    return update(state, {
      isFetching: {
        $set: false,
      },
    })
  },
  [PROPERTY_SUCCESS]: (state: IState, action: IAction<IProperty>): IState => {
    return update(state, {
      property: {
        $set: action.payload,
      },
      isFetching: {
        $set: false,
      },
    });
  },
  [CREATE_NEW_PROPERTY_REQUEST]: (state: IState): IState => {
    return update(state, {
      isFetching: {
        $set: true,
      },
    })
  },
  [CREATE_NEW_PROPERTY_FAILURE]: (state: IState): IState => {
    return update(state, {
      isFetching: {
        $set: false,
      },
    })
  },
  [CREATE_NEW_PROPERTY_SUCCESS]: (state: IState, action: IAction<IProperty>): IState => {
    return update(state, {
      isFetching: {
        $set: false,
      },
    });
  },
  [UPDATE_PROPERTY_REQUEST]: (state: IState): IState => {
    return update(state, {
      isFetching: {
        $set: true,
      },
    })
  },
  [UPDATE_PROPERTY_SUCCESS]: (state: IState): IState => {
    return update(state, {
      isFetching: {
        $set: false,
      },
    })
  },
  [UPDATE_PROPERTY_FAILURE]: (state: IState, action: IAction<IProperty>): IState => {
    return update(state, {
      isFetching: {
        $set: false,
      },
    });
  },
  [DELETE_PROPERTY_REQUEST]: (state: IState): IState => {
    return update(state, {
      isFetching: {
        $set: true,
      },
    })
  },
  [DELETE_PROPERTY_SUCCESS]: (state: IState, action: IAction<string>): IState => {
    const index = _.findIndex(state.properties, {id: action.payload})
    return update(state, {
      isFetching: {
        $set: false,
      },
      properties: {
        $splice: [[index, 1]],
      },
    })
  },
  [DELETE_PROPERTY_FAILURE]: (state: IState, action: IAction<IProperty>): IState => {
    return update(state, {
      isFetching: {
        $set: false,
      },
    });
  },
}

export function propertiesReducer(state = INITIAL_STATE, action: IAction<any>): IState {
  const handler: IHandler<IState> = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

/** Async Action Creator */
export function triggerFetchProperties(): Redux.Dispatch {
  return dispatch => {
    dispatch(propertiesRequest());
    log.debug('propertiesRequest')

    return fetch(urljoin(rootUrl, 'properties'))
      .then(res => {
        if (res.ok) {
          log.debug('propertiesSuccess')
          return res.json()
            .then(res => dispatch(propertiesSuccess(res.docs)));
        } else {
          return res.json()
            .then(res => dispatch(propertiesFailure(res)));
        }
      })
      .catch(err => dispatch(propertiesFailure(err)));
  };
}

/** Action Creator */
export function propertiesRequest() {
  return {
    type: PROPERTIES_REQUEST,
  };
}

/** Action Creator */
export function propertiesSuccess(items: IProperty[]): IAction<IProperty[]> {
  return {
    type: PROPERTIES_SUCCESS,
    payload: items,
  };
}

/** Action Creator */
export function propertiesFailure(error: Error) {
  return {
    type: PROPERTIES_FAILURE,
    error: error,
  };
}

/** Async Action Creator */
export function triggerFetchProperty(id: string): Redux.Dispatch {
  return dispatch => {
    dispatch(propertyRequest());

    return fetch(urljoin(rootUrl, 'properties/' + id))
      .then(res => {
        if (res.ok) {
          return res.json()
            .then(res => dispatch(propertySuccess(res.doc)));
        } else {
          return res.json()
            .then(res => dispatch(propertyFailure(res)));
        }
      })
      .catch(err => dispatch(propertyFailure(err)));
  };
}

/** Action Creator */
export function propertyRequest() {
  return {
    type: PROPERTY_REQUEST,
  };
}

/** Action Creator */
export function propertySuccess(item: IProperty): IAction<IProperty> {
  return {
    type: PROPERTY_SUCCESS,
    payload: item,
  };
}

/** Action Creator */
export function propertyFailure(error: Error) {
  return {
    type: PROPERTIES_FAILURE,
    error: error,
  };
}

/** Async Action Creator */
export function createNewProperty(property: IProperty): Redux.Dispatch {
  return dispatch => {
    dispatch(createNewPropertyRequest());

    return fetch(urljoin(rootUrl, 'properties'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token(),
      },
      body: JSON.stringify(property),
    })
      .then(res => {
        if (res.ok) {
          return res.json()
            .then(res => dispatch(createNewPropertySuccess(res.doc)));
        } else {
          return res.json()
            .then(res => dispatch(createNewPropertyFailure(res)));
        }
      })
      .catch(err => dispatch(createNewPropertyFailure(err)));
  };
}

/** Action Creator */
export function createNewPropertyRequest() {
  return {
    type: CREATE_NEW_PROPERTY_REQUEST,
  };
}

/** Action Creator */
export function createNewPropertySuccess(item: IProperty): IAction<IProperty> {
  return {
    type: CREATE_NEW_PROPERTY_SUCCESS,
    payload: item,
  };
}

/** Action Creator */
export function createNewPropertyFailure(error: Error) {
  return {
    type: CREATE_NEW_PROPERTY_FAILURE,
    error: error,
  };
}

/** Async Action Creator */
export function updateProperty(id: string, property: IProperty): Redux.Dispatch {
  return dispatch => {
    property.id = id
    dispatch(updatePropertyRequest());

    return fetch(urljoin(rootUrl, 'properties', id), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token(),
      },
      body: JSON.stringify(property),
    })
      .then(res => {
        if (res.ok) {
          return res.json()
            .then(res => dispatch(updatePropertySuccess(res.doc)));
        } else {
          return res.json()
            .then(res => dispatch(updatePropertyFailure(res)));
        }
      })
      .catch(err => dispatch(updatePropertyFailure(err)));
  };
}

/** Action Creator */
export function updatePropertyRequest() {
  return {
    type: UPDATE_PROPERTY_REQUEST,
  };
}

/** Action Creator */
export function updatePropertySuccess(item: IProperty): IAction<IProperty> {
  return {
    type: UPDATE_PROPERTY_SUCCESS,
    payload: item,
  };
}

/** Action Creator */
export function updatePropertyFailure(error: Error) {
  return {
    type: UPDATE_PROPERTY_FAILURE,
    error: error,
  };
}

/** Async Action Creator */
export function deleteProperty(id: string): Redux.Dispatch {
  return dispatch => {
    dispatch(deletePropertyRequest(id));

    return fetch(urljoin(rootUrl, 'properties', id), {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token(),
      },
    })
      .then(res => {
        if (res.ok) {
          dispatch(deletePropertySuccess(id))
        } else {
          return res.json()
            .then(res => dispatch(deletePropertyFailure(res)));
        }
      })
      .catch(err => dispatch(deletePropertyFailure(err)));
  };
}

/** Action Creator */
export function deletePropertyRequest(id: string): IAction<string> {
  return {
    type: DELETE_PROPERTY_REQUEST,
    payload: id,
  };
}

/** Action Creator */
export function deletePropertySuccess(id: string): IAction<string> {
  return {
    type: DELETE_PROPERTY_SUCCESS,
    payload: id,
  };
}

/** Action Creator */
export function deletePropertyFailure(error: Error) {
  return {
    type: DELETE_PROPERTY_FAILURE,
    error: error,
  };
}
