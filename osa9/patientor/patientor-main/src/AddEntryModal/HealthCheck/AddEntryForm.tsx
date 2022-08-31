import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";
import { useStateValue } from "../../state";

import { TextField, DiagnosisSelection, SelectField } from "./FormField";
import { HealthCheckEntry } from "../../types";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type EntryHealthCheckFormValues = Omit<HealthCheckEntry, "id">;

interface Props {
  onSubmit: (values: EntryHealthCheckFormValues) => void;
  onCancel: () => void;
}

export type healthOption = {
  value: string;
  label: string;
};

const healthOptions: healthOption[]= [
  { value: "Healthy", label: "Healthy" },
  { value: "LowRisk", label: "Low Risk" },
  { value: "HighRisk", label: "High Risk" },
  { value: "CriticalRisk", label: "Critical Risk" },
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();


  return (
    <Formik
      initialValues={{
        type: "HealthCheck",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        healthCheckRating: 0
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
        if (!values.healthCheckRating) {
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
            <SelectField name="healthCheckRating" label="Healh rating" options={healthOptions} />
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
