import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    // TODO
    return this.transactions;
  }

  public getBalance(): Balance {
    // TODO

    return this.transactions.reduce(
      (acc: Balance, curr: Transaction) => {
        if (curr.type === 'outcome') {
          acc.outcome += curr.value;
        } else if (curr.type === 'income') {
          acc.income += curr.value;
        }
        acc.total = acc.income - acc.outcome;

        return acc;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      } as Balance,
    );
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    // TODO

    const balance = this.getBalance();

    if (type === 'outcome' && value > balance.total) {
      throw Error('Voce esta gastando mais do que deveria....');
    }

    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
