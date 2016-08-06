import * as React from 'react'
const { connect } = require('react-redux');
const { asyncConnect } = require('redux-connect');

import { triggerFetchCategories } from '../../../redux/modules/categories/categories'
// import { ICategory } from '../../../redux/modules/categories/categories.model'
import { triggerFetchProperty } from '../../../redux/modules/properties/properties'
// import { IProperty } from '../../../redux/modules/properties/properties.model'
import { IState } from '../../../redux/reducers'

// const s = require('./PropertiesList.less')

interface IProps extends IState {
}

@asyncConnect([{
  promise: ({ store: { dispatch }, params: { id } }) => {
    return Promise.all([
      dispatch(triggerFetchCategories()),
      dispatch(triggerFetchProperty(id)),
    ])
  },
}])
@connect(
  state => state
)
class PropertiesEdit extends React.Component<IProps, {}> {

  public render() {
    return(
      <div>
        { this.props.categoriesData.isFetching ? 'Fetching Stars' : 'fetched' }
      </div>
    );
  }
}

export default PropertiesEdit

