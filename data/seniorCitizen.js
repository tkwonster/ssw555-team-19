import {foods} from '../config/mongoCollections.js';

export const createSenior = async (name, calories, protein, carbs, fat, vitaminA, vitaminC, vitaminD, vitaminE, vitaminK, vitaminB1, vitaminB2, vitaminB3, vitaminB6, vitaminB12) => {
    if(!name || !protein || !carbs || !fat)
        throw "name, protein, carbs, and fat must be provided";
    if (typeof(name) !== 'string') {
        console.log('name is not a string');
    }
    if (typeof(protein) !== 'number') {
        console.log('protein is not a number');
    }
    if (typeof(carbs) !== 'number') {
        console.log('carbs is not a number');
    }
    if (typeof(fat) !== 'number') {
        console.log('fat is not a number');
    }
    if (typeof(vitaminA) !== 'number') {
        console.log('vitaminA is not a number');
    }
    if (typeof(vitaminC) !== 'number') {
        console.log('vitaminC is not a number');
    }
    if (typeof(vitaminD) !== 'number') {
        console.log('vitaminD is not a number');
    }
    if (typeof(vitaminE) !== 'number') {
        console.log('vitaminE is not a number');
    }
    if (typeof(vitaminK) !== 'number') {
        console.log('vitaminK is not a number');
    }
    if (typeof(vitaminB1) !== 'number') {
        console.log('vitaminB1 is not a number');
    }
    if (typeof(vitaminB2) !== 'number') {
        console.log('vitaminB2 is not a number');
    }
    if (typeof(vitaminB3) !== 'number') {
        console.log('vitaminB3 is not a number');
    }
    if (typeof(vitaminB6) !== 'number') {
        console.log('vitaminB6 is not a number');
    }
    if (typeof(vitaminB12) !== 'number') {
        console.log('vitaminB12 is not a number');
    }
    name = name.trim();
    if(name.length === 0)
      throw "name cannot be empty string"
    let newFood = {
        name: name,
        calories: calories,
        protein: protein,
        carbs: carbs,
        fat: fat,
        sugar: null,
        vitaminA: vitaminA || undefined,
        vitaminC: vitaminC || undefined,
        vitaminD: vitaminD || undefined,
        vitaminE: vitaminE || undefined,
        vitaminK: vitaminK || undefined,
        vitaminB1: vitaminB1 || undefined,
        vitaminB2: vitaminB2 || undefined,
        vitaminB3: vitaminB3 || undefined,
        vitaminB6: vitaminB6 || undefined,
        vitaminB12: vitaminB12 || undefined
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
        sugar: null,
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
      }
};

export const resetDailyIntakeSenior = () => {
    let dailyIntake = {
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
    return dailyIntake;
};

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
        sugar: null,
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
  