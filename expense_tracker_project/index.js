const expenses = [];

// Add an expense to the list
function addExpense(event) {
  event.preventDefault();

  const description = document.getElementById("description").value;
  const amount = document.getElementById("amount").value;
  const category = document.getElementById("category").value;

  const expense = {
    description,
    amount,
    category,
  };

  expenses.push(expense);

  // Update the list of expenses
  document.getElementById("expenses").innerHTML = expenses
    .map(
      (expense) => `
    <li>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
      ${expense.description}
      ${expense.amount}
      ${expense.category}
    </li>
  `
    )
    .join("");
}

// Initialize the expense list
document.getElementById("expForm").addEventListener("submit", addExpense);

// Handle editing an expense
const editExpense = (event) => {
  event.preventDefault();

  const li = event.target.parentElement;
  const expense = expenses.find(
    (expense) => expense.description === li.textContent
  );

  // Open the edit form
  document.getElementById("editForm").style.display = "block";

  // Set the form values
  document.getElementById("editDescription").value = expense.description;
  document.getElementById("editAmount").value = expense.amount;
  document.getElementById("editCategory").value = expense.category;

  // Set the hidden input value to the expense id
  document.getElementById("editExpenseId").value = expense.id;
};

// Handle deleting an expense
const deleteExpense = (event) => {
  event.preventDefault();

  const li = event.target.parentElement;
  const expense = expenses.find(
    (expense) => expense.description === li.textContent
  );

  // Remove the expense from the list
  expenses.splice(expenses.indexOf(expense), 1);

  // Remove the li element from the DOM
  li.remove();
};

// Initialize the event listeners
document
  .querySelectorAll(".edit-btn")
  .forEach((btn) => btn.addEventListener("click", editExpense));
document
  .querySelectorAll(".delete-btn")
  .forEach((btn) => btn.addEventListener("click", deleteExpense));

// Handle submitting the edit form
document.getElementById("editForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const description = document.getElementById("editDescription").value;
  const amount = document.getElementById("editAmount").value;
  const category = document.getElementById("editCategory").value;
  const expenseId = document.getElementById("editExpenseId").value;

  // Update the expense
  const expense = expenses.find((expense) => expense.id === expenseId);
  expense.description = description;
  expense.amount = amount;
  expense.category = category;

  // Update the list of expenses
  document.getElementById("expenses").innerHTML = expenses
    .map(
      (expense) => `
    <li>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
      ${expense.description}
      ${expense.amount}
      ${expense.category}
    </li>
  `
    )
    .join("");

  // Close the edit form
  document.getElementById("editForm").style.display = "none";
});
