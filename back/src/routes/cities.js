import { Router } from 'express';
import { getCities } from '../services/geonames.js';

const router = Router();

const LETTER_REGEX = /^[a-z]$/i;

router.get('/count', async (req, res) => {
  const { letter } = req.query;

  if (typeof letter !== 'string' || !LETTER_REGEX.test(letter)) {
    return res.status(400).json({
      error: 'Invalid parameter. Please provide a single letter (a-z).',
    });
  }

  try {
    const cities = await getCities(); // [{},{},...] 
    const normalizedLetter = letter.toLowerCase();
    const count = cities.filter((city) =>
      city.name?.toLowerCase().startsWith(normalizedLetter)
    ).length;

    res.status(200).json({ letter, count });
  } catch (error) {
    console.error(error.message);
    res.status(502).json({
      error: 'Failed to retrieve cities from external api.',
    });
  }
});

export default router;
