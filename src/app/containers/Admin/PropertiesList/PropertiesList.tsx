import * as React from 'react'
import * as log from 'loglevel'
const { connect } = require('react-redux');
const { asyncConnect } = require('redux-connect');

import { triggerFetchCategories } from '../../../redux/modules/categories/categories'
import { triggerFetchProperties } from '../../../redux/modules/properties/properties'
import { IState } from '../../../redux/reducers'

// const s = require('./PropertiesList.less')

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { IndexLink } from 'react-router'

interface IProps extends IState {
}

function linkFormatter(cell, row) {
  log.debug('linkFormatter cell: ', cell, ' row: ', row)
  return <IndexLink to={ `/properties/${ row.id }` } target='_blank'></IndexLink>
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
        { this.props.propertiesData.isFetching ? 'Fetching Properties' : (
          <BootstrapTable data={ this.props.propertiesData.properties }>
            <TableHeaderColumn dataField='name' dataSort={true}>Title</TableHeaderColumn>
            <TableHeaderColumn dataField='c_at' dataSort={true}>Created Date</TableHeaderColumn>
            <TableHeaderColumn dataField='id' isKey={true} dataFormat={ linkFormatter }>Link</TableHeaderColumn>
          </BootstrapTable>
        ) }
      </div>
    );
  }
}

export default PropertiesList

