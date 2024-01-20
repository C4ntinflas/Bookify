const reviews = require('express').Router()
const db = require('../models')
const { Reviews } = db


reviews.get('/', async (req, res) => {
    try{
        const foundreviews = await Reviews.findAll({
            where: {
                
            }
        })
        console.log(foundStores)
        res.status(200).json({ foundStores })
    } catch (error) {
        res.status(500).json(error)
    }
})