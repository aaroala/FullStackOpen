import { useStateValue } from "../state";
import { Entry } from "../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';

const EntryInfo = ({ entry }: {entry: Entry}) => {
  const [{ diagnoses }, ] = useStateValue();

  const style = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const infoSwitch = () => {
    switch(entry.type) {
      case "Hospital":
        return(
        <>
          {entry.date} <LocalHospitalIcon /> <br />
          {entry.description} <br />

          {entry.discharge.date} <br /> {entry.discharge.criteria} <br />
        </>);
      case "OccupationalHealthcare":
        return(
        <>
          {entry.date} <WorkIcon /> <br />
          {entry.description}
          {entry.sickLeave ?
          <><br />sick leave from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</>
          :<></>} <br />
          employer: {entry.employerName} <br />
        </>);
      case "HealthCheck":
        return(
          <>
          {entry.date} <MedicalInformationIcon /> <br />
          {entry.description} <br />

        </>);

      default:
        return(
        <>
          error...
        </>);
    }
  };

  return(
    <div style={style}>
    {infoSwitch()}
    diagnose by {entry.specialist}<br />
    <br />
    {entry.diagnosisCodes?.map((code) => (
      <li key={code}>{code} {diagnoses[code].name}</li>
    ))}
    </div>
  );
};

export default EntryInfo;