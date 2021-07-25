import * as dotenv from 'dotenv';

import app from './app';

dotenv.config();

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`App Started on ${port}`);
});
