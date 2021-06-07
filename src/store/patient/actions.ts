import { ipcRenderer } from 'electron';

import { Patient } from './types';

export const CREATE_PATIENT = 'CREATE_PATIENT';
export const EDIT_PATIENT = 'EDIT_PATIENT';
export const LOAD_PATIENT = 'LOAD_PATIENT';

export const createPatient = (patientInfo: Patient) => {
  const respond: boolean = ipcRenderer.sendSync(CREATE_PATIENT, patientInfo);
  if (respond) {
    return (dispatch: any) => {
      dispatch({
        type: CREATE_PATIENT,
        patientInfo,
      });
    };
  }
  return false;
};

export const editPatient = (patientId: string, newPatientInfo: Patient) => {
  return (dispatch: any) => {
    dispatch({
      type: EDIT_PATIENT,
      patientId,
      newPatientInfo,
    });
  };
};

export const loadPatient = () => {
  const respond: Patient[] = ipcRenderer.sendSync(LOAD_PATIENT);
  if (respond) {
    return (dispatch: any) => {
      dispatch({
        type: LOAD_PATIENT,
        loadedPatient: respond,
      });
    };
  }
  return false;
};
