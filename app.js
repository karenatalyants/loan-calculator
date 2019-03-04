// listen for submit

document.getElementById("loan-form").addEventListener("submit", function(e) {

  // Hide Results
  document.getElementById("results").style.display = "none";
  document.getElementById("loading").style.display = "block";


  setTimeout(calculateResults, 1200);
  // Show loader

  e.preventDefault();
});

// calculateResults

function calculateResults() {

  // UI vars

  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const ytp = document.getElementById("years");

  const monthly = document.getElementById("monthly-payment");
  const totalPaym = document.getElementById("total-payment");
  const totalInt = document.getElementById("total-interest");

  const principal = parseFloat(amount.value);
  const calcInterest = parseFloat(interest.value) / 100 / 12;
  const calcPayments = parseFloat(ytp.value) * 12;

  // Compute monthly payments

  const x = Math.pow(1 + calcInterest, calcPayments);

  const monthlyPay = (principal * x * calcInterest) / (x - 1);

  // set results below the form


  if (isFinite(monthlyPay)) {
    monthly.value = monthlyPay.toFixed(2);
    totalPaym.value = (monthlyPay * calcPayments).toFixed(2);
    totalInt.value = ((monthlyPay * calcPayments) - principal).toFixed(2);

    //Show results
    document.getElementById("results").style.display = "block";

    // Hide loader

    document.getElementById("loading").style.display = "none";



  } else {
    showError("Please check your numbers");
    document.getElementById("loading").style.display = "none";
    document.getElementById("results").style.display = "none";

  }

}

// Show error function

function showError(error) {

  // Create a div
  const errorDiv = document.createElement("div");

  // Get some elements

  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");



  // Add class
  errorDiv.className = "alert alert-danger";

  // Add text

  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading

  card.insertBefore(errorDiv, heading);


  // clear error after 3 seconds

  setTimeout(clearError, 3000);

}



function clearError() {
  document.querySelector(".alert").remove();
}