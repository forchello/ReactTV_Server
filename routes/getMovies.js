import { Router } from 'express';
import { getMovies } from '../controllers/MovieController.js';

const router = Router();

router.route('/getMovies').get(getMovies);

export default router;