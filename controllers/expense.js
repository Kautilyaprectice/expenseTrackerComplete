const Expense = require('../models/expense');

exports.getAllExpenses = async (req, res, next) => {
    try{
        const expenses = await Expense.findAll();
        res.json(expenses);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
};

exports.createExpense = async (req, res, next) => {
    const { amount, description, category } = req.body;
    try{
        const newExpense = await Expense.create({ amount, description, category });
        res.status(201).json(newExpense);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
};

exports.updateExpense = async (req, res, next) => {
    const { id } = req.params;
    const { amount, description, category } = req.body;;
    try{
        const expense = await Expense.findByPk(id);
        if(!expense){
            return res.status(404).json({ message: 'Expense not found!'});
        }
        
        expense.amount = amount;
        expense.description = description;
        expense.category = category;
        await expense.save();
        res.json(expense);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
};

exports.deleteExpense = async (req, res, next) => {
    const { id } = req.params;
    try{
        const expense = await Expense.findByPk(id);
        if(!expense){
            return res.status(404).json({ message: 'Expense not found! '});
        }
        await expense.destroy();
        res.json({ message: 'Expense deletes successfully'});
    }catch(err){
        res.status(500).json({ error: err.message });
    }
};