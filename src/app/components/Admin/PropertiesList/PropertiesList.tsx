import * as React from 'react'
import * as log from 'loglevel'
import { translate, InjectedTranslateProps } from 'react-i18next'

import { IProperty } from '../../../redux/modules/properties/properties.model'
import { ITranslatableText } from '../../../redux/models'

import sanitizeUrl from '../../../helpers/sanitizeUrl'

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { ButtonToolbar, Button } from 'react-bootstrap'
import { IndexLink } from 'react-router'

interface IProps extends InjectedTranslateProps {
  properties: IProperty[]
  isFetching: boolean
  langCode: string
}

function linkFormatter(cell: string, row: IProperty) {
  return <IndexLink to={ `/properties/${ cell }/${ sanitizeUrl(row.name) }` } target='_blank'>Link</IndexLink>
}

function dateFormatter(cell: string, row: IProperty) {
  const date = new Date(cell)
  return `${date.getHours()}:${date.getMinutes()} - ${date.getDate()}/${ date.getMonth() + 1 }/${date.getFullYear()}`
}

function getLangCodeFromLanguage(language: string) {
  switch (language) {
    case 'vietnamese':
      return 'vi'
    case 'english':
      return 'en'
    default:
      throw new Error('unsupported language: ' + language)
  }
}

function translateText(field: ITranslatableText[], langCode) {
  return field.filter((tran) => getLangCodeFromLanguage(tran.language) === langCode)[0].text
}

function createTranslateFormatter(currentLangCode: string) {
  return function translateFormatter(cell: ITranslatableText[]) {
    return translateText(cell, currentLangCode)
  }
}

function createCommandsFormatter(currentLangCode: string, t) {
  return function(id: string, row: IProperty) {
    log.debug('commandsFormatter, row: ', row)

    const translatedName = translateText(row.name, currentLangCode)
    const sanitizedName = sanitizeUrl(translatedName)

    return (
      <ButtonToolbar>
        <Button bsStyle='link'>
          <IndexLink to={ `/properties/${ id }/${ sanitizedName }` } target='_blank'>
            { t('view_page') }
          </IndexLink>
        </Button>
        <Button bsStyle='primary'>{ t('edit') }</Button>
        <Button bsStyle='danger'>{ t('delete') }</Button>
      </ButtonToolbar>
    )
  }
}

const PropertiesList = (props: IProps) => {
  const { t } = props

  return(
    <div>
      { props.isFetching ? 'Fetching Properties' : (
        <BootstrapTable data={ props.properties }>
          <TableHeaderColumn dataField='name' dataFormat={
            createTranslateFormatter(props.langCode)
          } dataSort={true}>
            { t('property_name') }
          </TableHeaderColumn>
          <TableHeaderColumn dataField='c_at' dataSort={true} dataFormat={ dateFormatter } width='170'>
            { t('created_date') }
          </TableHeaderColumn>
          <TableHeaderColumn dataField='id' isKey={true}
            dataFormat={ createCommandsFormatter(props.langCode, t) } width='300'
          >
            { t('commands') }
          </TableHeaderColumn>
        </BootstrapTable>
      ) }
    </div>
  );
}


export default translate()(PropertiesList)

