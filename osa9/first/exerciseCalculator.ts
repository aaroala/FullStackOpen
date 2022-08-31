/*
interface Result {
  periodLength: number,
  training_days: number,
  target: number,
  average: number,
  success: boolean,
  rating: number,
  ratingDescription: string
}


const parseArguments2 = (args: Array<number>) => {
  if (args.length < 2) throw new Error('Not enough arguments');
  
  if (isNaN(Number(args[0]))) {
    throw new Error('Provided values were not numbers!');
  }
  const target = Number(args[0]);
  let days: Array<number> = [];

  for (let i = 1; i < args.length; i++) {
    if (!isNaN(Number(args[i]))) {
      days = days.concat(Number(args[i]));
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }

  return {
    target: target,
    days: days
  };
};
*/

const onlyNumbers = (array: Array<number>) => {
  return array.every(element => {
    return typeof element === 'number';
  });
};

const calculateExercises = (target: number, days: Array<number>) => {

  if (!target || !days) {
    throw new Error("parameters missing");
  }

  if(!isNaN(target) && onlyNumbers(days) ) {
    const average = (days.reduce((sum, day) => sum + day, 0))/days.length;
    const days_trained = days.filter(v => v > 0).length;
    console.log(average);
    let ratingDescription = "ok";
    let rating = 2;
    if (average < target * 0.9) {ratingDescription = "pretty bad"; rating = 1;}
    else if (average > target * 1.1) {ratingDescription = "pretty good"; rating = 3;}

    return {
      periodLength: days.length,
      training_days: days_trained,
      target: target,
      average: average,
      success: (target <= average),
      rating: rating,
      ratingDescription: ratingDescription
    };
  } else {
    throw new Error("malformatted values");
  }
};

export default calculateExercises;

/*
try {
  const { target, days } = parseArguments2(process.argv);
  console.log(target, days);
  console.log(calculateExercises(target, days));
} catch (error: unknown) {
  let errorMessage = 'Something has happened!';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
*/