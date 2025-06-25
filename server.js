import express from 'express';
import routes from './routes/index';
import dotenv from 'dotenv';

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use('/', routes);

const port = process.env.PORT || '5000';

app.listen(Number(port), () => console.log(`Server running on port ${port}`));