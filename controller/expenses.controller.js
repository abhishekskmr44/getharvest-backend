const {Router}= require("express");
const { expensesModel } = require("../models/expenses.model");


const expensesRouter= Router();

expensesRouter.get("/",async(req,res)=>{
    const {userID}= req.body;
    const expensess= await expensesModel.find({userId:userID});
    res.send(expensess)
})
expensesRouter.get("/:expensesid",async(req,res)=>{
    const {userID}= req.body;
    const {expensesid} = req.params;
    const expenses= await expensesModel.find({_id:expensesid, userId:userID});
    res.send(expenses)
})
expensesRouter.get("/dates/:date",async(req,res)=>{
    const {userID}= req.body;
    const date= req.params;
    const expensess= await expensesModel.find({userId:userID , date:date});
    res.send(expensess)
})

expensesRouter.post("/create",async(req,res)=>{
    const {userID}= req.body;
    const { date,expenses,purpose,notes,time}= req.body;
    const newexpenses= new expensesModel({date,expenses,purpose,notes,time, userId:userID})
    await newexpenses.save();
    res.send("expenses created successfully")
}) 

expensesRouter.put("/edit/:expensesid",async(req,res)=>{
    const {userID}= req.body;
    const {expensesid}= req.params;
    const update= await expensesModel.findOneAndUpdate({_id:expensesid, userId:userID},{...req.body});
    if(update){
        res.status(201).send("expenses updated")
    }else{
        res.status(404).send("expenses not found")
    }
})

expensesRouter.delete("/delete/:expensesid",async(req,res)=>{
    const {userID}= req.body;
    const {expensesid}= req.params;
    const deleteexpenses= await expensesModel.findOneAndDelete({_id:expensesid, userId:userID});
    if(deleteexpenses){
        res.status(201).send("deleted successfully")
    }else{
        res.status(404).send("no expenses found")
    }
});

module.exports= {expensesRouter}
