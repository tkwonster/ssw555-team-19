import { Router } from 'express';
const router = Router();
import { create, getAll, resetGoals, resetDailyIntake, setGoals } from '../data/food.js';
import { createDiabetic, resetGoalsDibaetic, setGoalsDiabetic, resetDailyIntakeDiabetic} from '../data/diabetic.js'
import { createSenior, resetGoalsSenior, setGoalsSenior, resetDailyIntakeSenior} from '../data/seniorCitizen.js'

let goals = {calories: 0, protein: 0, carbs: 0, fat: 0};
let dailyIntake = {calories: 0, protein: 0, carbs: 0, fat:0};
let dailyIntakeAthlete = {calories: 0, protein: 0, carbs: 0, fat: 0, typeAmount: 0}
let dailyIntakeDiabetic = {calories: 0, protein: 0, carbs: 0, fat: 0, sugar: 0}
let dailyIntakeSenior = {vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminE: 0, vitaminK: 0,vitaminB1: 0, vitaminB2: 0,vitaminB3: 0,vitaminB6: 0,vitaminB12: 0}

// Home Page Route
router.get('/', (req, res) => {
    res.render('home');
});

router.post('/', (req, res) => {
    const userType = req.body.userType
    res.locals.userType = userType
    if(res.locals.userType === undefined) {
        res.locals.userType = "default";
    }
    res.redirect('/setGoals');
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
    res.render('goals', { goals });
}); 

// Set Daily Goals Page
router.get('/setGoals', (req, res) => {
    res.render('setGoals');
});

// Set Goals Form Submission
router.post('/setGoals', (req, res) => {
    const {calories, protein, carbs, fat} = req.body;
    goals = setGoals(parseInt(calories), parseFloat(protein), parseFloat(carbs), parseFloat(fat));
    res.redirect('/goals');
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
router.post('/resetGoals', (req, res) => {
    goals = resetGoals();
    res.redirect('/goals');
});

// Reset Daily Intake
router.post('/resetDaily', (req, res) => {
    dailyIntake = resetDailyIntake();
    res.redirect('/dailyIntake');
});

// Edit Daily Intake
router.post('/editIntake', (req, res) => {
    const calories = parseInt(req.body.calories) || 0;
    const protein = parseFloat(req.body.protein) || 0;
    const carbs = parseFloat(req.body.carbs) || 0;
    const fat = parseFloat(req.body.fat) || 0;

    dailyIntake.calories += calories;
    dailyIntake.protein += protein;
    dailyIntake.carbs += carbs;
    dailyIntake.fat += fat;

    res.redirect('/dailyIntake');
});

export default router;
