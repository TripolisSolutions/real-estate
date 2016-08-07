import * as React from 'react'
import { translate, InjectedTranslateProps } from 'react-i18next'
import { reduxForm } from 'redux-form'
const { connect } = require('react-redux');

export const fields = [ 'firstName', 'lastName', 'email', 'sex', 'favoriteColor', 'employed', 'notes' ]

class SimpleForm extends React.Component<any, any> {
  private static propTypes = {
    fields: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
    resetForm: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool.isRequired
  }

  public render() {
    const {
      fields: { firstName, lastName, email, sex, favoriteColor, employed, notes },
      handleSubmit,
      resetForm,
      submitting
      } = this.props
    return (<form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <div>
            <input type='text' placeholder='First Name' {...firstName}/>
          </div>
        </div>
        <div>
          <label>Last Name</label>
          <div>
            <input type='text' placeholder='Last Name' {...lastName}/>
          </div>
        </div>
        <div>
          <label>Email</label>
          <div>
            <input type='email' placeholder='Email' {...email}/>
          </div>
        </div>
        <div>
          <label>Sex</label>
          <div>
            <label>
              <input type='radio' {...sex} value='male' checked={sex.value === 'male'}/> Male
            </label>
            <label>
              <input type='radio' {...sex} value='female' checked={sex.value === 'female'}/> Female
            </label>
          </div>
        </div>
        <div>
          <label>Favorite Color</label>
          <div>
            <select
              {...favoriteColor}
              // required syntax for reset form to work
              // undefined will not change value to first empty option
              // when resetting
              value={favoriteColor.value || ''}>
              <option></option>
              <option value='ff0000'>Red</option>
              <option value='00ff00'>Green</option>
              <option value='0000ff'>Blue</option>
            </select>
          </div>
        </div>
        <div>
          <label>
            <input type='checkbox' {...employed}/> Employed
          </label>
        </div>
        <div>
          <label>Notes</label>
          <div>
            <textarea
              {...notes}
              // required for reset form to work (only on textarea's)
              // see: https://github.com/facebook/react/issues/2533
              value={notes.value || ''}/>
          </div>
        </div>
        <div>
          <button type='submit' disabled={submitting}>
            {submitting ? <i/> : <i/>} Submit
          </button>
          <button type='button' disabled={submitting} onClick={resetForm}>
            Clear Values
          </button>
        </div>
      </form>
    )
  }
}

const BasicInfoForm =  connect(
  state => state
)(reduxForm({
  form: 'simple',
  fields,
})(SimpleForm))

interface IProps extends InjectedTranslateProps {
  langCode: string
}

const StepBasicInfo = (props: IProps) => {
  const { t } = props

  return (
    <div>
      <BasicInfoForm store={ {} }/>
    </div>
  );
}

export default translate()(StepBasicInfo)
