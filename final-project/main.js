document.addEventListener('DOMContentLoaded', function () {
    console.log('JavaScript is running');
});

function calculateRetirement() {
    const initialInvestment = parseFloat(document.getElementById('initialInvestment').value);
    const monthlyContribution = parseFloat(document.getElementById('monthlyContribution').value);
    const annualRate = parseFloat(document.getElementById('annualRate').value) / 100;
    const yearsToSave = parseInt(document.getElementById('yearsToSave').value);
    const retirementYears = parseInt(document.getElementById('retirementYears').value);

    if (isNaN(initialInvestment) || isNaN(monthlyContribution) || isNaN(annualRate) || isNaN(yearsToSave) || isNaN(retirementYears)) {
        alert("Please fill in all fields with valid numbers.");
        return;
    }

    const futureValueInitialInvestment = initialInvestment * Math.pow(1 + annualRate, yearsToSave);
    const futureValueMonthlyContributions = monthlyContribution * (((Math.pow(1 + annualRate, yearsToSave) - 1) / annualRate) * (1 + annualRate));
    const totalSavingsAtRetirement = futureValueInitialInvestment + futureValueMonthlyContributions;
    const annualIncome = totalSavingsAtRetirement * 0.04; // The 4% rule from the trinity study is why it is 0.04
    const monthlyIncome = annualIncome / 12; 

    // Display the results
    document.getElementById('monthlyIncome').innerText = `Estimated Monthly Retirement Income: $${monthlyIncome.toFixed(2)}`;
    document.getElementById('annualIncome').innerText = `Estimated Annual Retirement Income: $${annualIncome.toFixed(2)}`;
    document.getElementById('totalSavings').innerText = `Total Savings at Retirement: $${totalSavingsAtRetirement.toFixed(2)}`;
}