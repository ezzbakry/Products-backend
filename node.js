// let x=10;
// module.exports=x

// console.log(f)
// let r=f.readFile("txt.txt",{encoding:"utf8"},(err,data)=>{
//     if(err){
//         console.log(err)
//     }
//     console.log(data)
//     console.log("arrived")
// })
// console.log("finished")
// console.log(process.argv)


// @ts-ignore


const fs = module.require('fs');
const express = module.require('express')
const bcrypt = module.require('bcrypt');
const dotenv=module.require('dotenv')
dotenv.config()
const cors=module.require('cors')
const app = express();
let todosRoutes=module.require('./routes/todos')
let usersRoutes=module.require('./routes/users')
app.use(express.json());
app.use("/todos",todosRoutes)
app.use("/users",cors({
    origin:"https://products-dashboard-alpha.vercel.app",
    methods:["GET","POST"]
}),usersRoutes)
app.use("*",(req,res,next)=>{
    res.json({message:`you can not access this route ${req.originalUrl}`})
    next();
})
app.use(cors({
    origin:"https://products-dashboard-alpha.vercel.app",
    methods:["GET","POST"]
}))
// app.use("/todos/count",todosRoutes)


const mongoose = module.require('mongoose');
mongoose.connect(process.env.Mongo).then(()=>{
    console.log("connected")
}).catch((err)=>{
    console.log(err)
    console.log("can not connect")
});


app.listen(process.env.PORT,()=>{
    console.log(`started at ${process.env.PORT}`)
})
// let [,,command]=process.argv;

// if(command=="create"){
//     let title=process.argv[3]
//     let to=JSON.parse(fs.readFileSync("todo.json","utf-8"))
//     to.push({title:title})
//     fs.writeFileSync("todo.json",JSON.stringify(to))
// }else if(command=="list"){
//     let todos=JSON.parse(fs.readFileSync("todo.json","utf-8"))
//     console.log(todos)

// }else if(command=="update"){
//     let oldtitle=process.argv[3];
//     let newtitle=process.argv[4];
//     let to=JSON.parse(fs.readFileSync("todo.json","utf-8"))
//     for (var i=0;i<to.length;i++){
//         if(to[i].title==oldtitle){
//             to[i].title=newtitle
//         }

//     }
//     fs.writeFileSync("todo.json",JSON.stringify(to))
    



// }else if(command=="delete"){

//     let to=JSON.parse(fs.readFileSync("todo.json","utf-8"))
//     while(to.length > 0) {
//         to.pop();
//     }
    
//     fs.writeFileSync("todo.json",JSON.stringify(to))
// }else if(command=="remove"){
//     let title=process.argv[3]
//     let to=JSON.parse(fs.readFileSync("todo.json","utf-8"))
//     for (var i=0;i<to.length;i++){
//         if(to[i].title==title){
//             let index=to.indexOf(to[i])
//             to.splice(index,1)

//         }

//     }
//     fs.writeFileSync("todo.json",JSON.stringify(to))
// }


