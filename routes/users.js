const {getall,createone,getByid,updateOne,deleteOne,deleteall,login} = module.require("../controllers/users");


const fs = module.require('fs');
const express = module.require('express')
const router=express.Router();
const cors=module.require('cors')

const{auth,restrict}=module.require('../middlewares/auth')
const app = express();
app.use(express.json())
router.get('/',auth,restrict("admin"),getall)
router.post('/',cors({
    origin:"https://products-dashboard-alpha.vercel.app",
    methods:["GET","POST"]
}),createone)
router.get('/:id',getByid)
router.patch('/:id',updateOne)
router.delete('/:id',deleteOne)
router.delete('/',deleteall)

router.post('/login',login)

module.exports=router;
