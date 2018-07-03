const toDo = require ("../models/todo")

module.exports={
   
    getAllTask:(req,res,next)=>{
        toDo.find({})
        .then(task=>{
            res.status(200).json(task)
        })
        .catch(err=>{
            res.status(400).json(error)
        })
    },

    getTaskByUserId:(req,res,next)=>{
        toDo.find({"userId":req.params.userid,"date":req.params.date})
        .then(todo=>{
            console.log(todo)
            res.status(200).json(todo)
        })
        .catch(err=>{
            res.status(400).json(err)
        })
    },

    addNewTask:(req,res,next)=>{
        let newTask = new toDo({
            userId:req.body.userid,
            date:req.body.date,
            task:req.body.task
        })

        newTask.save((error,task)=>{
            if(error)res.status(500).send(error)
            else{
                toDo.find({})
                .then(task=>{
                    res.status(200).json(task)
                })
            }
        })
    },

    editTask:(req,res,next)=>{
        let updateTask = {
            title : req.body.title,
            content:req.body.content
        }
        //disini req.params.id nya harus ambil dr user yg logged in

        toDo.findByIdAndUpdate(req.params.id,updateTask,(err,result)=>{
            if(err) res.status(500).json(err)
            else{
                res.status(200).json({message : "Data updated"})
            }
        })
    },

    deleteTask:(req,res,next)=>{
        toDo.findByIdAndRemove(req.params.id,(err,result)=>{
            if(err) res.status(500).json(err)
            else{
                res.status(200).json({message : "task deleted"})
            }
        })
    }
}