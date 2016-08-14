import * as React from 'react'
import { IOption } from 'formsy-react-components'
import { Col, Row} from 'react-bootstrap'
import * as _ from 'lodash'

import { translate, InjectedTranslateProps } from 'react-i18next'
import { ICategory } from '../../redux/modules/categories/categories.model'
import { translatedOptions } from '../../helpers/options'
import { translateText } from '../../redux/models'

import Block from '../Block/Block'
import Button from '../Button/Button'
import Dropdown from '../Dropdown/Dropdown'
import Input from '../Input/Input'

const s = require('./SearchBar.less')

export interface ISearchQuery {
  q?: string
  lang: string
  category: string
  salesType: string
  minBed: string
  maxBed: string
  minPrice: string
  maxPrice: string
  district: string
  size: string
}

interface IProps extends InjectedTranslateProps {
  query?: ISearchQuery
  langCode: string
  categories: ICategory[]
  onSearch(query: ISearchQuery)
}

const bedOptions: IOption[] = _.times(6, (i) => ({
  value: i + 1 + '',
  label: i + 1 + '',
}))

class SearchBar extends React.Component<IProps, void> {

  public static defaultProps = {
    query: {
      q: '',
      lang: 'vi',
      category: '',
      salesType: '',
      minBed: '',
      maxBed: '',
      minPrice: '',
      maxPrice: '',
      district: '',
      size: '',
    },
    langCode: 'vi',
    categories: [],
  }

  private form: ISearchQuery

  constructor(props) {
    super(props)

    this.form = props.query
  }

  private updateForm = (key, value) => {
    this.form[key] = value
  }

  private handleSubmit = (event) => {
    event.preventDefault()
    this.props.onSearch(this.form)
  }

  public render() {
    const props = this.props
    const { t, query } = props

    const {
        salesTypes,
        districts,
        sizes,
    } = translatedOptions(t, false)

    const categoriesOptions = this.props.categories.map((cat) => {
      return {
        value: cat.id,
        label: translateText(cat.name, this.props.langCode),
      }
    })

    const minBedOptions = bedOptions;
    const selectedMinBed = _.findIndex(bedOptions, {value: query.minBed})
    const maxBedOptions = bedOptions.slice( selectedMinBed < 0 ? 0 : selectedMinBed, bedOptions.length )


    return (
      <div className={'container'}>
        <Block title='I want to'>
          <div className={ s.container } >
            <form action='' onSubmit={ this.handleSubmit }>
              <Row>
                <Col md={ 2 }>
                  <Dropdown
                    defaultValue={ query.salesType || 'buy' }
                    options={salesTypes}
                    onChange={ (value) => this.updateForm('salesType', value) }
                  />
                </Col>
                <Col md={ 8 }>
                  <Input
                    defaultValue={ query.q }
                    placeholder={ t('search_by_name') }
                    onChange={ _.debounce((value) => this.updateForm('q', value), 200) }
                  />
                </Col>
              </Row>
              <Row className={s.second}>
                <Col md={ 2 }>
                  <Dropdown
                    placeHolder={ t('search_all_categories') }
                    defaultValue={ query.category }
                    options={ categoriesOptions }
                    onChange={ (value) => this.updateForm('category', value) }
                  />
                </Col>
                <Col md={ 1 }>
                  <Dropdown
                    placeHolder={ t('search_min_bed') }
                    defaultValue={ query.minBed }
                    options={ minBedOptions }
                    onChange={ (value) => this.updateForm('category', value) }
                  />
                </Col>
                <Col md={ 1 }>
                  <Dropdown
                    placeHolder={ t('search_max_bed') }
                    defaultValue={ query.maxBed }
                    options={ maxBedOptions }
                    onChange={ (value) => this.updateForm('category', value) }
                  />
                </Col>
                <Col md={ 1 }>
                  <Input
                    type='number'
                    defaultValue={ query.minPrice }
                    placeholder={ t('search_min_price') }
                    onChange={ _.debounce((value) => this.updateForm('q', value), 200) }
                  />
                </Col>
                <Col md={ 1 }>
                  <Input
                    type='number'
                    defaultValue={ query.maxPrice }
                    placeholder={ t('search_max_price') }
                    onChange={ _.debounce((value) => this.updateForm('q', value), 200) }
                  />
                </Col>
                <Col md={ 1 }>
                  <Dropdown
                    placeHolder={ t('search_district') }
                    defaultValue={ query.district }
                    options={ districts }
                    onChange={ (value) => this.updateForm('category', value) }
                  />
                </Col>
                <Col md={ 1 }>
                  <Dropdown
                    placeHolder={ t('search_size') }
                    defaultValue={ query.size }
                    options={ sizes }
                    onChange={ (value) => this.updateForm('category', value) }
                  />
                </Col>
              </Row>
              <div className={ s.button }>
                <Button type='submit' text='More Info' />
              </div>
            </form>
          </div>
        </Block>
      </div>
    )
  }
}

export default translate()(SearchBar)
