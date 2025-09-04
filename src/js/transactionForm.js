import { updateDashboardSummary } from "./dashboard";

export function initTransactionForm() {
  // DOM Element

  const inputTansTittle = document.getElementById("inputTansTittle");
  const inputTansDesc = document.getElementById("inputTansDesc");
  const inputCategory = document.getElementById("inputCategory");
  const inputTansType = document.getElementById("inputTansType");
  const inputAmount = document.getElementById("inputAmount");

  const tansSubmit = document.getElementById("tansSubmit");
  const resetTrans = document.getElementById("resetTrans");

  const listContent = document.querySelector("#listContent");

  let transactionList = JSON.parse(localStorage.getItem("transactions")) || [];

  // Reset input fields
  function ResetInputForm() {
    inputTansTittle.value = "";
    inputTansDesc.value = "";
    inputCategory.value = "";
    inputTansType.value = "";
    inputAmount.value = "";

    // errorMsg.innerText = "";
    // errorMsg.style.display = "none";
  }

  // Validate form inputs
  function ValidateInputs(title, desc, category, type, amount) {
    return (
      title === "" ||
      desc === "" ||
      category === "" ||
      type === "" ||
      isNaN(amount) ||
      amount <= 0
    );
  }

  function TransationSubmit() {
    let title = inputTansTittle.value.trim();
    let desc = inputTansDesc.value.trim();
    let category = inputCategory.value.trim();
    let type = inputTansType.value.trim();
    let amount = parseInt(inputAmount.value);

    if (ValidateInputs(title, desc, category, type, amount)) {
      console.log("Please provide valid transaction details.");
      ResetInputForm();
      return;
    }

    const transDetails = {
      id: Date.now(),
      title,
      desc,
      category,
      type,
      amount,
    };

    transactionList.push(transDetails);
    localStorage.setItem("transactions", JSON.stringify(transactionList));
    ResetInputForm();
    DisplayList();
  }

  function DisplayList() {
    listContent.innerHTML = ""; // Clear previous list

    if (transactionList.length === 0) {
      listContent.innerHTML = `<tr><td colspan="4" style='text-align:center'>No records</td></tr>`;
      return;
    }

    transactionList.forEach((trans, index) => {
      const { id, title, category, amount, type } = trans;
      const trTag = document.createElement("tr");

      const idtag = document.createElement("td");
      idtag.textContent = index + 1;
      // Title
      const titleTag = document.createElement("td");
      titleTag.setAttribute("data-label", "Title");
      titleTag.textContent = title;

      // Category
      const categoryTag = document.createElement("td");
      categoryTag.setAttribute("data-label", "Category");
      categoryTag.textContent = category;

      switch (category) {
        case "ration":
          categoryTag.style.color = "#00B9E8";
          categoryTag.style.fontWeight = "700";
          break;
        case "stationery":
          categoryTag.style.color = "#FFBF00";
          categoryTag.style.fontWeight = "700";
          break;
        case "utilities":
          categoryTag.style.color = "#32CD32";
          categoryTag.style.fontWeight = "700";
          break;
        case "transportation":
          categoryTag.style.color = "#E23D28";
          categoryTag.style.fontWeight = "700";
          break;
        default:
          categoryTag.style.color = "#ccc";
          categoryTag.style.fontWeight = "700";
      }

      const typeTag = document.createElement("td");
      typeTag.textContent = type;

      // Amount
      const priceTag = document.createElement("td");
      priceTag.setAttribute("data-label", "Amount");
      priceTag.classList.add("price");
      priceTag.style.color = type === "income" ? "#32CD32" : "#E23D28";
      priceTag.innerHTML = `<i class="fa-solid fa-indian-rupee-sign"></i> ${amount}`;

      // Action Buttons (in a TD)
      const actionTag = document.createElement("td");
      actionTag.setAttribute("data-label", "Actions");

      const buttonGroup = document.createElement("div");
      buttonGroup.classList.add("button-group");

      const viewBtn = document.createElement("button");
      viewBtn.id = "viewDetail";
      viewBtn.setAttribute("data-id", id);
      viewBtn.innerHTML = `<i class="fa-solid fa-eye"></i>`;

      const deleteBtn = document.createElement("button");
      deleteBtn.id = "deleteTrans";
      deleteBtn.setAttribute("data-id", id);
      deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;

      deleteBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const id = Number(deleteBtn.dataset.id);
        transactionList = transactionList.filter((data) => data.id !== id);
        localStorage.setItem("transactions", JSON.stringify(transactionList));
        DisplayList();
        updateDashboardSummary();
      });

      // Style buttons if needed
      viewBtn.style.marginRight = "8px";

      // Append buttons to action cell
      buttonGroup.appendChild(viewBtn);
      buttonGroup.appendChild(deleteBtn);
      actionTag.appendChild(buttonGroup);

      // Append all TDs to row
      trTag.appendChild(idtag);
      trTag.appendChild(titleTag);
      trTag.appendChild(categoryTag);
      trTag.appendChild(typeTag);

      trTag.appendChild(priceTag);
      trTag.appendChild(actionTag);

      listContent.appendChild(trTag);
    });
  }

  tansSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    TransationSubmit();
    updateDashboardSummary();
  });

  resetTrans.addEventListener("click", (e) => {
    e.preventDefault();
    ResetInputForm();
  });

  window.addEventListener("DOMContentLoaded", () => {
    DisplayList();
  });
}
