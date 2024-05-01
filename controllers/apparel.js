const express = require('express');
const Apparel = require('../models/apparel')
const router = express.Router(); 


router.get('/', async (req, res) => {
    try {
        const apparel= await Apparel.find({})

        console.log(apparel, 'Stopped right her')
        
    res.json(apparel)
    
    }catch(err){
        res.status(400).json(err);
    }
})
router.get('/mens', async (req, res) => {
    try {
        const apparel= await Apparel.find({})

        console.log(apparel, 'Stopped right her')
        
    res.json(apparel)
    
    }catch(err){
        res.status(400).json(err);
    }
})
router.post('/', async (req, res) => {
    try {
        const apparel= await Apparel.create(req.body)

        res.json(apparel)
    }catch(err){
        res.status(400).json(err);
    }
})
router.delete('/:id', async (req, res) => {
    try {
        res.json(await Apparel.findByIdAndDelete(req.params.id))
    } catch (err) {
        res.status(400).json(err);
    }
})
router.get('/:id', async (req, res) => {
    try {
        res.json(await Apparel.findById(req.params.id))
    } catch (err) {
        res.status(400).json(err);
    }
})
 
router.put('/:id', async (req, res) => {
    try {

        res.json(await Apparel.findByIdAndUpdate(req.params.id, req.body))
    } catch (err) {
        res.status(400).json(err);
    }
})


module.exports = router;