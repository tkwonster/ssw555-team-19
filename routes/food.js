import { Router } from 'express';
const router = Router();
import {users, foods} from '../config/mongoCollections.js';
import { create, getAll, resetGoals, resetDailyIntake, setGoals } from '../data/food.js';
import { createDiabetic, resetGoalsDibaetic, setGoalsDiabetic, resetDailyIntakeDiabetic} from '../data/diabetic.js'
import { createSenior, resetGoalsSenior, setGoalsSenior, resetDailyIntakeSenior} from '../data/seniorCitizen.js'
import { createAthlete, resetGoalsAthlete, setGoalsAthelete, resetDailyIntakeAthlete } from '../data/athlete.js';
import { createUser, loginUser } from '../data/users.js';
import { ObjectId } from 'mongodb';

let goals = {calories: 0, protein: 0, carbs: 0, fat: 0};
let goalsAthelete = {calories: 0, protein: 0, carbs: 0, fat: 0, typeAmount: 0};
let goalsDiabetic = {calories: 0, protein: 0, carbs: 0, fat: 0, sugar: 0};
let goalsSenior = {calories: 0, protein: 0, carbs: 0, fat: 0, vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminE: 0, vitaminK: 0,vitaminB1: 0, vitaminB2: 0,vitaminB3: 0,vitaminB6: 0,vitaminB12: 0};
let dailyIntake = {calories: 0, protein: 0, carbs: 0, fat:0};
let dailyIntakeAthlete = {calories: 0, protein: 0, carbs: 0, fat: 0}
let dailyIntakeDiabetic = {calories: 0, protein: 0, carbs: 0, fat: 0, sugar: 0}
let dailyIntakeSenior = {calories: 0, protein: 0, carbs: 0, fat: 0, vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminE: 0, vitaminK: 0,vitaminB1: 0, vitaminB2: 0,vitaminB3: 0,vitaminB6: 0,vitaminB12: 0}

// Home Page Route
router.get('/', (req, res) => {
    res.render('home');
});

router.post('/setUserType', (req, res) => {
    const userType = req.body.userType
    req.session.userType = userType
    if (userType == "default") {
        res.render('setGoals');
    } else if (userType == "athlete") {
        res.render('setGoalsAthlete');
    } else if (userType == "diabetes") {
        res.render('setGoalsDiabetes');
    } else if (userType == "senior") {
        res.render('setGoalsSenior');
    }
});

// Daily Intake Page
router.get('/dailyIntake', (req, res) => {
    if (res.locals.userType == "default") {
        res.render('dailyIntake', { dailyIntake });
    } else if (res.locals.userType == "athlete") {
        res.render('dailyIntakeAthlete', { dailyIntakeAthlete });
    } else if (res.locals.userType == "diabetes") {
        res.render('dailyIntakeDiabetes', { dailyIntakeDiabetic });
    } else if (res.locals.userType == "senior") {
        res.render('dailyIntakeSenior', { dailyIntakeSenior });
    }
});
// Goals Page
router.get('/goals', (req, res) => {
    if(res.locals.userType == 'default') {
        res.render('goals', { goals: req.session.dailyGoal });
    } else if(res.locals.userType == 'athlete') {
        res.render('goalsAthlete', { goals: req.session.dailyGoal });
    } else if(res.locals.userType == 'diabetes') {
        res.render('goalsDiabetes', { goals:req.session.dailyGoal });
    } else if (res.locals.userType == 'senior') {
        res.render('goalsSenior', { goals: req.session.dailyGoal});
    }

}); 

// Set Daily Goals Page
router.get('/setGoals', (req, res) => {
    const userType = req.session.userType
    if(userType == 'default') {
        res.render('setGoals');
    } else if(userType == 'athlete') {
        res.render('setGoalsAthlete');
    } else if(userType == 'diabetes') {
        res.render('setGoalsDiabetes');
    } else if (userType == 'senior') {
        res.render('setGoalsSenior');
    }
    
});

// Set Goals Form Submission
router.post('/setGoals', async (req, res) => {
    if(res.locals.userType === 'default') {
        const {calories, protein, carbs, fat} = req.body;
        goals = setGoals(parseInt(calories), parseFloat(protein), parseFloat(carbs), parseFloat(fat));
        req.session.user = req.session.user || {};
        req.session.user.dailyGoal = goals; 
        const userCollection = await users();
        const userId = new ObjectId(req.session.userId);
        await userCollection.updateOne(
            { _id: userId },
            { $set: { "dailyGoal": goals } }
        );
        res.render('goals', {goals: goals});
    } else if(res.locals.userType == 'athlete') {
        const {calories, protein, carbs, fat, typeAmount} = req.body;
        goalsAthelete = setGoalsAthelete(parseInt(calories), parseFloat(protein), parseFloat(carbs), parseFloat(fat), parseInt(typeAmount));
        req.session.user = req.session.user || {};
        req.session.user.dailyGoal = goalsAthelete; 
        const userCollection = await users();
        const userId = new ObjectId(req.session.userId);
        await userCollection.updateOne(
            { _id: userId },
            { $set: { "dailyGoal": goalsAthelete } }
        );
        res.render('goalsAthlete', {goals: goalsAthelete});
    } else if(res.locals.userType == 'diabetes') {
        const {calories, protein, carbs, fat, sugar} = req.body;
        goalsDiabetic = setGoalsDiabetic(parseInt(calories), parseFloat(protein), parseFloat(carbs), parseFloat(fat), parseInt(sugar));
        req.session.user = req.session.user || {};
        req.session.user.dailyGoal = goalsDiabetic; 
        const userCollection = await users();
        const userId = new ObjectId(req.session.userId);
        await userCollection.updateOne(
            { _id: userId },
            { $set: { "dailyGoal": goalsDiabetic } }
        );
        res.render('goalsDiabetes', {goals: goalsDiabetic});
    } else if (res.locals.userType == 'senior') {
        const {calories, protein, carbs, fat, vitaminA, vitaminC, vitaminD, vitaminE, vitaminK,vitaminB1, vitaminB2,vitaminB3,vitaminB6,vitaminB12} = req.body;
        goalsSenior = setGoalsSenior(parseInt(calories), parseFloat(protein), parseFloat(carbs), parseFloat(fat), parseInt(vitaminA), parseInt(vitaminC), parseInt(vitaminD), parseInt(vitaminE), parseInt(vitaminK), parseInt(vitaminB1), parseInt(vitaminB2), parseInt(vitaminB3), parseInt(vitaminB6), parseInt(vitaminB12));
        req.session.user = req.session.user || {};
        req.session.user.dailyGoal = goalsSenior; 
        const userCollection = await users();
        const userId = new ObjectId(req.session.userId);
        await userCollection.updateOne(
            { _id: userId },
            { $set: { "dailyGoal": goalsSenior } }
        );
        res.render('goalsSenior', {goals: goalsSenior});
    }
});

// Create Food Entry
router.post('/create', async (req, res) => {
    try {
        const { name, calories, protein, carbs, fat} = req.body;
        const food = await create(
            name,
            parseInt(calories),
            parseFloat(protein),
            parseFloat(carbs),
            parseFloat(fat)
        );
        res.render('home', { message: `Food added successfully! ${food.name} was added.` });
    } catch (e) {
        res.render('home', { message: `Error: ${e}` });
    }
});

// View All Foods
router.get('/foods', async (req, res) => {
    try {
        const foods = await getAll();
        res.render('foods', { foods });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

// Reset Goals
router.post('/resetGoals', async (req, res) => {
    req.session.user = req.session.user || {};
    const userCollection = await users();
    const userId = new ObjectId(req.session.userId);

    if (res.locals.userType == 'default') {
        const goals = resetGoals();
        req.session.user.dailyGoal = goals;
        await userCollection.updateOne(
            { _id: userId },
            { $set: { dailyGoal: goals } }
        );
        res.render('goals', {goals});
    } else if (res.locals.userType == 'athlete') {
        const goalsAthlete = resetGoalsAthlete();
        req.session.user.dailyGoal = goalsAthlete;
        await userCollection.updateOne(
            { _id: userId },
            { $set: { dailyGoal: goalsAthelete } }
        );
        res.render('goalsAthlete', {goals: goalsAthelete});
    } else if (res.locals.userType == 'diabetes') {
        const goalsDiabetic = resetGoalsDibaetic();
        req.session.user.dailyGoal = goalsDiabetic;
        await userCollection.updateOne(
            { _id: userId },
            { $set: { dailyGoal: goalsDiabetic } }
        );
        res.render('goalsDiabetes', {goals: goalsDiabetic});
    } else if (res.locals.userType == 'senior') {
        const goalsSenior = resetGoalsSenior();
        req.session.user.dailyGoal = goalsSenior;
        await userCollection.updateOne(
            { _id: userId },
            { $set: { dailyGoal: goalsSenior } }
        );
        res.render('goalsSenior', {goals: goalsSenior});
    } else {
        res.status(400).send('Invalid user type');
    }
});


// Reset Daily Intake
router.post('/resetDaily', (req, res) => {
    const userType = req.session.userType; 
    if(userType === 'senior') {
        dailyIntakeSenior = resetDailyIntakeSenior();
        res.render('dailyIntakeSenior', {dailyIntake: dailyIntakeSenior})
    } else if (userType === 'diabetic') {
        dailyIntakeDiabetic = resetDailyIntakeDiabetic();
        res.render('dailyIntakeSenior', {dailyIntake: dailyIntakeDiabetic})
    } else if (userType === 'athlete') {
        dailyIntakeAthlete = resetDailyIntakeDiabetic();
        res.render('dailyIntakeSenior', {dailyIntake: dailyIntakeAthlete})
    } else {
        dailyIntake = resetDailyIntake();
        res.render('dailyIntakeSenior', {dailyIntake: dailyIntake})
    }
});

// Edit Daily Intake
router.post('/editIntake', (req, res) => {
    const userType = req.session.userType;
    const calories = parseInt(req.body.calories) || 0;
    const protein = parseFloat(req.body.protein) || 0;
    const carbs = parseFloat(req.body.carbs) || 0;
    const fat = parseFloat(req.body.fat) || 0;
    const sugar = parseFloat(req.body.sugar) || 0;
    const vitaminA = parseFloat(req.body.vitaminA) || 0;
    const vitaminC = parseFloat(req.body.vitaminC) || 0;
    const vitaminD = parseFloat(req.body.vitaminD) || 0;
    const vitaminE = parseFloat(req.body.vitaminE) || 0;
    const vitaminK = parseFloat(req.body.vitaminK) || 0;
    const vitaminB1 = parseFloat(req.body.vitaminB1) || 0;
    const vitaminB2 = parseFloat(req.body.vitaminB2) || 0;
    const vitaminB3 = parseFloat(req.body.vitaminB3) || 0;
    const vitaminB6 = parseFloat(req.body.vitaminB6) || 0;
    const vitaminB12 = parseFloat(req.body.vitaminB12) || 0;
    if (userType === 'athlete') {
        dailyIntakeAthlete.calories += calories;
        dailyIntakeAthlete.protein += protein;
        dailyIntakeAthlete.carbs += carbs;
        dailyIntakeAthlete.fat += fat;
        res.render('dailyIntakeAthlete', {dailyIntake: dailyIntakeAthlete});
    } else if (userType === 'diabetic') {
        dailyIntakeDiabetic.calories += calories;
        dailyIntakeDiabetic.protein += protein;
        dailyIntakeDiabetic.carbs += carbs;
        dailyIntakeDiabetic.fat += fat;
        dailyIntakeDiabetic.sugar += sugar;
        res.render('dailyIntakeDiabetes', {dailyIntake: dailyIntakeDiabetic});
    } else if (userType === 'senior') {
        dailyIntakeSenior.calories += calories;
        dailyIntakeSenior.protein += protein;
        dailyIntakeSenior.carbs += carbs;
        dailyIntakeSenior.fat += fat;
        dailyIntakeSenior.vitaminA += vitaminA;
        dailyIntakeSenior.vitaminC += vitaminC;
        dailyIntakeSenior.vitaminD += vitaminD;
        dailyIntakeSenior.vitaminE += vitaminE;
        dailyIntakeSenior.vitaminK += vitaminK;
        dailyIntakeSenior.vitaminB1 += vitaminB1;
        dailyIntakeSenior.vitaminB2 += vitaminB2;
        dailyIntakeSenior.vitaminB3 += vitaminB3;
        dailyIntakeSenior.vitaminB6 += vitaminB6;
        dailyIntakeSenior.vitaminB12 += vitaminB12;
        res.render('dailyIntakeSenior', {dailyIntake: dailyIntakeSenior});
    } else {
        dailyIntake.calories += calories;
        dailyIntake.protein += protein;
        dailyIntake.carbs += carbs;
        dailyIntake.fat += fat;
        res.render('dailyIntake', {dailyIntake: dailyIntake});
    }
    
});



router.get('/signup', (req, res) => {
    res.render('signup');
})

router.post('/signup', async (req, res) => {
    try {
        const { userName, password, userType } = req.body;
        const newUser = await createUser(userName, password, userType);
        req.session.userId = newUser._id;
        req.session.userName = newUser.userName;
        req.session.userType = newUser.userType; 
        req.session.dailyGoal = newUser.dailyGoal;
        res.redirect('/');
    } catch (error) {
        res.status(500).send(error.message);
    }
  });

  router.get('/login', async (req, res) => {
    res.render('login');
  })

  router.post('/login', async (req, res) => {
    try {
      const { userName, password } = req.body;
      const loggedInUser = await loginUser(userName, password);
      req.session.userId = loggedInUser._id;
      req.session.userName = loggedInUser.userName;
      req.session.userType = loggedInUser.Usertype; 
      req.session.dailyGoal = loggedInUser.dailyGoal;
      res.redirect('/');
    } catch (error) {
      res.status(500).send('Login failed: ' + error);
    }
  });
  
  router.get('/foods', async (req, res) => {
    const foodsCollection = await foods()
    const foodsList = await foodsCollection.find({}).toArray();
    res.render('foods', {foods: foodsList})
  })

  router.get('/addFoods', async (req, res) => {
    const userType = req.session.userType;
    res.render('addFoods', { userType });
});

router.post('/addFoods', async (req, res) => {
    const userType = req.session.userType;
    const { name, calories, protein, carbs, fat, sugar, vitaminA, vitaminC, vitaminD, vitaminE, vitaminK, vitaminB1, vitaminB2, vitaminB3, vitaminB6, vitaminB12 } = req.body;
    try {
        if (userType === 'senior') {
            const newFood = await createSenior(name, parseInt(calories), parseInt(protein), parseInt(carbs), parseInt(fat), parseInt(vitaminA), parseInt(vitaminC), parseInt(vitaminD), parseInt(vitaminE), parseInt(vitaminK), parseInt(vitaminB1), parseInt(vitaminB2), parseInt(vitaminB3), parseInt(vitaminB6), parseInt(vitaminB12));
            const foodsCollection = await foods();
            const foodsList = await foodsCollection.find({}).toArray();
            res.render('foods', {foods: foodsList});
        } else if (userType === 'athlete') {
            const newFood = await createAthlete(name, parseInt(calories), parseInt(protein), parseInt(carbs), parseInt(fat));
            const foodsCollection = await foods();
            const foodsList = await foodsCollection.find({}).toArray();
            res.render('foods', {foods: foodsList});
        } else if (userType === 'diabetic') {
            const newFood = await createDiabetic(name, parseInt(calories), parseInt(protein), parseInt(carbs), parseInt(fat), parseInt(sugar));
            const foodsCollection = await foods();
            const foodsList = await foodsCollection.find({}).toArray();
            res.render('foods', {foods: foodsList});
        } else {
            const newFood = await create(name, parseInt(calories), parseInt(protein), parseInt(carbs), parseInt(fat));
            const foodsCollection = await foods();
            const foodsList = await foodsCollection.find({}).toArray();
            res.render('foods', {foods: foodsList});
        }
    } catch (error) {
        res.status(400).send(error);
    }
});


export default router;
