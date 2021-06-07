import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { Patient } from '../../store/patient/types';
import styles from './styles.module.scss';
import SortDownIcon from './icon/sort-down.svg';
import SortUpIcon from './icon/sort-up.svg';

interface PatientListProps {
  patients: Patient[];
}

const PatientList = ({ patients }: PatientListProps) => {
  const [sortDescending, setSortDescending] = useState<boolean>(true);

  const swapSort = () => {
    setSortDescending(!sortDescending);
  };

  const patientCompare = (a: Patient, b: Patient) => {
    const multiplier = sortDescending ? 1 : -1;
    return (a.lastEdit - b.lastEdit) * multiplier;
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <div className={styles.col1}>
          Recently edited
          <button
            onClick={swapSort}
            type="button"
            className={styles.sortButton}
          >
            <img
              src={sortDescending ? SortUpIcon : SortDownIcon}
              alt="sorting icon"
            />
          </button>
        </div>
        <div className={styles.col2}>Patient&apos;s name</div>
      </div>
      {patients.sort(patientCompare).map((patient) => (
        <div key={patient.id} className={styles.tableRow}>
          <div className={styles.col1}>
            {moment(patient.lastEdit).format('DD/MM/YYYY HH:mm')}
          </div>
          <div className={styles.col2}>
            {patient.name}
            <Link to={`/patients/${patient.id}`} className={styles.patientLink}>
              See details &gt;
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PatientList;
