const expenseForm = document.getElementById('expenseForm');
const expenseList = document.getElementById('expenseList');

function fetchExpenses() {
    axios.get('http://localhost:3000/expense')
        .then((res) => {
            const expenses = res.data;
            expenseList.innerHTML = '';

            expenses.forEach((expense) => {
                const listItem = document.createElement('li');
                listItem.textContent = `${expense.amount} - ${expense.description} - ${(expense.category)}`;//.toLocalString()}`;

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete' ;
                deleteButton.onclick = () => {
                    deleteExpense(expense.id);
                };

                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.onclick = () => {
                    editExpense(expense);
                };

                listItem.appendChild(deleteButton);
                listItem.appendChild(editButton);
                expenseList.appendChild(listItem);
            });
        })
        .catch(err => console.error(err));
};

expenseForm.addEventListener('submit', function(event){
    event.preventDefault();

    const formData = new FormData(expenseForm);
    const amount = formData.get('expenseAmount');
    const description = formData.get('description');
    const category = formData.get('category');

    axios.post('http://localhost:3000/expense', { amount, description, category})
        .then((res) => {
            fetchExpenses();
            expenseForm.reset();
        })
        .catch(err => console.error(err));
});

function deleteExpense(expenseId) {
    axios.delete(`http://localhost:3000/expense/${expenseId}`)
        .then(() => {
            fetchExpenses();
        })
        .catch(err => console.error(err));
}

function editExpense(expense){

    const amount = prompt("Enter new amount:", expense.amount);
    const description = prompt("Enter new description:", expense.description);
    const category = prompt("Enter new category:", expense.category);

    const updatedExpense = {
        amount: amount,
        description: description,
        category: category
    };

    axios.put(`http://localhost:3000/expense/${expense.id}`, updatedExpense)
        .then(() => {
            fetchExpenses();
        })
        .catch(err => console.error(err));

}

window.onload = fetchExpenses;