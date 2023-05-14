import express from "express";
import {
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
} from "../controllers/webhookController.js";
const router = express.Router();
const getOrdinal = (n) => {
  const suffixes = {
    1: "st",
    2: "nd",
    3: "rd",
  };
  if (n >= 11 && n <= 13) {
    return n + "th";
  }
  const suffix = suffixes[n % 10] || "th";
  return n + suffix;
};
router.post("/webhook", async (req, res) => {
  const intentName = req.body.queryResult.intent.displayName;
  console.log(req.body.queryResult.parameters);
  if (intentName === "GetTotalIncomesByYear") {
    let year = req.body.queryResult.parameters.year;
    if (year.toLowerCase().includes("last")) {
      let date = new Date().getUTCFullYear() - 1;
      year = date;
    } else if (year.toLowerCase().includes("next")) {
      let date = new Date().getUTCFullYear() + 1;
      year = date;
    }
    const totalIncomes = await getTotalIncomesByYear(year);

    const response = {
      fulfillmentText: `The total incomes for year ${year} is ${totalIncomes}$.`,
    };

    res.json(response);
  } else if (intentName === "GetTotalExpensesByYear") {
    let year = req.body.queryResult.parameters.year;
    if (year.toLowerCase().includes("last")) {
      let date = new Date().getUTCFullYear() - 1;
      year = date;
    } else if (year.toLowerCase().includes("next")) {
      let date = new Date().getUTCFullYear() + 1;
      year = date;
    }
    const totalExpenses = await getTotalExpensesByYear(year);

    const response = {
      fulfillmentText: `The total expenses for year ${year} is ${totalExpenses}$.`,
    };

    res.json(response);
  } else if (intentName === "GetTotalPayrollsByYear") {
    let year = req.body.queryResult.parameters.year;
    if (year.toLowerCase().includes("last")) {
      let date = new Date().getUTCFullYear() - 1;
      year = date;
    } else if (year.toLowerCase().includes("next")) {
      let date = new Date().getUTCFullYear() + 1;
      year = date;
    }
    const totalPayrolls = await getTotalPayrollsByYear(year);
    const response = {
      fulfillmentText: `The total payrolls for year ${year} is ${totalPayrolls}$.`,
    };
    res.json(response);
  } else if (intentName === "GetTotalNetProfitByYear") {
    let year = req.body.queryResult.parameters.year;
    if (year.toLowerCase().includes("last")) {
      let date = new Date().getUTCFullYear() - 1;
      year = date;
    } else if (year.toLowerCase().includes("next")) {
      let date = new Date().getUTCFullYear() + 1;
      year = date;
    }
    const totalNetProfit = await getTotalNetProfitByYear(year);
    const response = {
      fulfillmentText: `The total net profit for year ${year} is ${totalNetProfit}$.`,
    };

    res.json(response);
  } else if (intentName === "GetTotalIncomesByMonth") {
    if (req.body.queryResult.parameters["date-period"]) {
      const start = req.body.queryResult.parameters[
        "date-period"
      ].startDate.substring(0, 10);
      const end = req.body.queryResult.parameters[
        "date-period"
      ].endDate.substring(0, 10);
      const totalIncomes = await getIncomesByMonth(start, end);
      const date = new Date(start);
      const monthName = date.toLocaleString("default", { month: "long" });
      const response = {
        fulfillmentText: `The total incomes for  ${monthName} is ${totalIncomes}$.`,
      };
      res.json(response);
    } else if (req.body.queryResult.parameters.month) {
      if (req.body.queryResult.parameters.year) {
        var year = req.body.queryResult.parameters.year;
      } else {
        var year = new Date().getUTCFullYear();
      }
      const monthName = req.body.queryResult.parameters.month;
      const monthNumber =
        new Date(Date.parse(monthName + " 1, " + year)).getMonth() + 1;
      const month = monthNumber < 10 ? "0" + monthNumber : monthNumber;

      const totalIncomes = await getIncomesByMonthNum(year, month);
      const response = {
        fulfillmentText: `The total incomes for  ${monthName}  ${year}  is ${totalIncomes}$.`,
      };
      res.json(response);
    } else {
      const response = {
        fulfillmentText:
          "Sorry, I don't understand.Please add date,month or year",
      };

      res.json(response);
    }
  } else if (intentName === "GetTotalExpensesByMonth") {
    if (req.body.queryResult.parameters["date-period"]) {
      const start = req.body.queryResult.parameters[
        "date-period"
      ].startDate.substring(0, 10);
      const end = req.body.queryResult.parameters[
        "date-period"
      ].endDate.substring(0, 10);
      const totalExpenses = await getExpensesByMonth(start, end);
      const date = new Date(start);
      const monthName = date.toLocaleString("default", { month: "long" });
      const response = {
        fulfillmentText: `The total expenses for  ${monthName} is ${totalExpenses}$.`,
      };
      res.json(response);
    } else if (req.body.queryResult.parameters.month) {
      if (req.body.queryResult.parameters.year) {
        var year = req.body.queryResult.parameters.year;
      } else {
        var year = new Date().getUTCFullYear();
      }
      const monthName = req.body.queryResult.parameters.month;
      const monthNumber =
        new Date(Date.parse(monthName + " 1, " + year)).getMonth() + 1;
      const month = monthNumber < 10 ? "0" + monthNumber : monthNumber;
      const startStr = `${year}-${month}-01`;
      const endStr = `${year}-${month}-31`;
      const startDate = new Date(startStr);
      const endDate = new Date(endStr);
      const start = startDate.substring(0,10);
      const end = endDate.substring(0,10)
      console.log("start",start);
      console.log("end",end);
      const totalExpenses = await getExpensesByMonth(start, end);
      const response = {
        fulfillmentText: `The total expenses for  ${monthName}  ${year}  is ${totalExpenses}$.`,
      };
      res.json(response);
    } else {
      const response = {
        fulfillmentText:
          "Sorry, I don't understand.Please add date,month or year",
      };

      res.json(response);
    }
  } else if (intentName === "GetTotalPayrollsByMonth") {
    if (req.body.queryResult.parameters["date-period"]) {
      const start = req.body.queryResult.parameters[
        "date-period"
      ].startDate.substring(0, 10);
      const end = req.body.queryResult.parameters[
        "date-period"
      ].endDate.substring(0, 10);
      const totalPayrolls = await getPayrollsByMonth(start, end);
      const date = new Date(start);
      const monthName = date.toLocaleString("default", { month: "long" });
      const response = {
        fulfillmentText: `The total payrolls for  ${monthName} is ${totalPayrolls}$.`,
      };
      res.json(response);
    } else if (req.body.queryResult.parameters.month) {
      if (req.body.queryResult.parameters.year) {
        var year = req.body.queryResult.parameters.year;
      } else {
        var year = new Date().getUTCFullYear();
      }
      const monthName = req.body.queryResult.parameters.month;
      const monthNumber =
        new Date(Date.parse(monthName + " 1, " + year)).getMonth() + 1;
      const month = monthNumber < 10 ? "0" + monthNumber : monthNumber;

      const totalPayrolls = await getPayrollsByMonthNum(year, month);
      const response = {
        fulfillmentText: `The total payrolls for  ${monthName}  ${year}  is ${totalPayrolls}$.`,
      };
      res.json(response);
    } else {
      const response = {
        fulfillmentText:
          "Sorry, I don't understand.Please add date,month or year",
      };

      res.json(response);
    }
  } else if (intentName === "GetTotalNetProfitByMonth") {
    if (req.body.queryResult.parameters["date-period"]) {
      const start = req.body.queryResult.parameters[
        "date-period"
      ].startDate.substring(0, 10);
      const end = req.body.queryResult.parameters[
        "date-period"
      ].endDate.substring(0, 10);
      const netProfit = await getNetProfitByMonth(start, end);
      const date = new Date(start);
      const monthName = date.toLocaleString("default", { month: "long" });
      const response = {
        fulfillmentText: `The Net Profit for  ${monthName} is ${netProfit}$.`,
      };
      res.json(response);
    } else if (req.body.queryResult.parameters.month) {
      if (req.body.queryResult.parameters.year) {
        var year = req.body.queryResult.parameters.year;
      } else {
        var year = new Date().getUTCFullYear();
      }
      const monthName = req.body.queryResult.parameters.month;
      const monthNumber =
        new Date(Date.parse(monthName + " 1, " + year)).getMonth() + 1;
      const month = monthNumber < 10 ? "0" + monthNumber : monthNumber;

      const netProfit = await getNetProfitByMonthNum(year, month);
      const response = {
        fulfillmentText: `The Net Profit for  ${monthName}  ${year}  is ${netProfit}$.`,
      };
      res.json(response);
    } else {
      const response = {
        fulfillmentText:
          "Sorry, I don't understand.Please add date,month or year",
      };

      res.json(response);
    }
  } else if (intentName === "GetTotalIncomesByDate") {
    if (req.body.queryResult.parameters.date) {
      const dateStr = req.body.queryResult.parameters.date;
      // .substring(0, 10);
      const originalDate = new Date(dateStr);
      const year = originalDate.getFullYear();
      const month = originalDate.getMonth() + 1;
      const day = originalDate.getDate();
      const monthStr = month.toString().padStart(2, "0");
      const dayStr = day.toString().padStart(2, "0");
      const dateStr2 = `${year}-${monthStr}-${dayStr}`;
      const date = new Date(dateStr2);
      const incomes = await getTotalIncomesByDate(date);
      const response = {
        fulfillmentText: `The incomes for ${dateStr2} is ${incomes}${
          incomes > 0 || incomes < 0 ? "$" : ""
        }.`,
      };
      res.json(response);
    } else if (
      req.body.queryResult.parameters.month &&
      req.body.queryResult.parameters.ordinal
    ) {
      var year =
        req.body.queryResult.parameters.year || new Date().getUTCFullYear();

      const monthName = req.body.queryResult.parameters.month;
      const monthNumber =
        new Date(Date.parse(monthName + " 1, " + year)).getMonth() + 1;
      const month = monthNumber < 10 ? "0" + monthNumber : monthNumber;
      const ordinal =
        req.body.queryResult.parameters.ordinal < 10
          ? "0" + req.body.queryResult.parameters.ordinal
          : req.body.queryResult.parameters.ordinal;
      const dateStr = `${year}-${month}-${ordinal}`;
      const date = new Date(dateStr);
      const incomes = await getTotalIncomesByDate(date);
      const response = {
        fulfillmentText: `The incomes for  ${monthName}  ${getOrdinal(
          parseInt(ordinal)
        )} , ${year}  is ${incomes}${incomes > 0 || incomes < 0 ? "$" : ""}.`,
      };
      res.json(response);
    } else {
      const response = {
        fulfillmentText:
          "Sorry, I don't understand.Please add date,month or year",
      };

      res.json(response);
    }
  } else if (intentName === "GetTotalExpensesByDate") {
    if (req.body.queryResult.parameters.date) {
      const dateStr = req.body.queryResult.parameters.date;
      // .substring(0, 10);
      const originalDate = new Date(dateStr);
      const year = originalDate.getFullYear();
      const month = originalDate.getMonth() + 1;
      const day = originalDate.getDate();
      const monthStr = month.toString().padStart(2, "0");
      const dayStr = day.toString().padStart(2, "0");
      const dateStr2 = `${year}-${monthStr}-${dayStr}`;
      const date = new Date(dateStr2);
      const expenses = await getTotalExpensesByDate(date);
      const response = {
        fulfillmentText: `The expenses for ${dateStr2} is ${expenses}${
          expenses > 0 || expenses < 0 ? "$" : ""
        }.`,
      };
      res.json(response);
    } else if (
      req.body.queryResult.parameters.month &&
      req.body.queryResult.parameters.ordinal
    ) {
      var year =
        req.body.queryResult.parameters.year || new Date().getUTCFullYear();
      const monthName = req.body.queryResult.parameters.month;
      const monthNumber =
        new Date(Date.parse(monthName + " 1, " + year)).getMonth() + 1;
      const month = monthNumber < 10 ? "0" + monthNumber : monthNumber;
      const ordinal =
        req.body.queryResult.parameters.ordinal < 10
          ? "0" + req.body.queryResult.parameters.ordinal
          : req.body.queryResult.parameters.ordinal;
      const dateStr = `${year}-${month}-${ordinal}`;
      const date = new Date(dateStr);
      const expenses = await getTotalExpensesByDate(date);
      const response = {
        fulfillmentText: `The expenses for  ${monthName}  ${getOrdinal(
          parseInt(ordinal)
        )} , ${year}  is ${expenses}${
          expenses > 0 || expenses < 0 ? "$" : ""
        }.`,
      };
      res.json(response);
    } else {
      const response = {
        fulfillmentText:
          "Sorry, I don't understand.Please add date,month or year",
      };

      res.json(response);
    }
  } else if (intentName === "GetTotalPayrollsByDate") {
    if (req.body.queryResult.parameters.date) {
      const dateStr = req.body.queryResult.parameters.date;
      // .substring(0, 10);
      const originalDate = new Date(dateStr);
      const year = originalDate.getFullYear();
      const month = originalDate.getMonth() + 1;
      const day = originalDate.getDate();
      const monthStr = month.toString().padStart(2, "0");
      const dayStr = day.toString().padStart(2, "0");
      const dateStr2 = `${year}-${monthStr}-${dayStr}`;
      const date = new Date(dateStr2);
      const payrolls = await getTotalPayrollsByDate(date);
      const response = {
        fulfillmentText: `The payrolls for ${dateStr2} is ${payrolls}${
          payrolls > 0 || payrolls < 0 ? "$" : ""
        }.`,
      };
      res.json(response);
    } else if (
      req.body.queryResult.parameters.month &&
      req.body.queryResult.parameters.ordinal
    ) {
      var year =
        req.body.queryResult.parameters.year || new Date().getUTCFullYear();
      const monthName = req.body.queryResult.parameters.month;
      const monthNumber =
        new Date(Date.parse(monthName + " 1, " + year)).getMonth() + 1;
      const month = monthNumber < 10 ? "0" + monthNumber : monthNumber;
      const ordinal =
        req.body.queryResult.parameters.ordinal < 10
          ? "0" + req.body.queryResult.parameters.ordinal
          : req.body.queryResult.parameters.ordinal;
      const dateStr = `${year}-${month}-${ordinal}`;
      const date = new Date(dateStr);
      const payrolls = await getTotalPayrollsByDate(date);
      const response = {
        fulfillmentText: `The payrolls for  ${monthName}  ${getOrdinal(
          parseInt(ordinal)
        )} , ${year}  is ${payrolls}${
          payrolls > 0 || payrolls < 0 ? "$" : ""
        }.`,
      };
      res.json(response);
    } else {
      const response = {
        fulfillmentText:
          "Sorry, I don't understand.Please add date,month or year",
      };

      res.json(response);
    }
  } else if (intentName === "GetTotalNetProfitByDate") {
    if (req.body.queryResult.parameters.date) {
      const dateStr = req.body.queryResult.parameters.date;
      // .substring(0, 10);
      const originalDate = new Date(dateStr);
      const year = originalDate.getFullYear();
      const month = originalDate.getMonth() + 1;
      const day = originalDate.getDate();
      const monthStr = month.toString().padStart(2, "0");
      const dayStr = day.toString().padStart(2, "0");
      const dateStr2 = `${year}-${monthStr}-${dayStr}`;
      const date = new Date(dateStr2);
      const netProfit = await getTotalNetProfitByDate(date);
      const response = {
        fulfillmentText: `The net profit for ${dateStr2} is ${netProfit}${
          netProfit > 0 || netProfit < 0 ? "$" : ""
        }.`,
      };
      res.json(response);
    } else if (
      req.body.queryResult.parameters.month &&
      req.body.queryResult.parameters.ordinal
    ) {
      var year =
        req.body.queryResult.parameters.year || new Date().getUTCFullYear();
      const monthName = req.body.queryResult.parameters.month;
      const monthNumber =
        new Date(Date.parse(monthName + " 1, " + year)).getMonth() + 1;
      const month = monthNumber < 10 ? "0" + monthNumber : monthNumber;
      const ordinal =
        req.body.queryResult.parameters.ordinal < 10
          ? "0" + req.body.queryResult.parameters.ordinal
          : req.body.queryResult.parameters.ordinal;
      const dateStr = `${year}-${month}-${ordinal}`;
      const date = new Date(dateStr);
      const netProfit = await getTotalNetProfitByDate(date);
      const response = {
        fulfillmentText: `The net profit for  ${monthName}  ${getOrdinal(
          parseInt(ordinal)
        )} , ${year}  is ${netProfit}${
          netProfit > 0 || netProfit < 0 ? "$" : ""
        }.`,
      };
      res.json(response);
    } else {
      const response = {
        fulfillmentText:
          "Sorry, I don't understand.Please add date,month or year",
      };

      res.json(response);
    }
  } else {
    // Handle unknown intents
    const response = {
      fulfillmentText: "Sorry, I don't understand.",
    };

    res.json(response);
  }
});
export default router;

//monthly (next month previous)

//date (tomorrow yesterday)

//avg monthly (incomes,expenses,payrolls,netProfit)

//
