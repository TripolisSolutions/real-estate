import * as React from 'react'
import { browserHistory } from 'react-router'
const { connect } = require('react-redux');
const { asyncConnect } = require('redux-connect');

import { triggerFetchCategories } from '../../../redux/modules/categories/categories'
import { triggerFetchProperty } from '../../../redux/modules/properties/properties'
import { triggerFetchDefaultContactInfo } from '../../../redux/modules/defaultContactInfo/defaultContactInfo'
import { updateProperty } from '../../../redux/modules/properties/properties'
import { IState } from '../../../redux/reducers'

import PropertyWizard from '../../../components/Admin/PropertyWizard/PropertyWizard'

import configs from '../../../configs'

// const s = require('./PropertiesList.less')

interface IProps extends IState {
  updateProperty: Redux.ActionCreator
}

@asyncConnect([{
  promise: ({ store: { dispatch }, params: { id } }) => {
    return Promise.all([
      dispatch(triggerFetchCategories()),
      dispatch(triggerFetchProperty(id)),
      dispatch(triggerFetchDefaultContactInfo()),
    ])
  },
}])
@connect(
  state => state,
  dispatch => ({
    updateProperty: (id, property) => {
      dispatch(updateProperty(id, property)).then(
        () => browserHistory.push('/admin'),
        (error) => window.alert('Error: ' + error.message)
      )
    },
  })
)
class PropertiesEdit extends React.Component<IProps, {}> {

  public render() {
    let key
    if (typeof window !== 'undefined') {
      key = window.__CONFIG__.googleMapAPIKey
    }

    const { imageRootUrl } = configs()

    return(
      <div>
        <PropertyWizard
          imageRootUrl={ imageRootUrl }
          googleMapAPIKey={ key }
          property={ this.props.propertiesData.property }
          categories={ this.props.categoriesData.categories }
          defaultContactInfo={ this.props.defaultContactInfoData.defaultContactInfo }
          langCode={ this.props.i18nData.currentLangCode }
          onWizardDone={ (property) => this.props.updateProperty(this.props.propertiesData.property.id, property) }
        />
      </div>
    );
  }
}

export default PropertiesEdit

