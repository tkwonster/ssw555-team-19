import {foods} from '../config/mongoCollections.js';

export const createDiabetic = async (name, calories, protein, carbs, fat, sugar) => {
    if(!name || !protein || !carbs || !fat || !calories)
        throw "name, calories, protein, carbs, and fat must be provided";
    if(typeof(name) !== 'string' || typeof(protein) !== 'number' || typeof(carbs) !== 'number' || typeof(fat) !== 'number' || typeof(sugar) !== 'number' || typeof(calories) !== 'number')
        throw "name must be string + calories, protein, carbs, fat, and sugar must be number"
    name = name.trim();
    if(name.length === 0)
      throw "name cannot be empty string"
    let newFood = {
        name: name,
        calories: calories,
        protein: protein,
        carbs: carbs,
        fat: fat,
        sugar: sugar,
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
        sugar: sugar
    }
};

export const resetGoalsDibaetic = () => {
    let goals = {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        sugar: 0
    };
    return goals;
  }


  export const setGoalsDiabetic = (calories, protein, carbs, fat, sugar) => {
    if(!calories || !protein || !carbs || !fat)
        throw 'all fields must be provided';
    if(typeof(calories) !== 'number' || typeof(protein) !== 'number' || typeof(carbs) !== 'number' || typeof(fat) !== 'number')
        throw 'all fields must be numbers';
    if (sugar == undefined) {
        sugar = calories * 0.06;
    } else if (typeof sugar !== 'number') {
        throw 'Sugar must be a number';
    }
    let goals = {
        calories: calories,
        protein: protein,
        carbs: carbs,
        fat: fat,
        sugar: sugar
    };
    return goals;
  };

  export const resetDailyIntakeDiabetic = () => {
    let dailyIntake = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      sugar: 0
    };
    return dailyIntake;
  }