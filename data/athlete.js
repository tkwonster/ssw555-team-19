import {foods} from '../config/mongoCollections.js';

export const createAthlete = async (name, calories, protein, carbs, fat, typeAmount) => {
    if(!name || !protein || !carbs || !fat || !calories || !typeAmount)
        throw "name, calories, protein, carbs, fat, and typeAmount must be provided";
    if(typeof(name) !== 'string' || typeof(protein) !== 'number' || typeof(carbs) !== 'number' || typeof(fat) !== 'number' || typeof(typeAmount) !== 'number' || typeof(calories) !== 'number')
        throw "name must be string + calories, protein, carbs, fat, and typeAmount must be number"
    name = name.trim();
    if(name.length === 0)
      throw "name cannot be empty string"
    let newFood = {
        name: name,
        calories: calories,
        protein: protein,
        carbs: carbs,
        fat: fat,
        typeAmount: typeAmount,
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
        typeAmount: typeAmount
    }
};

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

  export const setGoalsAthelete = (calories, protein, carbs, fat, typeAmount) => {
    if(!calories || !protein || !carbs || !fat || !typeAmount)
        throw 'all fields must be provided';
    if(typeof(calories) !== 'number' || typeof(protein) !== 'number' || typeof(carbs) !== 'number' || typeof(fat) !== 'number' || typeof(typeAmount) !== 'number' || typeAmount > 6)
        throw 'all fields must be numbers and typeAmount cannot be greater than 6';
    let goals = {
        calories: calories,
        protein: protein,
        carbs: carbs,
        fat: fat,
        typeAmount: typeAmount
    };
    return goals;
  };

  export const resetDailyIntakeAthlete = () => {
    let dailyIntake = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      sugar: 0
    };
    return dailyIntake;
  }