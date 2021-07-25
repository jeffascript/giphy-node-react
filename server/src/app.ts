import express, { Application, Request, Response, NextFunction } from 'express';

import cors from 'cors';
import { Routes } from './route';

class App {
    public app: Application;

    public routePrv: Routes = new Routes();

    constructor() {
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
    }

    private config(): void {
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
            res.header('Access-Control-Allow-Headers', '*');
            next();
        });
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }
}

export default new App().app;
