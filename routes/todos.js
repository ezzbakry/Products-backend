const { getall, getByid, updateOne,createOne,deleteOne } = module.require("../controllers/todos");

const fs=module.require("fs")
const express = module.require('express')
const{auth,restrict}=module.require('../middlewares/auth')

const router=express.Router();
router.get('/',auth,restrict("admin"),getall)



router.get('/:id',auth,getByid)

router.patch('/:id',auth,updateOne)
router.post("/",auth,createOne)    

router.delete('/:id',auth,deleteOne)
// router.get('/count',countAllDocuments);
module.exports=router;


