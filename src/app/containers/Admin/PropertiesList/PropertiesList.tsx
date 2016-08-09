import * as React from 'react'
import * as log from 'loglevel'
import { Grid, Row } from 'react-bootstrap'
import { InjectedTranslateProps } from 'react-i18next'

const { connect } = require('react-redux');
const { asyncConnect } = require('redux-connect');

import { triggerFetchCategories } from '../../../redux/modules/categories/categories'
import { triggerFetchProperties } from '../../../redux/modules/properties/properties'
import { IState } from '../../../redux/reducers'

import PropertiesList from '../../../components/Admin/PropertiesList/PropertiesList'

interface IProps extends IState, InjectedTranslateProps {
}

@asyncConnect([{
  promise: ({ store: { dispatch } }) => {
    log.debug('async feching data for PropertiesList')
    return Promise.all([
      dispatch(triggerFetchCategories()),
      dispatch(triggerFetchProperties()),
    ]).then((results) => {
      log.debug('async feched data for PropertiesList: ', results)
    })
  },
}])
@connect(
  state => state
)
export default class PropertiesListContainer extends React.Component<IProps, {}> {
  public render() {
    return(
      <Grid>
        <Row>
          <PropertiesList
            properties={ this.props.propertiesData.properties }
            isFetching={ this.props.propertiesData.isFetching }
            langCode={ this.props.i18nData.currentLangCode }
            onDeleteClicked={ () => {} }
          />
        </Row>
      </Grid>
    );
  }
}
