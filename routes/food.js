import { Router } from 'express';
const router = Router();
import { create, getAll } from '../data/food.js';

let dailyIntake = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
};

let goals = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
};

// Home Page Route
router.get('/', (req, res) => {
    res.render('home');
});

// Daily Intake Page
router.get('/dailyIntake', (req, res) => {
    res.render('dailyIntake', { dailyIntake });
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
    goals = {
        calories: parseInt(req.body.calories),
        protein: parseFloat(req.body.protein),
        carbs: parseFloat(req.body.carbs),
        fat: parseFloat(req.body.fat)
    };
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
    goals = {
        protein: 0,
        carbs: 0,
        fat: 0,
        vitaminD: 0,
        calcium: 0,
        iron: 0,
        potassium: 0,
        sodium: 0,
    };
    res.redirect('/goals');
});

// Reset Daily Intake
router.post('/resetDaily', (req, res) => {
    dailyIntake = {
        protein: 0,
        carbs: 0,
        fat: 0,
        vitaminD: 0,
        calcium: 0,
        iron: 0,
        potassium: 0,
        sodium: 0,
    };
    res.redirect('/dailyIntake');
});

// Edit Daily Intake
router.post('/editIntake', (req, res) => {
    const protein = parseFloat(req.body.protein) || 0;
    const carbs = parseFloat(req.body.carbs) || 0;
    const fat = parseFloat(req.body.fat) || 0;
    const vitaminD = parseFloat(req.body.vitaminD) || 0;
    const calcium = parseFloat(req.body.calcium) || 0;
    const iron = parseFloat(req.body.iron) || 0;
    const potassium = parseFloat(req.body.potassium) || 0;
    const sodium = parseFloat(req.body.sodium) || 0;

    dailyIntake.protein += protein;
    dailyIntake.carbs += carbs;
    dailyIntake.fat += fat;
    dailyIntake.vitaminD += vitaminD;
    dailyIntake.calcium += calcium;
    dailyIntake.iron += iron;
    dailyIntake.potassium += potassium;
    dailyIntake.sodium += sodium;

    res.redirect('/dailyIntake');
});

export default router;
