import { combineReducers, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import patientReducer from './patient/reducer';
import { PatientReducerState } from './patient/types';

export interface RootState {
  patient: PatientReducerState;
}

const store = createStore<RootState, any, any, any>(
  combineReducers({
    patient: patientReducer,
  }),
  applyMiddleware(ReduxThunk)
);

export default store;
