import { Router } from 'express';
import * as iceCreamController from '../controllers/iceCreamController';

const router = Router();

router.get('/', iceCreamController.getAllIceCreams);
router.get('/:id', iceCreamController.getIceCreamById);
router.post('/', iceCreamController.createIceCream);
router.put('/:id', iceCreamController.updateIceCream);
router.delete('/:id', iceCreamController.deleteIceCream);
router.patch('/:id/stock', iceCreamController.updateStock);

export default router; 