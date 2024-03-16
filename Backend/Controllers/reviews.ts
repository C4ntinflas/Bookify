import { Router, Request, Response } from 'express';
import db from '../models';
const { Reviews } = db;

const reviews = Router();

reviews.get('/', async (req: Request, res: Response) => {
    try {
        const foundReviews = await Reviews.findAll();
        console.log(foundReviews);
        res.status(200).json({ foundReviews });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});

export default reviews;
