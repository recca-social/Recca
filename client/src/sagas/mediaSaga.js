import { takeLatest, select, put, call } from 'redux-saga/effects'
import { values } from 'lodash'
import actions from '../actions'
import { validateField } from '../utils/validators'
import {
  formatAddress,
  getPhoneNumber,
  renderProviderName,
  getProviderPhotoSource,
  formatProvSpecialties,
} from '../utils/providerUtils'
import services from '../services/'
import { parseFormData, getSelectedLocations, getPreferredTimes } from '../utils/form'
import { parserTypes } from '../utils/parsers'

export function* loadFormOptions() {
  const formOptions = yield call(services.getFormOptions)
  yield put(actions.receiveFormOptions(formOptions))
}

export function* getProviderInfo({ payload }) {
  const { id, organization } = payload
  const data = yield call(services.getProviderById, { id, organization })
  const info = {
    id,
    name: renderProviderName(data),
    specialties: formatProvSpecialties(data),
    photoSource: getProviderPhotoSource(data),
    addresses: data.addresses.map(a => ({
      ...a,
      phoneNumber: getPhoneNumber(a.phoneNumbers),
      value: formatAddress(a),
    })),
  }
  yield put(actions.receiveProviderInfo(info))
}
export function* getProviders({ payload }) {
  const { value } = payload
  const data = yield call(services.getProviders, value)

  yield put(actions.loadProviders(data))
}
export function* getSpecialties({ payload }) {
  const { value } = payload
  const data = yield call(services.getSpecialties, value)

  yield put(actions.loadSpecialties(data))
}
export function* validateFormData({ payload }) {
  const { history, isShortForm } = payload

  const { locations, appointmentTimesAm, appointmentTimesPm, selectedSpecialties } = yield select(
    state => state.form.options
  )

  yield put(actions.setPreferredSpecialties(selectedSpecialties))

  const formData = yield select(state => state.form.data)

  // if isShortForm update flag
  if (isShortForm) {
    formData.isShortForm.value = 'yes'
  } else {
    formData.isShortForm.value = 'no'
  }

  let isFormValid = true
  // Track the page of the first found error
  let indexOfFirstError = 3
  const erroneousIds = []
  // Get preferredLocation values as array of strings
  const { addresses = [] } = formData.preferredPhysician.info || {}
  const preferredLocations = getSelectedLocations(addresses.length ? addresses : locations)

  // Get preferred appointment time as string
  const preferredAppointmentTimeStringAm = getPreferredTimes(appointmentTimesAm)
  const preferredAppointmentTimeStringPm = getPreferredTimes(appointmentTimesPm, 'PM')

  const combinedPreferredAppointmentTimes = `${preferredAppointmentTimeStringAm} ${preferredAppointmentTimeStringAm &&
    ''} ${preferredAppointmentTimeStringPm}`.trim()

  formData.preferredLocations.value = preferredLocations
  formData.patientAvailability.value = combinedPreferredAppointmentTimes
  // Save in state for ref by the submission page
  yield put(actions.setPreferredLocations(preferredLocations))
  yield put(actions.onSelectPreferredTime(combinedPreferredAppointmentTimes))

  if (formData.selfGuarantor.value) {
    formData.guarantorFirst.value = formData.first.value
    formData.guarantorLast.value = formData.last.value
    formData.guarantorAddress.value = formatAddress(
      {
        addressLine1: formData.addressLine1.value,
        addressLine2: formData.addressLine2.value,
        city: formData.city.value,
        stateCode: formData.stateCode.value,
        zipCode: formData.zipCode.value,
      },
      ''
    )
  }
  if (formData.selfInsuranceSubscriber.value) {
    formData.insuranceSubscriber.value = `${formData.first.value} ${formData.last.value}`
    formData.insuranceSubscriberDob.value = formData.dob.value
  }

  const parsedFormData = parseFormData(formData, parserTypes.PRE_VALIDATION)

  // Validate each input
  const validatedForm = values(parsedFormData).reduce((acc, formField) => {
    const { isValid: isFieldValid, error } =
      isShortForm && formField.shortForm
        ? validateField(formField)
        : isShortForm && !formField.shortForm
          ? { isValid: true, error: null }
          : validateField(formField)
    if (!isFieldValid) {
      isFormValid = isFieldValid
      indexOfFirstError =
        formField.pageIndex < indexOfFirstError ? formField.pageIndex : indexOfFirstError
      erroneousIds.push(formField.id)
    }
    return {
      ...acc,
      [formField.id]: {
        ...formField,
        error,
        isValid: isFieldValid,
      },
    }
  }, {})

  // Mark all erroneous fields
  if (!isFormValid) {
    yield put(actions.updateForm(validatedForm))
    yield put(
      actions.submissionAttempt({
        success: isFormValid,
        type: actions.SUBMIT_FAIL_USER_ERROR,
        info: erroneousIds.join(','),
      })
    )
    // Navigate to the first page with an error
    if (isShortForm) {
      // submission Attempt event for Short form
      yield put(
        actions.submissionAttempt({
          type: actions.SUBMIT_SHORT,
        })
      )
      yield put(actions.navigateForm({ index: 0 }))
    } else {
      // submission Attempt event for Long form
      yield put(
        actions.submissionAttempt({
          type: actions.SUBMIT_LONG,
        })
      )
      yield put(actions.navigateForm({ index: indexOfFirstError }))
    }

    // Form Valid, submit
  } else {
    yield sanitizeAndSubmit(validatedForm, history)
  }
}

function* sanitizeAndSubmit(formData, history) {
  try {
    const data = parseFormData({ ...formData })

    const { error, result = {} } = yield call(services.submitForm, data)
    const submissionSuccessful = !(error && error.length > 0)
    const appointmentId = submissionSuccessful && result.number

    yield handleRequestResponse({ success: submissionSuccessful, appointmentId, history })
  } catch (e) {
    console.log('Submission Error: ', e)
    yield handleRequestResponse({ success: false, history })
  }
}

function* handleRequestResponse({ success, appointmentId, history }) {
  // analytics
  yield put(
    actions.submissionAttempt({
      success,
      appointmentId,
      type: success ? actions.SUBMIT_SUCCESS : actions.SUBMIT_FAIL_NETWORK_ERROR,
    })
  )

  const { isShortForm } = yield select(state => state.form.data)

  // submission Attempt event for Short/Long form
  yield put(
    actions.submissionAttempt({
      success,
      appointmentId,
      type: isShortForm.value === 'yes' ? actions.SUBMIT_SHORT : actions.SUBMIT_LONG,
    })
  )
  // submission Success event for Short/Long form
  if (success) {
    yield put(
      actions.submissionAttempt({
        success,
        appointmentId,
        type:
          isShortForm.value === 'yes' ? actions.SUBMIT_SHORT_SUCCESS : actions.SUBMIT_LONG_SUCCESS,
      })
    )
  }

  history.push('/status')
}

export function* mySaga() {
  yield takeLatest(actions.LOAD_FORM_OPTIONS, loadFormOptions)
  yield takeLatest(actions.SUBMIT_APPT_REQUEST, validateFormData)
  yield takeLatest(actions.REQUEST_PROVIDER_INFO, getProviderInfo)
  yield takeLatest(actions.GET_PROVIDERS, getProviders)
  yield takeLatest(actions.SUBMIT_SHORT_FORM, validateFormData)
  yield takeLatest(actions.GET_SPECIALTIES, getSpecialties)
}

export default mySaga
