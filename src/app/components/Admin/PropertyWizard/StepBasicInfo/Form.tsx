import * as React from 'react'
import * as Formsy from 'formsy-react'
import * as FRC from 'formsy-react-components'
import { IOption } from 'formsy-react-components'

import { translate, InjectedTranslateProps } from 'react-i18next'

const { Input, Row, Select } = FRC

import { ICategory } from '../../../../redux/modules/categories/categories.model'
import { translateText } from '../../../../redux/models'
import { salesTypeOptions, facingDirectionOptions, rentalPeriodOptions } from './options'

function translateOptions(options, t): IOption[] {
  return options.map((item) => {
    return Object.assign({}, item, {
      label: t(item.translationKey),
    })
  })
}

export interface IFormData {
  title_in_vietnamese: string
  title_in_english: string
  price_in_vnd: number
  price_in_usd: number
  category: string
  sale_type: string
  rental_period_value: number
  rental_period_unit: string
  available_until: Date
  facing_direction: string
  bed_room_count: number
  size_width: number
  size_length: number
}

interface IProps extends InjectedTranslateProps {
  langCode: string
  categories: ICategory[]
  onSubmit(data: IFormData)
}

class Playground extends React.Component<IProps, {}> {

  constructor(props) {
    super(props)
  }

  private submitForm = (data) => {
    console.log(data)
    this.props.onSubmit(data)
  }

  public render() {
    const { t } = this.props

    const salesTypes = translateOptions(salesTypeOptions, t)
    const facingDirections = translateOptions(facingDirectionOptions, t)
    const rentalPeriods = translateOptions(rentalPeriodOptions, t)

    const categoriesOptions = this.props.categories.map((cat) => {
      return {
        value: cat.id,
        label: translateText(cat.name, this.props.langCode),
      }
    })

    return (
      <div className='row'>
        <Formsy.Form
            className='horizontal'
            ref='formsy'
            onSubmit={ this.submitForm }
        >
          <fieldset>
            <legend>Input types</legend>
            <Input
              name='title_in_vietnamese'
              value=''
              label={ t('title_in_vietnamese') }
              type='text'
              placeholder={ t('title_in_vietnamese') }
            />
            <Input
              name='title_in_english'
              value=''
              label={ t('title_in_english') }
              type='text'
              placeholder={ t('title_in_english') }
            />
            <Row layout='horizontal' label={ t('price') }>
              <Input
                labelClassName='hidden'
                name='price_in_vnd'
                value=''
                type='number'
                placeholder={ t('price_in_vnd') }
                addonAfter={<span>VND</span>}
              />
              {' '}
              <Input
                labelClassName='hidden'
                name='price_in_usd'
                value=''
                type='number'
                placeholder={ t('price_in_usd') }
                addonAfter={<span>USD</span>}
              />
            </Row>
            <Select
              name='category'
              label={ t('category') }
              options={categoriesOptions}
            />
              <Select
              name='sale_type'
              label={ t('sale_type') }
              options={salesTypes}
            />
            <Row layout='horizontal' label={ t('rental_period') }>
              <Input
                labelClassName='hidden'
                name='rental_period_value'
                value=''
                type='number'
                placeholder={ t('rental_period_value') }
              />
              <Select
                labelClassName='hidden'
                name='rental_period_unit'
                placeholder={ t('rental_period_unit') }
                options={rentalPeriods}
              />
            </Row>
            <Input
              name='available_until]'
              value=''
              label={ t('available_until') }
              type='date'
              placeholder={ t('available_until') }
            />
            <Select
              name='facing_direction'
              label={ t('facing_direction') }
              options={facingDirections}
            />
            <Input
              name='bed_room_count'
              value=''
              type='number'
              label={ t('bed_room_count') }
              placeholder={ t('bed_room_count') }
            />
            <Row layout='horizontal' label={ t('size') }>
              <Input
                labelClassName='hidden'
                name='size_width'
                value=''
                type='number'
                placeholder={ t('size_width') }
              />
              <Input
                labelClassName='hidden'
                name='size_length'
                value=''
                type='number'
                placeholder={ t('size_length') }
              />
            </Row>
          </fieldset>
          <fieldset>
            <Row layout='horizontal'>
              <input className='btn btn-primary' formNoValidate={ true } type='submit' defaultValue='Ok' />
            </Row>
          </fieldset>
        </Formsy.Form>
      </div>
    )
  }
}

export default translate()(Playground)
