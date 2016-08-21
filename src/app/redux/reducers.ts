import { combineReducers } from 'redux'
import { routerReducer, RouteActions } from 'react-router-redux'
import { counterReducer } from './modules/counter/counter'
import { starsReducer } from './modules/stars/stars'
import { categoriesReducer, IState as ICategoriesData } from './modules/categories/categories'
import { propertiesReducer, IState as IPropertiesData } from './modules/properties/properties'
import { defaultContactInfoReducer,
  IState as IDefaultContactInfoData} from './modules/defaultContactInfo/defaultContactInfo'
import { i18nReducer, IState as II18n } from './modules/i18n/i18n'
const { reducer } = require('redux-connect')

const rootReducer: Redux.Reducer = combineReducers({
  routing: routerReducer,
  counter: counterReducer,
  stars: starsReducer,
  categoriesData: categoriesReducer,
  propertiesData: propertiesReducer,
  i18nData: i18nReducer,
  reduxAsyncConnect: reducer,
  defaultContactInfoData: defaultContactInfoReducer
})

export interface IState {
  router: RouteActions
  categoriesData: ICategoriesData
  propertiesData: IPropertiesData
  i18nData: II18n
  defaultContactInfoData: IDefaultContactInfoData
}

export default rootReducer;
