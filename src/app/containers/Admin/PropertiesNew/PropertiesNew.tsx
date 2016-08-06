import * as React from 'react'
const { connect } = require('react-redux');
const { asyncConnect } = require('redux-connect');

import { triggerFetchCategories } from '../../../redux/modules/categories/categories'
import { IState } from '../../../redux/reducers'

// const s = require('./PropertiesList.less')

interface IProps extends IState {
}

@asyncConnect([{
  promise: ({ store: { dispatch } }) => {
    return dispatch(triggerFetchCategories())
  },
}])
@connect(
  state => state
)
class PropertiesNew extends React.Component<IProps, {}> {

  public render() {
    return(
      <div>
        { this.props.categoriesData.isFetching ? 'Fetching Stars' : 'fetched' }
      </div>
    );
  }
}

export default PropertiesNew

