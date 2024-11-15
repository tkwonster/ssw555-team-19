import {foods} from '../config/mongoCollections.js';

export const create = async (name, calories, protein, carbs, fat) => {
    if(!name || !protein || !carbs || !fat || !calories)
        throw "name, calories, protein, carbs, and fat must be provided";
    if(typeof(name) !== 'string' || typeof(protein) !== 'number' || typeof(carbs) !== 'number' || typeof(fat) !== 'number' || typeof(calories) !== 'number')
      throw "name must be string + calories, protein, carbs, and fat must be number"
    name = name.trim();
    if(name.length === 0)
      throw "name cannot be empty string"
    let newFood = {
        name: name,
        calories: calories,
        protein: protein,
        carbs: carbs,
        fat: fat,
        typeAmount: null,
        sugar: null,
        vitaminA: null,
        vitaminC: null,
        vitaminD: null,
        vitaminE: null,
        vitaminK: null,
        vitaminB1: null,
        vitaminB2: null,
        vitaminB3: null,
        vitaminB6: null,
        vitaminB12: null
    }
    const foodsCollection = await foods();
    const insertInfo = await foodsCollection.insertOne(newFood);
    const newId = insertInfo.insertedId.toString();
    return {
        _id: newId,
        name: name,
        calories: calories,
        protein: protein,
        carbs: carbs,
        fat: fat,
        typeAmount: null,
        sugar: null,
        vitaminA: null,
        vitaminC: null,
        vitaminD: null,
        vitaminE: null,
        vitaminK: null,
        vitaminB1: null,
        vitaminB2: null,
        vitaminB3: null,
        vitaminB6: null,
        vitaminB12: null
      }
};

export const getAll = async () => {
    const foodsCollection = await foods();
    const allFoods = await foodsCollection.find({}).toArray();
    return allFoods;
}

export const resetGoals = () => {
  let goals = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
  };
  return goals;
}

export const resetGoalsAthlete = () => {
  let goals = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      typeAmount: 0
  };
  return goals;
}

export const resetGoalsSenior = () => {
  let goals = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      vitaminA: 0,
      vitaminC: 0,
      vitaminD: 0,
      vitaminE: 0,
      vitaminK: 0,
      vitaminB1: 0,
      vitaminB2: 0,
      vitaminB3: 0,
      vitaminB6: 0,
      vitaminB12: 0
  };
  return goals;
}

export const setGoals = (calories, protein, carbs, fat) => {
  if(!calories || !protein || !carbs || !fat) 
      throw 'all fields must be provided'
  if(typeof(calories) !== 'number' || typeof(protein) !== 'number' || typeof(carbs) !== 'number' || typeof(fat) !== 'number') {
    console.log(typeof(calories));
      throw 'all fields must be numbers'
  }
  let goals = {
      calories: calories,
      protein: protein,
      carbs: carbs,
      fat: fat,
  };
  return goals;
};

export const resetDailyIntake = () => {
  let dailyIntake = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  };
  return dailyIntake;
}

export const setGoalsAthelete = (calories, protein, carbs, fat, typeAmount) => {
  if(!calories || !protein || !carbs || !fat || !typeAmount)
      throw 'all fields must be provided';
  if(typeof(calories) !== 'number' || typeof(protein) !== 'number' || typeof(carbs) !== 'number' || typeof(fat) !== 'number' || typeof(typeAmount !== 'number' || typeAmount > 7))
      throw 'all fields must be numbers and typeAmount cannot be greater than 7';
  let goals = {
      calories: calories,
      protein: protein,
      carbs: carbs,
      fat: fat,
      typeAmount: typeAmount
  };
  return goals;
};


export const setGoalsSenior = (calories, protein, carbs, fat, vitaminA, vitaminC, vitaminD, vitaminE, vitaminK, vitaminB1, vitaminB2, vitaminB3, vitaminB6, vitaminB12) => {
  if(!calories || !protein || !carbs || !fat || !vitaminA || !vitaminC || !vitaminD || !vitaminE || !vitaminK ||! vitaminB1 || !vitaminB2 || !vitaminB3 || !vitaminB6 || !vitaminB12)
      throw 'all fields must be provided';
  if(typeof(calories) !== 'number' || typeof(protein) !== 'number' || typeof(carbs) !== 'number' || typeof(fat) !== 'number')
      throw 'all fields must be numbers';
  let goals = {
      calories: calories,
      protein: protein,
      carbs: carbs,
      fat: fat,
      vitaminA: vitaminA,
      vitaminC: vitaminC,
      vitaminD: vitaminD,
      vitaminE: vitaminE,
      vitaminK: vitaminK,
      vitaminB1: vitaminB1,
      vitaminB2: vitaminB2,
      vitaminB3: vitaminB3,
      vitaminB6: vitaminB6,
      vitaminB12: vitaminB12
  };
  return goals;
};


