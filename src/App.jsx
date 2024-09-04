import React, { useState, useRef, useMemo } from 'react';
import './App.css';

function App() {
    const [balance, setBalance] = useState(135);
    const [profits, setProfits] = useState([
        { id: 1, description: 'Salary', amount: 2000, date: '10.07.2023' },
        { id: 2, description: 'Website profit', amount: 500, date: '10.07.2023' }
    ]);
    const [expenses, setExpenses] = useState([
        { id: 1, description: 'Food products', amount: 1900, category: 'Food', date: '10.07.2023' },
        { id: 2, description: 'Shopping', amount: 400, category: 'Shopping', date: '10.07.2023' },
        { id: 3, description: 'Medicines', amount: 65, category: 'Medical', date: '10.07.2023' }
    ]);

    const profitRef = useRef();
    const expenseRef = useRef();

    const totalProfit = useMemo(() => {
        return profits.reduce((acc, profit) => acc + profit.amount, 0);
    }, [profits]);

    const totalExpense = useMemo(() => {
        return expenses.reduce((acc, expense) => acc + expense.amount, 0);
    }, [expenses]);

    const addProfit = () => {
        const newProfit = {
            id: profits.length + 1,
            description: profitRef.current.value,
            amount: parseInt(document.getElementById('profitAmount').value),
            date: new Date().toLocaleDateString()
        };
        setProfits([...profits, newProfit]);
        setBalance(balance + newProfit.amount);
    };

    const addExpense = () => {
        const newExpense = {
            id: expenses.length + 1,
            description: expenseRef.current.value,
            amount: parseInt(document.getElementById('expenseAmount').value),
            category: document.getElementById('expenseCategory').value,
            date: new Date().toLocaleDateString()
        };
        setExpenses([...expenses, newExpense]);
        setBalance(balance - newExpense.amount);
    };

    const deleteProfit = (id) => {
        const newProfits = profits.filter(profit => profit.id !== id);
        setBalance(balance - profits.find(profit => profit.id === id).amount);
        setProfits(newProfits);
    };

    const deleteExpense = (id) => {
        const newExpenses = expenses.filter(expense => expense.id !== id);
        setBalance(balance + expenses.find(expense => expense.id === id).amount);
        setExpenses(newExpenses);
    };

    return (
        <div className="app-container">
            <div className="balance-section">
                <h2>My Balance</h2>
                <p>{balance}$</p>
                <div className="categories">
                    <p>Max Profit: 2000$</p>
                    <p>Max Expense: 1900$</p>
                    <p>Max Category: 1900$</p>
                </div>
            </div>

            <div className="inputs-section">
                <div className="profit-input">
                    <h3>Add New Profit</h3>
                    <input type="text" ref={profitRef} placeholder="Profit Description" />
                    <input id="profitAmount" type="number" placeholder="0" />
                    <button onClick={addProfit}>Add New Profit</button>
                </div>
                <div className="expense-input">
                    <h3>Add New Expense</h3>
                    <input type="text" ref={expenseRef} placeholder="Expense Description" />
                    <input id="expenseAmount" type="number" placeholder="0" />
                    <select id="expenseCategory">
                        <option value="Food">Food</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Medical">Medical</option>
                    </select>
                    <button onClick={addExpense}>Add New Expense</button>
                </div>
            </div>

            <div className="articles-section">
                <div className="profits-articles">
                    <h3>Profits Articles</h3>
                    {profits.map(profit => (
                        <div key={profit.id} className="article">
                            <p>{profit.description} = {profit.amount}$</p>
                            <p>{profit.date}</p>
                            <button onClick={() => deleteProfit(profit.id)}>Delete</button>
                        </div>
                    ))}
                    <div className="total-section">
                        <p>Total Profit Amount = {totalProfit}$</p>
                    </div>
                </div>

                <div className="expenses-articles">
                    <h3>Expenses Articles</h3>
                    {expenses.map(expense => (
                        <div key={expense.id} className="article">
                            <p>{expense.description} = {expense.amount}$</p>
                            <p>{expense.category}</p>
                            <p>{expense.date}</p>
                            <button onClick={() => deleteExpense(expense.id)}>Delete</button>
                        </div>
                    ))}
                    <div className="total-section">
                        <p>Total Expenses Amount = {totalExpense}$</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
