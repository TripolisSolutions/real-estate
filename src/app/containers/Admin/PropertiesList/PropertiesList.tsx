import * as React from 'react'
import * as log from 'loglevel'
import { Grid, Row } from 'react-bootstrap'
import { translate, InjectedTranslateProps } from 'react-i18next'

const { connect } = require('react-redux');
const { asyncConnect } = require('redux-connect');

import { triggerFetchCategories } from '../../../redux/modules/categories/categories'
import { triggerFetchProperties } from '../../../redux/modules/properties/properties'
import { deleteProperty } from '../../../redux/modules/properties/properties'
import { IState } from '../../../redux/reducers'

import PropertiesList from '../../../components/Admin/PropertiesList/PropertiesList'

interface IProps extends IState, InjectedTranslateProps {
  deleteProperty: Redux.ActionCreator
}

@translate()
@asyncConnect([{
  promise: ({ store: { dispatch }, location: { query } }) => {
    log.debug('async feching data for PropertiesList')
    return Promise.all([
      dispatch(triggerFetchCategories()),
      dispatch(triggerFetchProperties(parseInt(query.page, 10) || 0)),
    ]).then((results) => {
      log.debug('async feched data for PropertiesList: ', results)
    })
  },
}])
@connect(
  state => state,
  dispatch => ({
    deleteProperty: (id) => {
      dispatch(deleteProperty(id))
    },
  })
)
export default class PropertiesListContainer extends React.Component<IProps, {}> {

  private handleDelete = (id: string) => {
    if (window.confirm(this.props.t('property_delete_confirm'))) {
      this.props.deleteProperty(id)
    }
  }

  public render() {

    const props = this.props as any
    const location = props.location as any
    log.info('location', location)
    const perPage = 20
    const pageNum = Math.ceil(this.props.propertiesData.total / perPage)
    const currentPage = parseInt(location.query.page, 10) || 0

    return(
      <Grid>
        <Row>
          <PropertiesList
            pageNum={ pageNum }
            perPage={ perPage }
            currentPage={ currentPage }
            properties={ this.props.propertiesData.properties }
            isFetching={ this.props.propertiesData.isFetching }
            langCode={ this.props.i18nData.currentLangCode }
            onDeleteClicked={ this.handleDelete }
          />
        </Row>
      </Grid>
    );
  }
}
