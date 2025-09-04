// dashboard.js
import {
  Chart,
  BarController,
  BarElement,
  PieController,
  ArcElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register all needed components
Chart.register(
  BarController,
  BarElement,
  PieController,
  ArcElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

// DOM Elements
const totalIncome = document.getElementById("totalIncome");
const totalExpense = document.getElementById("totalExpense");
const totalSaving = document.getElementById("totalSaving");

// Exported function to calculate and update UI
export function updateDashboardSummary() {
  const transactionList =
    JSON.parse(localStorage.getItem("transactions")) || [];

  let incomeTotal = 0;
  let expenseTotal = 0;

  transactionList.forEach(({ type, amount }) => {
    if (type === "income") {
      incomeTotal += amount;
    } else if (type === "expense") {
      expenseTotal += amount;
    }
  });

  const savingTotal = incomeTotal - expenseTotal;

  // Update UI
  totalIncome.innerHTML = `&#8377; ${incomeTotal}`;
  totalExpense.innerHTML = `&#8377; ${expenseTotal}`;
  totalSaving.innerHTML = `&#8377; ${savingTotal}`;

  // Draw charts with updated data
  chartDisplay([incomeTotal, expenseTotal, savingTotal]);
}

const labels = ["Income", "Expense", "Saving"];

function chartDisplay(dataValues) {
  // Bar Chart
  const ctxBar = document.getElementById("barChart").getContext("2d");
  new Chart(ctxBar, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Amount in INR",
          data: dataValues,
          backgroundColor: ["#4CAF50", "#F44336", "#2196F3"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Total Income, Expense, and Saving",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  // Pie Chart
  const ctxPie = document.getElementById("pieChart").getContext("2d");
  new Chart(ctxPie, {
    type: "pie",
    data: {
      labels: labels,
      datasets: [
        {
          data: dataValues,
          backgroundColor: ["#4CAF50", "#F44336", "#2196F3"],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Proportion of Income, Expense, and Saving",
        },
      },
    },
  });
}

// Initial load
window.addEventListener("DOMContentLoaded", () => {
  updateDashboardSummary();
});
