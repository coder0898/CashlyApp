export function initTransactionForm() {
  // DOM Element

  const inputTansTittle = document.getElementById("inputTansTittle");
  const inputTansDesc = document.getElementById("inputTansDesc");
  const inputCategory = document.getElementById("inputCategory");
  const inputTansType = document.getElementById("inputTansType");
  const inputAmount = document.getElementById("inputAmount");

  const tansSubmit = document.getElementById("tansSubmit");
  const resetTrans = document.getElementById("resetTrans");

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
  }

  tansSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    TransationSubmit();
  });

  resetTrans.addEventListener("click", (e) => {
    e.preventDefault();
    ResetInputForm();
  });
}
