import * as React from 'react'
// import * as log from 'loglevel'
import { translate, InjectedTranslateProps } from 'react-i18next'

import { IProperty } from '../../../redux/modules/properties/properties.model'
import { ITranslatableText, translateText } from '../../../redux/models'

import sanitizeUrl from '../../../helpers/sanitizeUrl'

import { ButtonToolbar, Button } from 'react-bootstrap'
import { IndexLink } from 'react-router'

const s = require('./PropertiesList.less')

const ReactPaginate = require('../../Paginate/index')

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
            <span className='glyphicon glyphicon-edit'></span>&nbsp;
            { t('edit') }
          </Button>
        </IndexLink>
        <Button bsStyle='danger' onClick={ () => onDeleteClicked(id) }>
          <span className='glyphicon glyphicon-remove'></span>&nbsp;
          { t('delete') }
        </Button>
      </ButtonToolbar>
    )
  }
}

const PropertiesList = (props: IProps) => {
  const { t } = props

  return(
    <div>
      { props.isFetching ? '' : (
        <div>
          <div className='row col-md-12 custyle'>
            <ReactPaginate
              previousLabel='<'
              nextLabel='>'
              navigateUrl='/admin'
              breakLabel={<a href=''>...</a>}
              breakClassName={ 'break-me' }
              pageNum={ props.pageNum }
              initialSelected={ props.currentPage }
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              containerClassName={'pagination'}
              subContainerClassName={'pages pagination'}
              activeClassName={'active'}
            />
            <table className={'table table-striped ' + s.custab}>
              <thead>
                  <tr>
                      <th>{ t('property_name') }</th>
                      <th width='170'>{ t('created_date') }</th>
                      <th className='text-center' width='170'>{ t('commands') }</th>
                      <th className='text-center' width='150'>{ t('view_page') }</th>
                  </tr>
              </thead>
              <tbody>
                {
                  props.properties.map( (prop) => (
                    <tr key={ prop.id }>
                        <td>{ createTranslateFormatter(props.langCode)(prop.name) }</td>
                        <td>{ dateFormatter(prop.c_at, prop) }</td>
                        <td className='text-center'>
                          { createCommandsFormatter(props.langCode, t, props.onDeleteClicked)(prop.id, prop) }
                        </td>
                        <td className='text-center'>
                          { createLinkFormatter(props.langCode, t)(prop.id, prop) }
                        </td>
                    </tr>
                  ))
                }
                </tbody>
            </table>
            <ReactPaginate
              previousLabel='<'
              nextLabel='>'
              navigateUrl='/admin'
              breakLabel={<a href=''>...</a>}
              breakClassName={ 'break-me' }
              pageNum={ props.pageNum }
              initialSelected={ props.currentPage }
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              containerClassName={'pagination'}
              subContainerClassName={'pages pagination'}
              activeClassName={'active'}
            />
          </div>
        </div>
      ) }
    </div>
  );
}

export default translate()(PropertiesList)
