import { State } from "./state";
import { Patient, Diagnosis } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "UPDATE_PATIENT_STATE";
      payload: Patient;
    }
  |
    {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "UPDATE_PATIENT_STATE":
      const id = action.payload.id;
      const patientToUpdate = state.patients[id];
      const updatedPatient = {
        ...patientToUpdate,
        entries: action.payload.entries,
        ssn: action.payload.ssn
      };
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: updatedPatient
        }
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses
        }
      };

    default:
      return state;
  }
};


export const setPatientList = (payload: Patient[]) => {
  return { type: 'SET_PATIENT_LIST', payload };
};
