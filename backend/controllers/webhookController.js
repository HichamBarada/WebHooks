import Expense from "../models/expenseModel.js";
import Income from "../models/incomeModel.js";
import SettledPayrolls from "../models/settledPayrollModel.js";

// create functions for the endpoint

const getIncomeByDate = async (date) => {
  const income = await Income.find({ date: date });
  return income;
};

const getExpenseByDate = async (date) => {
  const expense = await Expense.find({ date: date });
  return expense;
};

const getPayrollsByDate = async (date) => {
  const payroll = await SettledPayrolls.find({ date: date });
  return payroll;
};

const getNetProfitByDate = async (date) => {
  const income = await Income.find({ date: date });
  const expense = await Expense.find({ date: date });
  const payroll = await SettledPayrolls.find({ date: date });
  try {
    const netProfit = income - expense - payroll;
    return netProfit;
  } catch (err) {
    console.log(err);
  }
};

const getTotalIncomesByYear = async (year) => {
  const incomes = await Income.find({
    date: {
      $gte: new Date(`${year}-01-01`),
      $lte: new Date(`${year}-12-31T23:59:59.999Z`),
    },
  });
  const totalIncomes = await incomes.reduce(
    (sum, income) => sum + (income.amount || 0),
    0
  );
  return totalIncomes;
};

const getTotalExpensesByYear = async (year) => {
  const expenses = await Expense.find({
    date: {
      $gte: new Date(`${year}-01-01`),
      $lte: new Date(`${year}-12-31T23:59:59.999Z`),
    },
  });
  const totalExpenses = await expenses.reduce(
    (sum, expense) => sum + (expense.amount || 0),
    0
  );
  return totalExpenses;
};

const getTotalPayrollsByYear = async (year) => {
  const payrolls = await SettledPayrolls.find({
    date: {
      $gte: new Date(`${year}-01-01`),
      $lte: new Date(`${year}-12-31T23:59:59.999Z`),
    },
  });
  const totalPayrolls = await payrolls.reduce(
    (sum, payroll) => sum + (payroll.amount || 0),
    0
  );
  return totalPayrolls;
};

const getTotalNetProfitByYear = async (year) => {
  const incomes = await Income.find({
    date: {
      $gte: new Date(`${year}-01-01`),
      $lte: new Date(`${year}-12-31T23:59:59.999Z`),
    },
  });
  const expenses = await Expense.find({
    date: {
      $gte: new Date(`${year}-01-01`),
      $lte: new Date(`${year}-12-31T23:59:59.999Z`),
    },
  });
  const payrolls = await SettledPayrolls.find({
    date: {
      $gte: new Date(`${year}-01-01`),
      $lte: new Date(`${year}-12-31T23:59:59.999Z`),
    },
  });
  const totalIncomes = await incomes.reduce(
    (sum, income) => sum + (income.amount || 0),
    0
  );
  const totalExpenses = await expenses.reduce(
    (sum, expense) => sum + (expense.amount || 0),
    0
  );
  const totalPayrolls = await payrolls.reduce(
    (sum, payroll) => sum + (payroll.amount || 0),
    0
  );
  const totalNetProfit = totalIncomes - totalExpenses - totalPayrolls;
  return totalNetProfit;
};

const getIncomesByMonth = async (start, end) => {
  try {
    const incomes = await Income.find({
      date: {
        $gte: start,
        $lte: end,
      },
    });
    const totalAmount = incomes.reduce((sum, income) => sum + income.amount, 0);

    return totalAmount;
  } catch (err) {
    console.error(err);
  }
};
const getIncomesByMonthNum = async (year, month) => {

  const incomes = await Income.aggregate([
    {
      $match: {
        $expr: {
          $and: [
            { $eq: [{ $year: "$date" }, parseInt(year)] },
            { $eq: [{ $month: "$date" }, month] },
          ],
        },
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$amount" },
      },
    },
  ]);

  return incomes.length > 0 ? incomes[0].total : 0;
};

const getExpensesByMonth = async (start, end) => {
  try {
    const expenses = await Expense.find({
      date: {
        $gte: start,
        $lte: end,
      },
    });
    const totalAmount = expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );

    return totalAmount;
  } catch (err) {
    console.error(err);
  }
};

const getExpensesByMonthNum = async (year, month) => {
  console.log(year)
  console.log(month)
  const expenses = await Expense.aggregate([
    {
      $match: {
        $expr: {
          $and: [
            { $eq: [{ $year: "$date" }, parseInt(year)] },
            { $eq: [{ $month: "$date" }, month] },
          ],
        },
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$amount" },
      },
    },
  ]);
  console.log(expenses);
  return expenses.length > 0 ? expenses[0].total : 0;
};

const getPayrollsByMonth = async (start, end) => {
  try {
    const payrolls = await SettledPayrolls.find({
      date: {
        $gte: start,
        $lte: end,
      },
    });
    const totalAmount = payrolls.reduce(
      (sum, payroll) => sum + payroll.amount,
      0
    );

    return totalAmount;
  } catch (err) {
    console.error(err);
  }
};

const getPayrollsByMonthNum = async (year, month) => {
  const payrolls = await SettledPayrolls.aggregate([
    {
      $match: {
        $expr: {
          $and: [
            { $eq: [{ $year: "$date" }, parseInt(year)] },
            { $eq: [{ $month: "$date" }, month] },
          ],
        },
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$amount" },
      },
    },
  ]);

  return payrolls.length > 0 ? payrolls[0].total : 0;
};

const getNetProfitByMonth = async (start, end) => {
  try {
    const payrolls = await SettledPayrolls.find({
      date: {
        $gte: start,
        $lte: end,
      },
    });
    const totalPayrollAmount = payrolls.reduce(
      (sum, payroll) => sum + payroll.amount,
      0
    );

    const expenses = await Expense.find({
      date: { $gte: start, $lte: end },
    });
    const totalExpensesAmount = expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
    const incomes = await Income.find({
      date: { $gte: start, $lte: end },
    });
    const totalIncomesAmount = incomes.reduce(
      (sum, income) => sum + income.amount,
      0
    );

    const netProfit =
      totalIncomesAmount - totalExpensesAmount - totalPayrollAmount;
    return netProfit;
  } catch (err) {
    console.error(err);
  }
};

const getNetProfitByMonthNum = async (year, month) => {
  const payrolls = await SettledPayrolls.aggregate([
    {
      $match: {
        $expr: {
          $and: [
            { $eq: [{ $year: "$date" }, parseInt(year)] },
            { $eq: [{ $month: "$date" }, month] },
          ],
        },
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$amount" },
      },
    },
  ]);

  const totalPayrolls = payrolls.length > 0 ? payrolls[0].total : 0;

  const expenses = await Expense.aggregate([
    {
      $match: {
        $expr: {
          $and: [
            { $eq: [{ $year: "$date" }, parseInt(year)] },
            { $eq: [{ $month: "$date" }, month] },
          ],
        },
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$amount" },
      },
    },
  ]);

  const totalExpenses = expenses.length > 0 ? expenses[0].total : 0;

  const incomes = await Income.aggregate([
    {
      $match: {
        $expr: {
          $and: [
            { $eq: [{ $year: "$date" }, parseInt(year)] },
            { $eq: [{ $month: "$date" }, month] },
          ],
        },
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$amount" },
      },
    },
  ]);

  const totalIncomes = incomes.length > 0 ? incomes[0].total : 0;

  const netProfit = totalIncomes - totalExpenses - totalPayrolls;
  return netProfit;
};
const getTotalIncomesByDate = async (date) => {
  const incomes = await Income.find({ date: date });
  try {
    let total = 0;
    if (incomes.length > 0) {
      incomes.forEach((income) => {
        total += income.amount;
      });
    }
    return total;
  } catch (err) {
    console.log(err);
  }
};
const getTotalExpensesByDate = async (date) => {
  const expenses = await Expense.find({ date: date });
  try {
    let total = 0;
    if (expenses.length > 0) {
      expenses.forEach((expense) => {
        total += expense.amount;
      });
    }
    return total;
  } catch (err) {
    console.log(err);
  }
};
const getTotalPayrollsByDate = async (date) => {
  const payrolls = await SettledPayrolls.find({ date: date });
  try {
    let total = 0;
    if (payrolls.length > 0) {
      payrolls.forEach((payroll) => {
        total += payroll.amount;
      });
    }
    return total;
  } catch (err) {
    console.log(err);
  }
};

const getTotalNetProfitByDate = async (date) => {
  const payrolls = await SettledPayrolls.find({ date: date });
  const expenses = await Expense.find({ date: date });

  const incomes = await Income.find({ date: date });

  try {
    let totalPayrolls = 0;
    let totalExpenses = 0;
    let totalIncomes = 0;
    let netProfit = 0;
    if (payrolls.length > 0) {
      payrolls.forEach((payroll) => {
        totalPayrolls += payroll.amount;
      });
    }
    if (expenses.length > 0) {
      expenses.forEach((expense) => {
        totalExpenses += expense.amount;
      });
    }
    if (incomes.length > 0) {
      incomes.forEach((income) => {
        totalIncomes += income.amount;
      });
    }

    netProfit = totalIncomes - totalExpenses - totalPayrolls;
    return netProfit;
  } catch (err) {
    console.log(err);
  }
};

export {
  getIncomeByDate,
  getExpenseByDate,
  getPayrollsByDate,
  getNetProfitByDate,
  getTotalIncomesByYear,
  getTotalExpensesByYear,
  getTotalPayrollsByYear,
  getTotalNetProfitByYear,
  getIncomesByMonth,
  getIncomesByMonthNum,
  getExpensesByMonth,
  getExpensesByMonthNum,
  getPayrollsByMonth,
  getPayrollsByMonthNum,
  getNetProfitByMonth,
  getNetProfitByMonthNum,
  getTotalIncomesByDate,
  getTotalExpensesByDate,
  getTotalPayrollsByDate,
  getTotalNetProfitByDate,
};
