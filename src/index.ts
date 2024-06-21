import express from 'express';
import router from './routes/formRouter';

const app = express();
const PORT = 3000;

app.use('/api/v1', router);

app.listen(PORT, () => {
    console.log("listening!");
})
