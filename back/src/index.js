
import express from 'express';
import citiesRouter from './routes/cities.js';

const app = express();

const PORT = process.env.PORT || 3000;

app.use('/api/cities', citiesRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
