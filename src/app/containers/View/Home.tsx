import * as React from 'react'
import { translate, InjectedTranslateProps } from 'react-i18next'

const { connect } = require('react-redux');
const { asyncConnect } = require('redux-connect');

import { triggerFetchCategories } from '../../redux/modules/categories/categories'
import { triggerFetchProperties } from '../../redux/modules/properties/properties'
import { IState } from '../../redux/reducers'

import Block from '../../components/Block/Block'
import PropertyList from '../../components/PropertyList/PropertyList'
import SearchBar, { ISearchQuery } from '../../components/SearchBar/SearchBar'
import Info from '../../components/Info/Info'
import LocationMap from '../../components/LocationMap/LocationMap'

interface IProps extends IState, InjectedTranslateProps {
}

@translate()
@asyncConnect([{
  promise: ({ store: { dispatch }, location: { query } }) => {
    return Promise.all([
      dispatch(triggerFetchCategories()),
      dispatch(triggerFetchProperties(parseInt(query.page, 10) || 0)),
    ])
  },
}])
@connect(
  state => state
)
class Home extends React.Component<IProps, void> {

  private handleSearch = (searchObject: ISearchQuery) => {

  }

  public render() {
    const properties = this.props.propertiesData.properties.slice(0, 6)

    return (
      <div>
        <SearchBar
          langCode={ this.props.i18nData.currentLangCode }
          categories={ this.props.categoriesData.categories }
          onSearch={ this.handleSearch }
        ></SearchBar>
        <PropertyList
          langCode={ this.props.i18nData.currentLangCode }
          properties={ properties }
        ></PropertyList>
        <div className={ 'container' }>
          <Block>
            <Info btnText={ 'More info' }>
              <h1>
                "We chose this site based on its reputation for building high quality homes while providing incredible customer service."
              </h1>
            </Info>
          </Block>
        </div>
        <LocationMap />
      </div>
    )
  }
}

export default Home
