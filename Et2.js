document.addEventListener('DOMContentLoaded', function () {
    const balance = document.getElementById('balance');
    const money_plus = document.getElementById('money-plus');
    const money_minus = document.getElementById('money-minus');
    const list = document.getElementById('list');
    const form = document.getElementById('transaction');
    const text = document.getElementById('flexradiodefault1');
    const amount = document.getElementById('flexradiodefault2');

    let transactions = [];

    function addTransaction(e) {
        e.preventDefault();

        if (text.value.trim() === "") {
            alert("Please enter text");
        } else {
            const amountValue = amount.value.trim();

            const transaction = {
                id: generateId(),
                text: text.value,
                amount: amountValue,
            };

            transactions.push(transaction);
            addTransactionDOM(transaction);
            updateValues();
            text.value = "";
            amount.value = "";
        }
    }

    function generateId() {
        return Math.floor(Math.random() * 100000000);
    }

    function addTransactionDOM(transaction) {
        const sign = transaction.amount < 0 ? "-" : "+";
        const item = document.createElement('li');

        item.classList.add(transaction.amount < 0 ? "minus" : "plus");

        item.innerHTML = `
        ${transaction.text}
        <span>${sign}${Math.abs(transaction.amount)}</span>
        <button class="del-btn" onclick="removeTransaction(${transaction.id})">X</button>`;

        list.appendChild(item);
    }

    function removeTransaction(id) {
        transactions = transactions.filter(transaction => transaction.id !== id);
        Init();
    }

    function updateValues() {
        const amounts = transactions.map(transaction => parseFloat(transaction.amount) || 0);
        const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
        const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
        const expenses = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

        balance.innerText = `$${total}`;
        money_plus.innerText = `$${income}`;
        money_minus.innerText = `$${expenses}`;
    }

    function Init() {
        list.innerHTML = "";
        transactions.forEach(addTransactionDOM);
        updateValues();
    }

    form.addEventListener('submit', addTransaction);
    Init();
});


