/*
const parseArguments = (args: Array<string>) => {
  console.log(args)
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

*/
const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight/(height/100)**2;
  if (bmi < 18.5) return ("Underweight");
  else if (bmi > 24.9) return("Overweight");
  else return ("Normal weight");
  
};

/*
try {
  const { height, weight } = parseArguments(process.argv)
  console.log("height:", height, "\nheight:", weight)
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something has happened!'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
*/
export default calculateBmi;