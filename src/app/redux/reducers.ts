import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { counterReducer } from './modules/counter/counter'
import { starsReducer } from './modules/stars/stars'
import { categoriesReducer, IState as ICategoriesData } from './modules/categories/categories'
import { propertiesReducer, IState as IPropertiesData } from './modules/properties/properties'
const { reducer } = require('redux-connect')

const rootReducer: Redux.Reducer = combineReducers({
  routing: routerReducer,
  counter: counterReducer,
  stars: starsReducer,
  categoriesData: categoriesReducer,
  propertiesData: propertiesReducer,
  reduxAsyncConnect: reducer,
});

export interface IState {
  categoriesData: ICategoriesData
  propertiesData: IPropertiesData
}

export default rootReducer;
