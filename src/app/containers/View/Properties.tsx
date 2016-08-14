import * as React from 'react'
import { translate, InjectedTranslateProps } from 'react-i18next'
import { browserHistory } from 'react-router'

const { connect } = require('react-redux');
const { asyncConnect } = require('redux-connect');

import { triggerFetchCategories } from '../../redux/modules/categories/categories'
import { triggerFetchProperties } from '../../redux/modules/properties/properties'
import { IState } from '../../redux/reducers'

import PropertyList from '../../components/PropertyList/PropertyList'
import SearchBar, { ISearchQuery } from '../../components/SearchBar/SearchBar'
import LocationMap from '../../components/LocationMap/LocationMap'

const ReactPaginate = require('../../components/Paginate/index')

interface IProps extends IState, InjectedTranslateProps {
}

const perPage = 20

@translate()
@asyncConnect([{
  promise: ({ store: { dispatch }, location: { query } }) => {
    return Promise.all([
      dispatch(triggerFetchCategories()),
      dispatch(triggerFetchProperties(parseInt(query.page, 10) || 0, perPage)),
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

    return (
      <div>
        <SearchBar
          langCode={ this.props.i18nData.currentLangCode }
          categories={ this.props.categoriesData.categories }
          onSearch={ this.handleSearch }
          title={'Avaiable property' }
        ></SearchBar>
        <PropertyList
          langCode={ this.props.i18nData.currentLangCode }
          properties={ properties }
        ></PropertyList>
        <ReactPaginate
          previousLabel={
            t('previous')
          }
          nextLabel={
            t('next')
          }
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
        <LocationMap />
      </div>
    )
  }
}

export default Home
