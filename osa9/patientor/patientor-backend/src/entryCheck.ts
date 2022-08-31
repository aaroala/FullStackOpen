import { HealthCheckRating, NewHospitalEntry, NewOccupationalHealthcareEntry, NewHealthCheckEntry } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};


const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description: ' + description);
  }

  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }

  return specialist;
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: unknown): number => {
  if(!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing healtCheckRating: ' + healthCheckRating);
  }
  return healthCheckRating;
};


const parseDiagnosisCodes = (diagnoseCodes: unknown): Array<string> => {
  if (!Array.isArray(diagnoseCodes)) {
    throw new Error('DiagnoseCodes needs to be an array');
  }
  if (!diagnoseCodes.every(c => isString(c))) {
    throw new Error('DiagnoseCodes needs to be an array');
  }
  /*
  for (const code of diagnoseCodes) {
    if (!isString(code)) {
      throw new Error('Incorrect diagnoseCode');
    }
  }
  */
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return diagnoseCodes;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewMedicalEntry = (object: any) => {
  switch(object.type) {
    case "Hospital":
      console.log(object);
      const newEntry: NewHospitalEntry = {
        type: "Hospital",
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        discharge: {
          date: parseDate(object.discharge.date),
          criteria: parseDescription(object.discharge.criteria)
        }
      };
      if(object.discharge && (object.discharge.date.lenght > 0 && object.discharge.criteria)) {
        newEntry.discharge = {
          date: parseDate(object.discharge.date),
          criteria: parseDescription(object.discharge.criteria)
        };
      }
      return newEntry;

    case "OccupationalHealthcare":
      const newEntry2: NewOccupationalHealthcareEntry = {
        type: "OccupationalHealthcare",
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        employerName: parseDescription(object.employerName)
      };
      if(object.sickLeave) {
        newEntry2.sickLeave = {
          startDate: parseDate(object.sickLeave.startDate),
          endDate: parseDate(object.sickLeave.endDate)
        };
      }
      return newEntry2;

    case "HealthCheck":
      const newEntry3: NewHealthCheckEntry = {
        type: "HealthCheck",
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
      };
      return newEntry3;

    default:
      throw new Error('Incorrect or missing type');
  }
};

export default toNewMedicalEntry;