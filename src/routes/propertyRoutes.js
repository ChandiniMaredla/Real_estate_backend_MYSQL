const express=require('express');
const router=express.Router();
const{addProperty,getPropertiesByLocationCon,
    getPropertiesByTypeCon,getPropertiesBySquareFeetCon,
    getPropertyCon,insertPropertyRatingCon,getPropertiesByFilters1,
    getPropertiesByPrice1,getPropertyById1,getPropertyRatings}=require("../controllers/propertyController");
const {validateToken}=require("../middleware/validatetokenHandler.js");


router.post('/property/addprop', validateToken, addProperty);
router.get('/property/propbyloc',validateToken,getPropertiesByLocationCon);
router.get('/property/propbytype/:type',validateToken,getPropertiesByTypeCon);
router.get('/property/propbysqu/:square_feet',validateToken,getPropertiesBySquareFeetCon);
router.get('/property/propbylocation/:location',validateToken,getPropertyCon);
router.post('/property/proprating',validateToken,insertPropertyRatingCon);
router.get('/property/getproprating/:property_id',validateToken,getPropertyRatings)
router.get('/property/propbyfilter/:type/:price/:location/:squareFeet', validateToken, getPropertiesByFilters1);
router.get('/property/propbyprice/:price', validateToken,getPropertiesByPrice1 );
router.get('/property/propbyid',validateToken,getPropertyById1);



module.exports= router;