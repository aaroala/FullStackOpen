import React from "react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import axios from "axios";

import EntryInfo from "./EntryInfo";

import AddEntry from "./AddEntry";


const PatientPage = () => {
  const [{ patients }, dispatch ] = useStateValue();
  const { id } = useParams<{ id: string }>();
  if (id === undefined) return(<div>loading...</div>);

  let patient = patients[id];

  if (!patient?.ssn) {
      const fetchPatientList = async () => {
        try {
          const { data: patientInfoFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch({ type: "UPDATE_PATIENT_STATE", payload: patientInfoFromApi });
          patient = patientInfoFromApi;
        } catch (e) {
          console.log("this didnt work");
          console.error(e);
        }
      };
      void fetchPatientList();
  }
  

  console.log("patient", patient);


  return(
    <div>
      <h2>{patient?.name}</h2>
      ssn: {patient?.ssn} <br/>
      occupation: {patient?.occupation}
      <h2>entries</h2>
      {patient?.entries?.map((entry, index) => (
        <EntryInfo key={index} entry={entry} />
      ))}
      <AddEntry id={id}/>
    </div>
  );
};

export default PatientPage;