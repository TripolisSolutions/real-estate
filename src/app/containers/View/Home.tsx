import * as React from 'react'
import { translate, InjectedTranslateProps } from 'react-i18next'
import { browserHistory } from 'react-router'
import * as Helmet from 'react-helmet'

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
import Banner from '../../components/Banner/Banner'

import configs from '../../configs'

const banner = require('./images/p5.png')

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

  private handleSearch = (search: ISearchQuery) => {
    browserHistory.push({
      pathname: '/properties',
      query: search,
    })
  }

  public render() {
    const { t } = this.props
    const properties = this.props.propertiesData.properties.slice(0, 6)

    const { imageRootUrl } = configs()

    return (
      <div>
        <Helmet title={ t('home_slogan') }/>
        <Banner slogan={ t('home_slogan') } image={ banner } />
        <SearchBar
          langCode={ this.props.i18nData.currentLangCode }
          currency={ this.props.i18nData.currentCurrency }
          categories={ this.props.categoriesData.categories }
          onSearch={ this.handleSearch }
          title={ t('search_bar_heading') }
        ></SearchBar>
        <PropertyList
          imageRootUrl={ imageRootUrl }
          currency={ this.props.i18nData.currentCurrency }
          langCode={ this.props.i18nData.currentLangCode }
          properties={ properties }
          title={ t('home_lastest_properties') }
        ></PropertyList>
        <div className={ 'container' }>
          <Block>
            <Info btnText={ t('home_message_btn') } onClick={() => {
              browserHistory.push('/about')
            }} >
              <h1>
                {
                  t('home_message')
                }
              </h1>
            </Info>
          </Block>
        </div>
        <LocationMap title={ t('home_location_heading') }/>
      </div>
    )
  }
}

export default Home
