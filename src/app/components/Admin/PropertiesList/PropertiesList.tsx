import * as React from 'react'
import * as log from 'loglevel'
import { translate, InjectedTranslateProps } from 'react-i18next'
import { browserHistory } from 'react-router'

import { IProperty } from '../../../redux/modules/properties/properties.model'
import { ITranslatableText, translateText } from '../../../redux/models'

import sanitizeUrl from '../../../helpers/sanitizeUrl'

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { ButtonToolbar, Button } from 'react-bootstrap'
import { IndexLink, Link } from 'react-router'

const ReactPaginate = require('react-paginate')

interface IProps extends InjectedTranslateProps {
  pageNum: number
  perPage: number
  currentPage: number
  properties: IProperty[]
  isFetching: boolean
  langCode: string
  onDeleteClicked(id: string)
}

function createLinkFormatter(currentLangCode, t) {
  return function(cell: string, row: IProperty) {
    const translatedName = translateText(row.name, currentLangCode)
    const sanitizedName = sanitizeUrl(translatedName)

    return (
      <IndexLink to={ `/properties/${ cell }/${ sanitizedName }` } target='_blank'>
        { t('link') }
      </IndexLink>
    )
  }
}

function dateFormatter(cell: string, row: IProperty) {
  const date = new Date(cell)
  return `${date.getHours()}:${date.getMinutes()} - ${date.getDate()}/${ date.getMonth() + 1 }/${date.getFullYear()}`
}

function createTranslateFormatter(currentLangCode: string) {
  return function translateFormatter(cell: ITranslatableText[]) {
    return translateText(cell, currentLangCode)
  }
}

function createCommandsFormatter(currentLangCode: string, t, onDeleteClicked) {
  return function(id: string, row: IProperty) {

    const translatedName = translateText(row.name, currentLangCode)
    const sanitizedName = sanitizeUrl(translatedName)

    return (
      <ButtonToolbar>
        <IndexLink to={ `/admin/properties/${ id }/${ sanitizedName }` }>
          <Button bsStyle='primary'>
            { t('edit') }
          </Button>
        </IndexLink>
        <Button bsStyle='danger' onClick={ () => onDeleteClicked(id) }>{ t('delete') }</Button>
      </ButtonToolbar>
    )
  }
}

const PropertiesList = (props: IProps) => {
  const { t } = props

  function handlePageClick(data) {
    let selected = data.selected;
    // let offset = Math.ceil(selected * props.perPage)
    log.debug('page: ', selected)
    if (selected === parseInt(props.currentPage as any, 10)) {
      return
    }

    browserHistory.push('/admin?page=' + selected)
  }

  return(
    <div>
      { props.isFetching ? '' : (
        <div>
          <BootstrapTable data={ props.properties }
            headerStyle={{
              marginBottom: -20,
            }}
          >
            <TableHeaderColumn dataField='name' dataFormat={
              createTranslateFormatter(props.langCode)
            } dataSort={true}>
              { t('property_name') }
            </TableHeaderColumn>
            <TableHeaderColumn dataField='c_at' dataSort={true} dataFormat={ dateFormatter } width='170'>
              { t('created_date') }
            </TableHeaderColumn>
            <TableHeaderColumn dataField='id' isKey={true}
              dataFormat={ createCommandsFormatter(props.langCode, t, props.onDeleteClicked) } width='170'
            >
              { t('commands') }
            </TableHeaderColumn>
            <TableHeaderColumn dataField='id'
              dataFormat={ createLinkFormatter(props.langCode, t) } width='150'
            >
              { t('view_page') }
            </TableHeaderColumn>
          </BootstrapTable>
          <ReactPaginate
            previousLabel={
              t('previous')
            }
            nextLabel={
              t('next')
            }
            breakLabel={<a href=''>...</a>}
            breakClassName={ 'break-me' }
            pageNum={ props.pageNum }
            initialSelected={ props.currentPage }
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            clickCallback={ handlePageClick }
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
          />
        </div>
      ) }
    </div>
  );
}

export default translate()(PropertiesList)
