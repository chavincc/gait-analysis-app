export interface Patient {
  name: string;
  id: string;
  birthdate: number;
  sex: Sex;
  diagnosis: string;
  lastEdit: number;
}

export enum Sex {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export interface PatientReducerState {
  patients: Patient[];
}
