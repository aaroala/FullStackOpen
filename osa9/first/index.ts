import express from 'express';
const app = express();

app.use(express.json());

import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  console.log(daily_exercises, target);

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(target, daily_exercises);
    res.send(result);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
      res.status(400).send( {error: error.message } );
    }
    console.log(errorMessage);
  }

});

app.get('/bmi', (req, res) => {
  console.log("query" ,req.query);
  if (req.query && req.query.height && req.query.weight) {
    const { height, weight } = req.query;

    if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
      const bmi = (calculateBmi(Number(height), Number(weight)));
      res.send({
        weight: weight,
        height: height,
        bmi: bmi
      });
    } else {
      res.status(400).send({
        error: "malformatted parameters"
      });
    }
  }
  else {
    res.status(400).send({
      error: "argmuments not given"
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});