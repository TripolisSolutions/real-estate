import * as React from 'react'
import { browserHistory } from 'react-router'
const { connect } = require('react-redux');
const { asyncConnect } = require('redux-connect');

import { triggerFetchCategories } from '../../../redux/modules/categories/categories'
import { createNewProperty } from '../../../redux/modules/properties/properties'
import { triggerFetchDefaultContactInfo } from '../../../redux/modules/defaultContactInfo/defaultContactInfo'
import { IState } from '../../../redux/reducers'

import PropertyWizard from '../../../components/Admin/PropertyWizard/PropertyWizard'

import configs from '../../../configs'

interface IProps extends IState {
  createNewProperty: Redux.ActionCreator
}

@asyncConnect([{
  promise: ({ store: { dispatch } }) => {
    return Promise.all([
      dispatch(triggerFetchCategories()),
      dispatch(triggerFetchDefaultContactInfo()),
    ])
  },
}])
@connect(
  state => state,
  dispatch => ({
    createNewProperty: (property) => {
      dispatch(createNewProperty(property)).then(
        () => browserHistory.push('/admin'),
        (error) => window.alert('Error: ' + error.message)
      )
    },
  })
)
class PropertiesNew extends React.Component<IProps, {}> {

  public render() {
    const { imageRootUrl, googleMapAPIKey } = configs()

    return(
      <div>
        <PropertyWizard
          imageRootUrl={ imageRootUrl }
          googleMapAPIKey={ googleMapAPIKey }
          categories={ this.props.categoriesData.categories }
          defaultContactInfo={ this.props.defaultContactInfoData.defaultContactInfo }
          langCode={ this.props.i18nData.currentLangCode }
          onWizardDone={ this.props.createNewProperty }
        />
      </div>
    );
  }
}

export default PropertiesNew

