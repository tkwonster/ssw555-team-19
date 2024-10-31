import {Router} from 'express';
const router = Router();
import { create, getAll } from '../data/food.js';
import {foods} from '../config/mongoCollections.js';


let dailyIntake = {
    protein: 0,
    carbs: 0,
    fat: 0,
    vitaminD: 0,
    calcium: 0,
    iron: 0,
    potassium: 0,
    sodium: 0,
};

let goals = {
    protein: 0,
    carbs: 0,
    fat: 0,
    vitaminD: 0,
    calcium: 0,
    iron: 0,
    potassium: 0,
    sodium: 0,
};

router.route('/').get(async (req, res) => {
    res.render('home', { dailyIntake, goals });
});

router.route('/create').post(async (req, res) => {
    try {
        const { name, protein, carbs, fat, vitaminD, calcium, iron, potassium, sodium } = req.body;
        const food = await create(
            name,
            parseFloat(protein),
            parseFloat(carbs),
            parseFloat(fat),
            vitaminD ? parseFloat(vitaminD) : undefined,
            calcium ? parseFloat(calcium) : undefined,
            iron ? parseFloat(iron) : undefined,
            potassium ? parseFloat(potassium) : undefined,
            sodium ? parseFloat(sodium) : undefined
        );
        res.render('home', {message: `Food added successfully! ${food.name} was added.`});
    } catch (e) {
        res.render('home', {message: `Error: ${e}`});
    }
});

router.route('/foods').get(async (req, res) => {
    try {
        const foods = await getAll();
        res.render('foods', { foods });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.route('/setGoals').post(async (req, res) => {
    goals.protein = parseFloat(req.body.protein) || 0;
    goals.carbs = parseFloat(req.body.carbs) || 0;
    goals.fat = parseFloat(req.body.fat) || 0;
    goals.vitaminD = parseFloat(req.body.vitaminD) || 0;
    goals.calcium = parseFloat(req.body.calcium) || 0;
    goals.iron = parseFloat(req.body.iron) || 0;
    goals.potassium = parseFloat(req.body.potassium) || 0;
    goals.sodium = parseFloat(req.body.sodium) || 0;

    res.redirect('/');
})

router.route('/editIntake').post(async (req, res) => {
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

    res.redirect('/');
});

router.route('/resetGoals').post(async (req, res) => {
    goals.protein = 0;
    goals.carbs = 0;
    goals.fat = 0;
    goals.vitaminD = 0;
    goals.calcium = 0;
    goals.iron = 0;
    goals.potassium = 0;
    goals.sodium = 0;
    
    res.redirect('/');
});

router.route('/resetDaily').post(async (req, res) => {
    dailyIntake.protein = 0;
    dailyIntake.carbs = 0;
    dailyIntake.fat = 0;
    dailyIntake.vitaminD = 0;
    dailyIntake.calcium = 0;
    dailyIntake.iron = 0;
    dailyIntake.potassium = 0;
    dailyIntake.sodium = 0;
    
    res.redirect('/');
});


export default router;