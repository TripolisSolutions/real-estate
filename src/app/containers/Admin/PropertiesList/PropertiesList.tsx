import * as React from 'react'
const { connect } = require('react-redux');
const { asyncConnect } = require('redux-connect');

import { triggerFetchCategories } from '../../../redux/modules/categories/categories'
import { triggerFetchProperties } from '../../../redux/modules/properties/properties'
import { IState } from '../../../redux/reducers'

// const s = require('./PropertiesList.less')

interface IProps extends IState {
}

@asyncConnect([{
  promise: ({ store: { dispatch } }) => {
    return Promise.all([
      dispatch(triggerFetchCategories()),
      dispatch(triggerFetchProperties()),
    ])
  },
}])
@connect(
  state => state
)
class PropertiesList extends React.Component<IProps, {}> {

  public render() {
    return(
      <div>
        { this.props.categoriesData.isFetching ? 'Fetching Stars' : 'fetched' }
      </div>
    );
  }
}

export default PropertiesList

