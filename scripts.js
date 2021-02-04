const Modal = {
    open() {
        document.querySelector('.modal-overlay').classList.add('active');
    },
    close() {
        document.querySelector('.modal-overlay').classList.remove('active');
    }
}

const Transaction = {
    all: [
        {
            id: 1,
            description: 'Energia',
            amount: -10000,
            date: '03/02/2021'
        },
        {
            id: 2,
            description: 'Website',
            amount: 300000,
            date: '03/02/2021'
        },
        {
            id: 3,
            description: 'Agua',
            amount: -4050,
            date: '03/02/2021'
        },
    ],
    add(transaction){
        Transaction.all.push(transaction);
        App.reload();
    },
    remove(index) {
        Transaction.all.splice(index, 1);
        App.reload();
    },
    incomes() {
        let income = 0;
        Transaction.all.forEach(({amount}=transaction) => {
            if (amount > 0) {
                income += amount;
            }
        })
        return income; 
    },
    expense() {
        let expense = 0;
        Transaction.all.forEach(({amount} = transaction) => {
            if(amount < 0) {
                expense += amount;
            }
        })
        return expense;
    },
    balance() {
        let balance = 0;
        balance = Transaction.incomes() + Transaction.expense()
        return balance;
    }

}

const DOM = {
    transactionContainer: document.querySelector('#data-table tbody'),
    

    addTransaction (transaction, index) {
        const tr = document.createElement('tr');
        tr.innerHTML = DOM.innerHTMLTransaction(transaction);
        DOM.transactionContainer.appendChild(tr);
    },

    innerHTMLTransaction({id, description, amount, date} = transaction) {
        const CSSclass = amount > 0 ? "income" : "expense";
       
        amount = Utils.formatCurrency(amount);
        const html = `
        
        <td class="description">${description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${date}</td>
        <td>
            <img src="./assets/minus.svg" alt="remover transação">
        </td>
    `;

    return html;
    },

    updateBalance() {
        document.querySelector('#incomeDisplay').innerHTML = Utils.formatCurrency(Transaction.incomes());
        document.querySelector('#expenseDisplay').innerHTML = Utils.formatCurrency(Transaction.expense());
        document.querySelector('#balanceDisplay').innerHTML = Utils.formatCurrency(Transaction.balance());
    },

    clearTransactions() {
        DOM.transactionContainer.innerHTML = "";
    }
}

const Utils = {
        formatCurrency(value) {
            const signal = Number(value) < 0 ? "-" : "";

            value = String(value).replace(/\D/g, "");
            value = Number(value) / 100;
            value = value.toLocaleString("pt-br", { 
                style: "currency",
                currency: "BRL",
            })
            return signal + value;
        }
}

const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value,
        }
    },
    validateFields() {
        const {description, amount, date} = Form.getValues();
        if (description.trim() == "" || amount.trim() == "" || date.trim() == "") {
            throw new Error("Por favor, preencha todos os campos")
        }
    },
    formatData() {},
    submit(event){
        try {
            event.preventDefault();
        Form.validateFields();
        // Form.fomatData();
        } catch (error) {
            alert(error.message);
        }
        
    }
}

const App = {
    init() {
        Transaction.all.forEach( transaction => {
            DOM.addTransaction(transaction);
        })
        
        DOM.updateBalance();
    },

    reload() {
        DOM.clearTransactions();
        App.init();
    }
}

App.init();

Transaction.add({
    id: 3,
    description: 'Teste',
    amount: 200,
    date: '03/02/2021'
},)

Transaction.remove(1)


