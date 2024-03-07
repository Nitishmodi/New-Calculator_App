const express = require('express');

const router = express.Router();
const Calculation = require('../model/Calculation');


const checkReqBody = (req, res, next) => {
    console.log(`Enter checkReqBody ${req}`);
    if (!req.body.calculation) {
        return res.status(400).send({ message: "calculation cannot be empty" });
    }
    next();
}

router.post('/',checkReqBody, async (req, res) => {

    const newCalculation = new Calculation({ calculation : req.body.calculation });
    try {
        await newCalculation.save();
        res.status(200).send("Calculation saved successfully");
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
})

router.get('/', async (req, res) => {
    try {
        const listOfcalculations = await Calculation.find().sort({ createdAt: -1 }).limit(10);

        res.send(listOfcalculations);
    } catch (err) {
        res.status(500).send('Query failed for getting calculations');
    }
})

module.exports = router;