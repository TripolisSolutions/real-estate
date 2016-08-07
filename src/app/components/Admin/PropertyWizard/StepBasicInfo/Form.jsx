import React from 'react';
import ReactDOM from 'react-dom';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';

import { translate, InjectedTranslateProps } from 'react-i18next'

const { Checkbox, CheckboxGroup, Input, RadioGroup, Row, Select, File, Textarea } = FRC

import {
  Grid, Row as BSRow, Col,
  FormGroup, ControlLabel,
} from 'react-bootstrap'


class Playground extends React.Component {

    constructor(props) {
        super(props);

        // Default state
        this.state = {
            layout: 'horizontal',
            validatePristine: false,
            disabled: false
        };
    }

    resetForm = () => {
        // This is nasty
        const formsy = this.refs.myform.refs.formsy;
        formsy.reset();
    }

    submitForm = (data) => {
        console.log(data);
        this.props.onSubmit(data)
    }

    changeOption = (name, value) => {
        var newState = {};
        newState[name] = value;
        this.setState(newState);
    }

    render() {

        const { t } = this.props

        var radioOptions = [
            {value: 'a', label: 'Option A'},
            {value: 'b', label: 'Option B'},
            {value: 'c', label: 'Option C'}
        ];

        var radioOptionsDisabled = [
            {value: 'a', label: 'Option A'},
            {value: 'b', label: 'Option B', disabled: true},
            {value: 'c', label: 'Option C'}
        ];

        var optionY = {
            value: 'y',
            label: 'Option Y (yellow css class)',
            className: 'yellow'
        };
        optionY['data-note'] = 'This is a data attribute.';
        var selectOptions = [
            {value: 'a', label: 'Option A'},
            {value: 'a', label: 'Option A (again)'},
            {value: 'b', label: 'Option B'},
            {value: 'c', label: 'Option C', title: 'This is a title attribute for Option C'},
            {value: 'd', label: 'Option D', disabled: true},
            optionY
        ];
        

        var singleSelectOptions = selectOptions.slice(0);
        singleSelectOptions.unshift({value: '', label: 'Please select…'});

        const categoriesOptions = singleSelectOptions

        return (
            <div className="row">
                <Formsy.Form
                    className='horizontal'
                    ref='formsy'
                    onSubmit={ this.submitForm }
                >
                    <fieldset>
                        <legend>Input types</legend>
                        <Input
                            name="title_in_vietnamese"
                            value=""
                            label={ t('title_in_vietnamese') }
                            type="text"
                            placeholder={ t('title_in_vietnamese') }
                        />
                        <Input
                            name="title_in_english"
                            value=""
                            label={ t('title_in_english') }
                            type="text"
                            placeholder={ t('title_in_english') }
                        />
                        <Row layout='horizontal' label={ t('price') }>
                            <Input
                                labelClassName='hidden'
                                name="price_in_vnd"
                                value=""
                                type="number"
                                placeholder={ t('price_in_vnd') }
                                addonAfter={<span>VND</span>}
                            />
                            {' '}
                            <Input
                                labelClassName='hidden'
                                name="price_in_usd"
                                value=""
                                type="number"
                                placeholder={ t('price_in_usd') }
                                addonAfter={<span>USD</span>}
                            />
                        </Row>
                        <Select
                            name="category"
                            label={ t('category') }
                            options={categoriesOptions}
                        />
                         <Select
                            name="sale_type"
                            label={ t('sale_type') }
                            options={categoriesOptions}
                        />
                        <Row layout='horizontal' label={ t('rental_period') }>
                            <Input
                                labelClassName='hidden'
                                name="rental_period_value"
                                value=""
                                type="number"
                                placeholder={ t('rental_period_value') }
                            />
                            <Select
                                labelClassName='hidden'
                                name="rental_period_unit"
                                placeholder={ t('rental_period_unit') }
                                options={categoriesOptions}
                            />
                        </Row>
                        <Input
                            name="available_until]"
                            value=""
                            label={ t('available_until') }
                            type="date"
                            placeholder={ t('available_until') }
                        />
                        <Select
                            name="facing_direction"
                            label={ t('facing_direction') }
                            options={categoriesOptions}
                        />
                        <Input
                            name="bed_room_count"
                            value=""
                            type="number"
                            label={ t('bed_room_count') }
                            placeholder={ t('bed_room_count') }
                        />
                        <Row layout='horizontal' label={ t('size') }>
                            <Input
                                labelClassName='hidden'
                                name="size_width"
                                value=""
                                type="number"
                                placeholder={ t('size_width') }
                            />
                            <Input
                                labelClassName='hidden'
                                name="size_length"
                                value=""
                                type="number"
                                placeholder={ t('size_length') }
                            />
                        </Row>
                    </fieldset>
                </Formsy.Form>
            </div>
        )
    }
}

export default translate()(Playground)
