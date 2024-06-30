import express from "express";
const router = express.Router();
import {getProducts,getProductById,createProduct,updateProduct,deleteProduct, createProductReview, getTopProducts} from '../controllers/productController.js';
import { admin,protect } from "../middleware/authMiddleware.js";

router.route('/').get(getProducts).post(protect,admin,createProduct);
router.route("/top").get(getTopProducts);
router.route('/:id').get(getProductById).put(protect,admin,updateProduct).delete(protect,admin,deleteProduct);
router.route('/:id/reviews').post(protect,createProductReview);
export default router;