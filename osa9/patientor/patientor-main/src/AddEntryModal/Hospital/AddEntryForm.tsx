import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";
import { useStateValue } from "../../state";

import { TextField, DiagnosisSelection } from "./FormField";
import { HospitalEntry } from "../../types";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 * 
 *   discharge: {
    date: string;
    criteria: string;
  }
 */
export type EntryHospitalFormValues = Omit<HospitalEntry, "id">;

interface Props {
  onSubmit: (values: EntryHospitalFormValues) => void;
  onCancel: () => void;
}

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();


  return (
    <Formik
      initialValues={{
        type: "Hospital",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        discharge: {
          date: "",
          criteria: ""
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
        if (values.discharge.date.length > 0 !== values.discharge.date.length > 0) {
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
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Discharge date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Discharge criteria"
              placeholder="Discharge criteria"
              name="discharge.criteria"
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
