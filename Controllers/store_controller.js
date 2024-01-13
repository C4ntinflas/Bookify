const stores = require('express').Router()
const db = require('../models')
const { Store } = db

stores.get('/', async (req, res) => {
    try{
        const foundStores = await Store.findAll()
        res.status(200).json(foundStores)
    } catch (error) {
        res.status(500).json(error)
    }
})

//SHOW
stores.get('/:id', async (req, res) => {
    try {
        const foundStores = await Store.findOne({
            where: { store_id: req.params.id }
        })
        res.status(200).json(foundStores)
    } catch (error) {
        res.status(500).json(error)
    }
})

//CREATE
stores.post('/', async (req, res) => {
    try {
        const newStore = await Store.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new store',
            data: newStore
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

//UPDATE
stores.put('/:id', async (req, res) => {
    try {
        const updatedStores = await Store.update(req.body, {
            where: {
                store_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updates ${updatedStores} store(s) `
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

//DELETE
stores.delete('/:id', async (req, res) => {
    try {
        const deletedStores = await Store.destroy({
            where: { 
                store_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedStores} store(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = stores