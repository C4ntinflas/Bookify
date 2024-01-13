const book_stores = require('express').Router()
const db = require('../models')
const { BookStore } = db

book_stores.get('/', async (req, res) => {
    try{
        const foundStores = await BookStore.findAll()
        res.status(200).json({foundStores})
    } catch (error) {
        res.status(500).json(error)
    }
})

//SHOW
book_stores.get('/:id', async (req, res) => {
    try {
        const foundStores = await BookStore.findOne({
            where: { store_id: req.params.id }
        })
        res.status(200).json(foundStores)
    } catch (error) {
        res.status(500).json(error)
    }
})

//CREATE
book_stores.post('/', async (req, res) => {
    try {
        const newStore = await BookStore.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new store',
            data: newStore
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

//UPDATE
book_stores.put('/:id', async (req, res) => {
    try {
        const updatedStores = await BookStore.update(req.body, {
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
book_stores.delete('/:id', async (req, res) => {
    try {
        const deletedStores = await BookStore.destroy({
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

module.exports = book_stores