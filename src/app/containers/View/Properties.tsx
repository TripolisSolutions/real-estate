import * as React from 'react'
import { translate, InjectedTranslateProps } from 'react-i18next'
import { browserHistory } from 'react-router'
import * as Helmet from 'react-helmet'

const { connect } = require('react-redux');
const { asyncConnect } = require('redux-connect');

import { triggerFetchCategories } from '../../redux/modules/categories/categories'
import { triggerFetchProperties } from '../../redux/modules/properties/properties'
import { IState } from '../../redux/reducers'

import PropertyList from '../../components/PropertyList/PropertyList'
import SearchBar, { ISearchQuery } from '../../components/SearchBar/SearchBar'
import LocationMap from '../../components/LocationMap/LocationMap'
import Empty from '../../components/Empty/Empty'

const ReactPaginate = require('../../components/Paginate/index')

import configs from '../../configs'

interface IProps extends IState, InjectedTranslateProps {
}

const perPage = 12

@translate()
@asyncConnect([{
  promise: ({ store: { dispatch }, location: { query } }) => {
    return Promise.all([
      dispatch(triggerFetchCategories()),
      dispatch(triggerFetchProperties(parseInt(query.page, 10) || 0, perPage, query)),
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
    const properties = this.props.propertiesData.properties

    const props = this.props as any
    const location = props.location as any
    const pageNum = Math.ceil(this.props.propertiesData.total / perPage)
    const currentPage = parseInt(location.query.page, 10) || 0

    const { imageRootUrl } = configs()

    return (
      <div>
        <Helmet title={ props.t('properties_list_heading') }/>
        <SearchBar
          query={ location.query }
          langCode={ this.props.i18nData.currentLangCode }
          currency={ this.props.i18nData.currentCurrency }
          categories={ this.props.categoriesData.categories }
          onSearch={ this.handleSearch }
          title={ t('properties_list_heading') }
        ></SearchBar>
        {
          properties.length > 0 ? (
             <PropertyList
              imageRootUrl={ imageRootUrl }
              currency={ this.props.i18nData.currentCurrency }
              langCode={ this.props.i18nData.currentLangCode }
              properties={ properties }
            >
              <ReactPaginate
                previousLabel={
                  '<'
                }
                nextLabel={
                  '>'
                }
                query={ location.query }
                navigateUrl='/properties'
                breakLabel={<a href=''>...</a>}
                breakClassName={ 'break-me' }
                pageNum={ pageNum }
                initialSelected={ currentPage }
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
              />
            </PropertyList>
          ) : <Empty text={ t('not_found') } />
        }
        <LocationMap title={ t('home_location_heading') }/>
      </div>
    )
  }
}

export default Home
