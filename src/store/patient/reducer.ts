import { PatientReducerState } from './types';
import { CREATE_PATIENT, EDIT_PATIENT, LOAD_PATIENT } from './actions';

const initialState: PatientReducerState = {
  patients: [],
};

const patientReducer = (
  state: PatientReducerState = initialState,
  action: any
) => {
  switch (action.type) {
    case CREATE_PATIENT:
      return {
        ...state,
        patients: [...state.patients, action.patientInfo],
      };
    case LOAD_PATIENT:
      return {
        ...state,
        patients: action.loadedPatient,
      };
    default:
      return state;
  }
};

export default patientReducer;
