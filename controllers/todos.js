const fs = module.require("fs")
const todosmodel = module.require("../models/todos")

const getall = async (req, res) => {
    // let users=JSON.parse(fs.readFileSync("../users.json","utf-8"))
    // res.send(users)

    // res.send({message:"the data of all users",data:allusers})
    try {
        let todos = await todosmodel.find().populate("userId")
        const count = await todosmodel.countDocuments({});

        res.json({ message: "all todos", data: todos, totaldocs:count })
        console.log(`Total documents: ${count}`);
    } catch (e) {
        res.json({ message: e.message })
    }
   
    
}


const getByid = async (req, res) => {
    try {
        let { id } = req.params;

        let todo = await todosmodel.findById(id);
        if (todo) {
            res.json({ data: todo })
        } else {
            res.json({ message: 'can not be fouund' })
        }
    } catch (e) {
        res.json({ message: e.message })
    }

}
const updateOne = async (req, res) => {
    try {
        let { id } = req.params;
        // console.log(req.body);
        // console.log(id);
        let { title } = req.body;
        let updatedtodo = await todosmodel.findByIdAndUpdate(id, { title },{new:true});
        res.json({ message: "updated" ,data:updatedtodo})

    }catch(e){
        res.json({ message: "not updated" ,error:e.message})
    }
    
        // if(todo)
        // {
        //  todo.title = title;
        //  fs.writeFileSync("./todo.json",JSON.stringify(todos));
        //  res.json({message:"Edited ", data :todo})
        // }else{
        //     res.json({message : "SORRY there is no todo Found with this id"})
        // }
    
    
    }

const createOne = (req, res) => {
    let newtodo = req.body
    newtodo.userId=req.id;
    let insertedtodo = todosmodel.create(newtodo).then(() => {
        res.json({ message: "created", data: newtodo })


    }).catch(() => {
        res.json({ message: "can not be created" })
    })

    // let todos= JSON.parse(fs.readFileSync("./todo.json", "utf8"));
    // todos.push({id:id,title:title})
    // fs.writeFileSync("./todo.json",JSON.stringify(todos));
    // res.json({message:"Added"})
}

const deleteOne =async (req, res) => {
    try {
        let { id } = req.params;

        await todosmodel.findByIdAndDelete(id);
        res.json({ message: "deleted" })
    } catch (e) {
        res.json({ message: e.message })
    }

}

// const countAllDocuments = async (req,res) => {
//     try {
//       const count = await todosmodel.countDocuments({});
//       res.json({message:"Total documents", total : count});
//     } catch (err) {
//         res.json({message:err.message});
//     }
//   };
module.exports = {getall, getByid, updateOne,createOne ,deleteOne}