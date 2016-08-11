import * as React from 'react'
const { connect } = require('react-redux');
const { asyncConnect } = require('redux-connect');

import { triggerFetchCategories } from '../../../redux/modules/categories/categories'
import { createNewProperty } from '../../../redux/modules/properties/properties'
import { IState } from '../../../redux/reducers'

import PropertyWizard from '../../../components/Admin/PropertyWizard/PropertyWizard'

interface IProps extends IState {
  createNewProperty: Redux.ActionCreator
}

@asyncConnect([{
  promise: ({ store: { dispatch } }) => {
    return dispatch(triggerFetchCategories())
  },
}])
@connect(
  state => state,
  dispatch => ({
    createNewProperty: (property) => dispatch(createNewProperty(property)),
  })
)
class PropertiesNew extends React.Component<IProps, {}> {

  public render() {
    let key
    if (typeof window !== 'undefined') {
      key = window.__CONFIG__.googleMapAPIKey
    }

    return(
      <div>
        <PropertyWizard
          googleMapAPIKey={ key }
          categories={ this.props.categoriesData.categories }
          langCode={ this.props.i18nData.currentLangCode }
          onWizardDone={ this.props.createNewProperty }
        />
      </div>
    );
  }
}

export default PropertiesNew

