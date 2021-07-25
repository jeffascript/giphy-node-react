import { Request, Response, Application } from 'express';
import GifRouter from './gif.router';

export class Routes {
    public routes(app: Application): void {
        app.use('/gifs/search', GifRouter);

        app.route('/_status').get((_req: Request, res: Response) => {
            res.status(200).send({ msg: 'Working!' });
        });
    }
}
