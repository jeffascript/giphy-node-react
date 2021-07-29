import { Request, Response, Application } from 'express';
import GifRouter from './gif.router';

export class Routes {
    public routes(app: Application): void {
        app.use('/api/gifs', GifRouter);

        app.route('/_status').get((_req: Request, res: Response) => {
            res.status(200).send({ msg: 'Working!' });
        });
    }
}
