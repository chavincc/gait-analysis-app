import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
import PlusLogo from './icon/plus.svg';
import SearchLogo from './icon/search.svg';
import { RootState } from '../../store/index';
import PatientList from '../patient-list/index';
import { loadPatient } from '../../store/patient/actions';

const Home = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    dispatch(loadPatient());
  }, [dispatch]);

  const patients = useSelector((state: RootState) => state.patient.patients);
  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchValue)
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className={styles.home}>
      <div className={styles.headerRow}>
        <div className={styles.header}>GAIT Analysis</div>
        <Link to="/patient-form" className={styles.button}>
          <img src={PlusLogo} alt="add icon" />
          <div className={styles.buttonText}>Add new patient</div>
        </Link>
      </div>
      <div className={styles.searchBarContainer}>
        <img src={SearchLogo} alt="search icon" />
        <input
          type="text"
          placeholder="Search patient name"
          value={searchValue}
          onChange={handleSearch}
        />
      </div>
      <PatientList patients={filteredPatients} />
    </div>
  );
};

export default Home;
