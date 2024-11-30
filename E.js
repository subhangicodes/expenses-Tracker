document.addEventListener("DOMContentLoaded", function () {
    const balance = document.getElementById("balance");
    const money_plus = document.getElementById("money_plus");
    const money_minus = document.getElementById("money_minus");
    const list = document.getElementById("list");
    const form = document.getElementById("transaction");
    const text = document.getElementById("text");
    const amount = document.getElementById("amount");
    const incomeRadio = document.getElementById("flexradiodefault1");
    const expenseRadio = document.getElementById("flexradiodefault2");
  
    let transactions = [];
  
    function correct() {
      if (text.value.trim() === "" || amount.value.trim() === "") {
        alert("Please enter valid text and amount");
        return false; // Return false to indicate invalid input
      }
      return true; // Return true to indicate valid input
    }
  
    function addTransaction(e) {
      e.preventDefault();
  
      if (!correct()) {
        return;
      }
  
      const amountValue = parseFloat(amount.value);
      const transactionType = incomeRadio.checked
        ? "income"
        : expenseRadio.checked
        ? "expense"
        : null;
  
      if (transactionType === null) {
        alert("Please select either Income or Expense");
        return;
      }
  
      const transaction = {
        id: generateId(),
        text: text.value,
        amount: transactionType === "income" ? amountValue : -amountValue,
      };
  
      transactions.push(transaction);
      addTransactionDOM(transaction);
      updateValues();
      text.value = "";
      amount.value = "";
      incomeRadio.checked = false;
      expenseRadio.checked = false;
    }
  
    function generateId() {
      return Math.floor(Math.random() * 100000000);
    }
  
    function addTransactionDOM(transaction) {
      const sign = transaction.amount < 0 ? "-" : "+";
      const item = document.createElement("li");
  
      item.classList.add(transaction.amount < 0 ? "minus" : "plus");
  
      item.innerHTML = `
        ${transaction.text}
        <span>${sign}${Math.abs(transaction.amount)}</span>
        <button class="del-btn" data-id="${transaction.id}">X</button>`;
  
      list.appendChild(item);
    }
  
    function removeTransaction(id) {
      transactions = transactions.filter((transaction) => transaction.id !== id);
      Init();
    }
  
    function updateValues() {
      const amounts = transactions.map((transaction) => transaction.amount);
      const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
      const income = amounts
        .filter((item) => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);
      const expenses = (
        amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) * -1
      ).toFixed(2);
  
      balance.innerText = `$${total}`;
      money_plus.innerText = `$${income}`;
      money_minus.innerText = `$${expenses}`;
    }
  
    function Init() {
      list.innerHTML = "";
      transactions.forEach(addTransactionDOM);
      updateValues();
    }
  
    form.addEventListener("submit", addTransaction);
  
    list.addEventListener("click", function (e) {
      if (e.target.classList.contains("del-btn")) {
        const id = parseInt(e.target.getAttribute("data-id"));
        removeTransaction(id);
      }
    });
  
    Init();
  });
  