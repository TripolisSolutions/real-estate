import * as React from 'react'
import { Form } from 'formsy-react'
import * as FRC from 'formsy-react-components'
import * as _ from 'lodash'
// import * as log from 'loglevel'

import { emptyOption, translatedOptions } from '../../../../helpers/options'

import { translate, InjectedTranslateProps } from 'react-i18next'

const { Input, Row, Select, Checkbox } = FRC

const s = require('./Form.less')

import { ICategory } from '../../../../redux/modules/categories/categories.model'
import { translateText } from '../../../../redux/models'

export interface IFormData {
  title_in_vietnamese: string
  title_in_english: string
  price_in_vnd?: number
  price_in_usd?: number
  category?: string
  sale_type?: string
  rental_period_negotiable?: boolean
  rental_period_value?: number
  rental_period_unit?: string
  available_until?: Date
  facing_direction?: string
  bed_room_count?: number
  size_area?: number
}

interface IProps extends InjectedTranslateProps, React.Props<StepBasicInfo> {
  langCode: string
  formData: IFormData
  categories: ICategory[]
  onSubmit(data: IFormData)
  onChange(data: IFormData)
}

function formatDate(d: Date) {
  const day = ('0' + d.getDate()).slice(-2)
  const month = ('0' + (d.getMonth() + 1)).slice(-2)
  const formated = d.getFullYear() + '-' + (month) + '-' + (day)

  return formated
}

function stringValueOf(v: any) {
  if (_.isNull(v) || _.isUndefined(v)) {
    return ''
  }

  if (_.isDate(v)) {
    const d = v as Date
    return formatDate(d)
  }

  return String(v)
}

class StepBasicInfo extends React.Component<IProps, void> {

  public refs: {
    [key: string]: any
    formsy: any
  }

  constructor(props) {
    super(props)
  }

  private submitForm = (data) => {
    this.props.onSubmit(data)
  }

  public onChange = _.debounce((data) => {
    if (_.isString(data.rental_period_negotiable)) {
      data.rental_period_negotiable = data.rental_period_negotiable === 'true'
    }
    this.props.onChange(data)
  }, 200)

  public render() {
    const { t, formData } = this.props

    const {
      salesTypes,
      facingDirections,
      rentalPeriods,
    } = translatedOptions(t)

    const categoriesOptions = this.props.categories.map((cat) => {
      return {
        value: cat.id,
        label: translateText(cat.name, this.props.langCode),
      }
    })
    categoriesOptions.unshift(emptyOption)

    return (
      <div className={ s.container }>
        <Form
            className='horizontal'
            ref='formsy'
            onSubmit={ this.submitForm }
            onChange={ this.onChange }
        >
          <fieldset>
            <legend>{ t('step_basic_info') }</legend>
            <Input
              name='title_in_vietnamese'
              value={ formData.title_in_vietnamese }
              label={ t('title_in_vietnamese') }
              type='text'
              placeholder={ t('title_in_vietnamese') }
            />
            <Input
              name='title_in_english'
              value={ formData.title_in_english }
              label={ t('title_in_english') }
              type='text'
              placeholder={ t('title_in_english') }
            />
            <Row layout='horizontal' label={ t('price') }>
              <Input
                labelClassName='hidden'
                name='price_in_vnd'
                value={ stringValueOf(formData.price_in_vnd) }
                type='number'
                placeholder={ t('price_in_vnd') }
                addonAfter={<span>VND</span>}
              />
              {' '}
              <Input
                labelClassName='hidden'
                name='price_in_usd'
                value={ stringValueOf(formData.price_in_usd) }
                type='number'
                placeholder={ t('price_in_usd') }
                addonAfter={<span>USD</span>}
              />
            </Row>
            <Select
              name='category'
              value={ formData.category }
              label={ t('category') }
              options={categoriesOptions}
            />
              <Select
              name='sale_type'
              value={ formData.sale_type }
              label={ t('sale_type') }
              options={salesTypes}
            />
            {
              formData.sale_type === 'rent' ? (
                <Row layout='horizontal' label={ t('rental_period') }>
                  <Checkbox
                    labelClassName='hidden'
                    name='rental_period_negotiable'
                    value={ formData.rental_period_negotiable }
                    label={ t('rental_period_negotiable') }
                  />
                  <Input
                    labelClassName='hidden'
                    name='rental_period_value'
                    disabled={ formData.rental_period_negotiable }
                    value={ stringValueOf(formData.rental_period_value) }
                    type='number'
                    placeholder={ t('rental_period_value') }
                  />
                  <Select
                    labelClassName='hidden'
                    name='rental_period_unit'
                    disabled={ formData.rental_period_negotiable }
                    value={ formData.rental_period_unit }
                    placeholder={ t('rental_period_unit') }
                    options={rentalPeriods}
                  />
                </Row>
              ) : undefined
            }
            <Input
              name='available_until]'
              value={ stringValueOf(formData.available_until) }
              label={ t('available_until') }
              type='date'
              placeholder={ t('available_until') }
            />
            <Select
              name='facing_direction'
              value={ formData.facing_direction }
              label={ t('facing_direction') }
              options={facingDirections}
            />
            <Input
              name='bed_room_count'
              value={ stringValueOf(formData.bed_room_count) }
              type='number'
              label={ t('bed_room_count') }
              placeholder={ t('bed_room_count') }
            />
            <Input
              name='size_area'
              value={ stringValueOf(formData.size_area) }
              type='number'
              label={ t('size_area') }
              placeholder={ t('size_area') }
            />
          </fieldset>
          <fieldset>
            <Row layout='horizontal'>
              <input className='btn btn-primary' formNoValidate={ true } type='submit' defaultValue={ t('ok') } />
            </Row>
          </fieldset>
        </Form>
      </div>
    )
  }
}

export default translate()(StepBasicInfo)
