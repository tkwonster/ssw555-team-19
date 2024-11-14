import {foods} from '../config/mongoCollections.js';

export const create = async (name, protein, carbs, fat, vitaminD, calcium, iron, potassium, sodium) => {
    if(!name || !protein || !carbs || !fat)
        throw "name, protein, carbs, and fat must be provided";
    if(typeof(name) !== 'string' || typeof(protein) !== 'number' || typeof(carbs) !== 'number' || typeof(fat) !== 'number')
      throw "name must be string & protein, carbs, and fat must be number"
    name = name.trim();
    if(name.length === 0)
      throw "name cannot be empty string"
    let newFood = {
        name: name,
        protein: protein,
        carbs: carbs,
        fat: fat,
        vitaminD: vitaminD || undefined,
        calcium: calcium ||  undefined,
        iron: iron || undefined,
        potassium: potassium || undefined,
        sodium: sodium || undefined
    }
    const foodsCollection = await foods();
    const insertInfo = await foodsCollection.insertOne(newFood);
    const newId = insertInfo.insertedId.toString();
    return {
        _id: newId,
        name: name,
        protein: protein,
        carbs: carbs,
        fat: fat,
        vitaminD: vitaminD,
        calcium: calcium,
        iron: iron,
        potassium: potassium,
        sodium: sodium
      }
};

export const getAll = async () => {
    const foodsCollection = await foods();
    const allFoods = await foodsCollection.find({}).toArray();
    return allFoods;
}

