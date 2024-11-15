import {users} from '../config/mongoCollections.js';

export const createUser = async(firstName, lastName, type) => {
    if(!firstName || !lastName)
        throw 'name must be provided'
    firstName = firstName.trim();
    lastName = lastName.trim();
    if(firstName || !lastName)
        throw 'name cannot be empty spaces'
    type = 'default'
    let newUser = {
        firstName: firstName,
        lastName: lastName,
        type: type
    }
    const userCollection = await users();
    const insertInfo = await userCollection.insertOne(newUser);
    const newId = insertInfo.insertedId.toString();
    return {
        _id: newId,
        firstName: firstName,
        lastName: lastName,
        type: type
    }
}

export const setGoals = async (calories, protein, carbs, fat) => {
    if(!calories || !protein || !carbs || !fat) 
        throw 'all fields must be provided'
    if(typeof(calories) !== 'number' || typeof(protein) !== 'number' || typeof(carbs) !== 'number' || typeof(fat) !== 'number')
        throw 'all fields must be numbers'
    let goals = {
        calories: calories,
        protein: protein,
        carbs: carbs,
        fat: fat,
    };
    return goals;
};

export const setGoalsAthelete = async (calories, protein, carbs, fat, typeAmount) => {
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

export const setGoalsDiabetic = async (calories, protein, carbs, fat, sugar) => {
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

export const setGoalsSenior = async (calories, protein, carbs, fat, vitaminA, vitaminC, vitaminD, vitaminE, vitaminK, vitaminB1, vitaminB2, vitaminB3, vitaminB6, vitaminB12) => {
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