import { Router } from 'express';
import { SineteController } from '../controllers/SineteController.js';

const router = Router();

router.get('/', SineteController.index);
router.get('/:id', SineteController.show);
router.post('/', SineteController.create);
router.put('/:id', SineteController.update);
router.delete('/:id', SineteController.delete);

export default router;