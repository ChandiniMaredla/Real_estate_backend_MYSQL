const express=require('express');
const router=express.Router();
const {validateToken}=require("../middleware/validatetokenHandler.js");
const {addToWishlistController,getWishlist}=require("../controllers/wishlistController");

router.post('/wishlist/addwish', validateToken, addToWishlistController);
router.get('/wishlist/getwish', validateToken, getWishlist);


module.exports= router;