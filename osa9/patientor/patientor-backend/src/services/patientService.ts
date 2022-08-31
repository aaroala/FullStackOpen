import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';


import { PatientEntry, NoSsnPatientEntry, NewPatientEntry, NewMedicalEntry } from '../types';

const getEntries = (): Array<PatientEntry> => {
  return patients;
};

const getNoSsnEntries = (): NoSsnPatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const findById =  ( id: string ): PatientEntry | undefined => {
  const patient = patients.find(p => p.id === id);
  return patient;
};

const addPatient = ( entry: NewPatientEntry ): PatientEntry => {

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const id: string = uuid();

  const newPatientEntry = {
    id: id,
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addNewMedicalEntry = ( entry: NewMedicalEntry, patientId: string): PatientEntry | undefined => {
  const id: string = uuid();

  const newMedicalEntry = {
    id: id,
    ...entry
  };

  const patient = patients.find(p => p.id === patientId);

  if (patient) {
    patient.entries = patient.entries?.concat(newMedicalEntry);
  }
  return patient;


};

export default {
  getEntries,
  getNoSsnEntries,
  addPatient,
  findById,
  addNewMedicalEntry
};