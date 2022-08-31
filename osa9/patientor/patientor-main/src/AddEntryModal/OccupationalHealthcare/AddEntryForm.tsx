import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";
import { useStateValue } from "../../state";

import { TextField, DiagnosisSelection } from "./FormField";
import { OccupationalHealthcareEntry } from "../../types";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 * 
 *   discharge: {
    date: string;
    criteria: string;
  }
 */
export type EntryOccupationalHCFormValues = Omit<OccupationalHealthcareEntry, "id">;

interface Props {
  onSubmit: (values: EntryOccupationalHCFormValues) => void;
  onCancel: () => void;
}

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();


  return (
    <Formik
      initialValues={{
        type: "OccupationalHealthcare",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: ""
        }
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.employerName) {
          errors.specialist = requiredError;
        }
        if (values.sickLeave && values.sickLeave.startDate.length > 0 !== values.sickLeave.startDate.length > 0) {
          errors.healthCheckRating = requiredError;
        }
    
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched  }) => {
        return (
          <Form className="form ui">
            <Field
              label="Name"
              placeholder="Name"
              name="name"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Emplyer name"
              placeholder="Emplyer name"
              name="employerName"
              component={TextField}
            />
            <Field
              label="Sick leave starting date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="Sick leave starting date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              component={TextField}
            />
            <Field
              name="diagnosisCodes" 
              component={DiagnosisSelection} 
              setFieldValue={setFieldValue} 
              setFieldTouched={setFieldTouched} 
              diagnoses={Object.values(diagnoses)}
            />
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
