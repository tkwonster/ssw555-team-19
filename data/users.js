import {users} from '../config/mongoCollections.js';
import bcrypt from 'bcrypt'

export const createUser = async(userName, password, Usertype) => {
    if(!userName || !password)
        throw 'name and password must be provided'
    userName = userName.trim();
    password = password.trim();
    if(userName.length === 0 || password.length === 0)
        throw 'name cannot be empty spaces'
    const hashedPassword = await bcrypt.hash(password, 10);
    const favoriteFoods = []
    let dailyGoal = {}
    if(Usertype === 'senior') {
        dailyGoal = {
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
        }
    } else if (Usertype === 'athlete') {
        dailyGoal = {
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0,
            typeAmount: 0
        }
    } else if (Usertype === 'diabetic') {
        dailyGoal = {
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0,
            sugar: 0
        }
    } else {
        dailyGoal = {
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0,
        }
    }
    let newUser = {
        userName: userName,
        password: hashedPassword,
        Usertype: Usertype,
        favorite: favoriteFoods,
        dailyGoal: dailyGoal
    }
    const userCollection = await users();
    const insertInfo = await userCollection.insertOne(newUser);
    const newId = insertInfo.insertedId.toString();
    return {
        _id: newId,
        userName: userName,
        userType: Usertype,
        favorite: favoriteFoods,
        dailyGoal: dailyGoal
    }
}

export const loginUser = async(userName, password) => {
    if(!userName || !password)
        throw 'name and password must be provided'
    userName = userName.trim();
    password = password.trim();
    if(userName.length === 0 || password.length === 0)
        throw 'name cannot be empty spaces'
    const userCollection = await users();
    const user = await userCollection.findOne({ userName: userName });
    if (!user) {
        throw 'User not found';
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw 'Invalid password';
    }
    const { password: _, ...userData } = user;
    return userData;
}