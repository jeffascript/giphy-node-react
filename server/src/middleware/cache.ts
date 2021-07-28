/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response, NextFunction } from 'express';
import { getRedisCacheAsync } from '../utils/redis';

export const redisCacheHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { searchString } = req.body;
    const cacheKey = JSON.stringify(searchString);

    const cacheValue = await getRedisCacheAsync(cacheKey);

    if (cacheValue && cacheValue !== null) {
        console.log('Getting data from Cache ... ');
        const response = JSON.parse(cacheValue);
        return res.send(response);
    }
    console.log('Not from from Cache :( ');
    next();
};

export const middleware = {
    redisCacheHandler,
};
