import express from 'express';
import patientService from '../services/patientService';

import toNewPatientEntry from '../utils';
import toNewMedicalEntry from '../entryCheck';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNoSsnEntries());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});


router.post('/:id', (req, res) => {
  try {
    const newMedicalEntry = toNewMedicalEntry(req.body);

    const addedEntry = patientService.addNewMedicalEntry(newMedicalEntry, req.params.id);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
  /*
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const newPatientEntry = patientService.addPatient( 
    name,
    dateOfBirth, 
    ssn,
    gender, 
    occupation
  );
  res.json(newPatientEntry);
  */
});

export default router;