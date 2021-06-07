import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  FormHelperText,
  FormControl,
  TextField,
  Select,
  MenuItem,
  TextareaAutosize,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import styles from './styles.module.scss';
import { Sex, Patient } from '../../store/patient/types';
import { createPatient } from '../../store/patient/actions';

export interface PatientFormData {
  name: string;
  id: string;
  birthdate: string;
  sex: Sex | '';
  diagnosis: string;
}

const PatientForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [formData, setFormData] = useState<PatientFormData>({
    name: '',
    id: '',
    birthdate: '',
    sex: '',
    diagnosis: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSexSelect = (e: React.ChangeEvent<{ value: unknown }>) => {
    setFormData({
      ...formData,
      sex: e.target.value as Sex,
    });
  };

  const handleAddPatient = (e: React.FormEvent) => {
    e.preventDefault();
    const newPatient: Patient = {
      name: formData.name,
      id: formData.id,
      birthdate: moment(formData.birthdate).valueOf(),
      sex: formData.sex as Sex,
      diagnosis: formData.diagnosis,
      lastEdit: moment().valueOf(),
    };
    dispatch(createPatient(newPatient));
  };

  return (
    <form className={styles.patientForm} noValidate autoComplete="off">
      <div className={styles.title}>Add new patient</div>
      <FormControl fullWidth className={styles.formControl}>
        <div className={styles.customLabel}>Patient&apos;s name</div>
        <TextField
          id="input-name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          aria-describedby="input-name-helper-text"
        />
        <FormHelperText id="input-name-helper-text">{}</FormHelperText>
      </FormControl>
      <FormControl fullWidth className={styles.formControl}>
        <div className={styles.customLabel}>ID,/ HN</div>
        <TextField
          id="input-id"
          name="id"
          value={formData.id}
          onChange={handleChange}
          aria-describedby="input-id-helper-text"
        />
        <FormHelperText id="input-id-helper-text">{}</FormHelperText>
      </FormControl>
      <FormControl fullWidth className={styles.formControl}>
        <div className={styles.customLabel}>Birthdate</div>
        <TextField
          id="input-birthdate"
          name="birthdate"
          value={formData.birthdate}
          onChange={handleChange}
          aria-describedby="input-birthdate-helper-text"
          type="date"
        />
        <FormHelperText id="input-birthdate-helper-text">{}</FormHelperText>
      </FormControl>
      <FormControl fullWidth className={styles.formControl}>
        <div className={styles.customLabel}>Sex</div>
        <Select
          id="input-sex"
          name="sex"
          value={formData.sex}
          onChange={handleSexSelect}
          aria-describedby="input-sex-helper-text"
        >
          <MenuItem value={Sex.MALE}>Male</MenuItem>
          <MenuItem value={Sex.FEMALE}>Female</MenuItem>
        </Select>
        <FormHelperText id="input-sex-helper-text">{}</FormHelperText>
      </FormControl>
      <FormControl fullWidth className={styles.formControl}>
        <div className={styles.customLabel}>Diagnosis</div>
        <TextareaAutosize
          spellCheck="false"
          className={styles.textArea}
          id="input-diagnosis"
          name="diagnosis"
          value={formData.diagnosis}
          onChange={handleChange}
          rowsMin={3}
        />
      </FormControl>
      <div className={styles.buttonRow}>
        <button
          type="button"
          className={styles.buttonSecondary}
          onClick={history.goBack}
        >
          <div className={styles.buttonText}>Cancel</div>
        </button>
        <button
          type="submit"
          className={styles.button}
          onClick={handleAddPatient}
        >
          <div className={styles.buttonText}>Add</div>
        </button>
      </div>
    </form>
  );
};

export default PatientForm;
