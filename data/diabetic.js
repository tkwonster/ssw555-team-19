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



