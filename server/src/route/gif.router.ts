/* eslint-disable no-useless-catch */
import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import SearchController from '../controllers';
import { userKey } from '../utils/auth';
import { redisCacheHandler } from '../middleware/cache';

const router = express.Router();

const searchStringValidation = [
    body('searchString')
        .trim()
        .isLength({ min: 3, max: 300 })
        .withMessage('The search string must be a minimum of 3 characters'),
];

router.post('/', searchStringValidation, redisCacheHandler, async (req: Request, res: Response) => {
    try {
        const { searchString } = req.body;
        const reqError = validationResult(req);
        if (!reqError.isEmpty()) {
            return res.status(400).send({ message: reqError.array() });
        }
        console.log('Fetching from API');
        const data = await SearchController.fetchGifs({ searchString, apiKey: userKey });

        if (data.errCode) {
            return res.status(data.errCode).send({ message: data.message });
        }
        res.send(data);
    } catch (err) {
        console.log(err);
    }
});

export default router;
