import React from "react";
import { Button } from "@material-ui/core";
import AddEntryModal from "../AddEntryModal/HealthCheck";
import AddEntryModalHospital from "../AddEntryModal/Hospital";
import AddEntryModalOccupationalHC from "../AddEntryModal/OccupationalHealthcare";
import { EntryHealthCheckFormValues } from "../AddEntryModal/HealthCheck/AddEntryForm";
import { EntryHospitalFormValues } from "../AddEntryModal/Hospital/AddEntryForm";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import axios from "axios";
import { Patient } from "../types";
import { EntryOccupationalHCFormValues } from "../AddEntryModal/OccupationalHealthcare/AddEntryForm";


const AddEntry = ({ id }: { id: string}) => {
  const [, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [modalOpen2, setModalOpen2] = React.useState<boolean>(false);
  const [modalOpen3, setModalOpen3] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const openModal = (): void => setModalOpen(true);
  const openModal2 = (): void => setModalOpen2(true);
  const openModal3 = (): void => setModalOpen3(true);



  const submitNewEntry = async (values: EntryHealthCheckFormValues | EntryHospitalFormValues | EntryOccupationalHCFormValues) => {
    console.log(id);
    if (!id) {return(null);}

    try {
      const { data: newEntry } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}`,
        values
      );
      console.log("Entry", newEntry);
      dispatch({ type: "UPDATE_PATIENT_STATE", payload: newEntry });
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data?.error) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };



  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };
  const closeModal2 = (): void => {
    setModalOpen2(false);
    setError(undefined);
  };
  const closeModal3 = (): void => {
    setModalOpen3(false);
    setError(undefined);
  };

  return(
    <div>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <AddEntryModalHospital
        modalOpen={modalOpen2}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal2}
      />
      <AddEntryModalOccupationalHC
        modalOpen={modalOpen3}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal3}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Health Check Entry
      </Button>
      <Button variant="contained" onClick={() => openModal2()}>
        Add New Hospital Entry
      </Button>
      <Button variant="contained" onClick={() => openModal3()}>
        Add New Occupational Healthcare Entry
      </Button>

    </div>);
};

export default AddEntry;
