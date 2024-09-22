const fs = module.require("fs")
var jwt = module.require('jsonwebtoken');
const bcrypt = module.require('bcrypt');


const usermodel = module.require("../models/users.js")
const getall = async (req, res) => {
    // let users=JSON.parse(fs.readFileSync("../users.json","utf-8"))
    // res.send(users)

    // res.send({message:"the data of all users",data:allusers})
    try {
        let users = await usermodel.find()
        const count = await usermodel.countDocuments({});
        res.json({ message: "all users", data: users, totaldocs: count })
    } catch (e) {
        res.json({ message: e.message })

    }

}
const getByid = async (req, res) => {
    try {
        let { id } = req.params;
        let user = await usermodel.findById(id);
        if (user) {
            res.status(200).json({ data: user })

        } else {
            res.status(400).json({ message: 'can not be fouund' })
        }

    } catch (e) {
        res.status(500).json({ message: e.message })
    }

}
const updateOne = async (req, res) => {
    try {
        let { id } = req.params;
        // console.log(req.body);
        // console.log(id);
        let name = req.body;
        let updatedtuser = await usermodel.findByIdAndUpdate(id, name, { new: true });
        res.json({ message: "updated", data: updatedtuser })

    } catch (e) {
        res.json({ message: "not updated", error: e.message })
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
const createone = (req, res) => {
    let newuser = req.body
    let inserteduser = usermodel.create(newuser).then(() => {
        res.json({ message: "created successfully", data: newuser })
    }).catch((err) => {
        res.json({ message: "can not be created", error: err.message })
    })

}
const deleteOne = async (req, res) => {
    try {
        let { id } = req.params;

        let user = usermodel.findById(id);
        await user.deleteOne();

        res.json({ message: "deleted" })
    } catch (e) {
        res.json({ message: e.message })
    }

}
const deleteall = async (req, res) => {
    try {
        await usermodel.deleteMany({});
        res.json({ message: "all users are deleted" })
    } catch (e) {
        res.json({ message: e.message })
    }

}
const login = async (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) {
        return res.json({ message: "required" })
    }
    let user = await usermodel.findOne({ email: email })
    if (!user) {
        return res.json({ message: "invalid email or password" })
    }
    let isvalid = await bcrypt.compare(password, user.password)
    if (!isvalid) {
        return res.json({ message: "invalid email or password " })

    }
    let token = jwt.sign({ data: { email: user.email, id: user._id, role: user.role } }, process.env.secret, { expiresIn: "2h" })
    return res.json({ message: "success", token: token })
}

module.exports = { getall, getByid, createone, updateOne, deleteOne, deleteall,login }