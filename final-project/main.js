document.addEventListener('DOMContentLoaded', function () {
    console.log('JavaScript is running');

    let currentQuoteIndex = 0;
    const quotes = document.querySelectorAll('.quote');
    const leftButton = document.querySelector('.left-button');
    const rightButton = document.querySelector('.right-button');

    function showQuote(index) {
        quotes.forEach((quote, i) => {
            quote.classList.toggle('active', i === index);
        });
    }

    function showNextQuote() {
        currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
        showQuote(currentQuoteIndex);
    }

    function showPreviousQuote() {
        currentQuoteIndex = (currentQuoteIndex - 1 + quotes.length) % quotes.length;
        showQuote(currentQuoteIndex);
    }

    leftButton.addEventListener('click', function () {
        clearInterval(autoChangeInterval);
        showPreviousQuote();
        autoChangeInterval = setInterval(showNextQuote, 3000); // Restart auto change
    });

    rightButton.addEventListener('click', function () {
        clearInterval(autoChangeInterval);
        showNextQuote();
        autoChangeInterval = setInterval(showNextQuote, 3000); // Restart auto change
    });

    // Initialize the first quote as active
    showQuote(currentQuoteIndex);

    // Set interval for automatic quote change
    let autoChangeInterval = setInterval(showNextQuote, 3000);
});

function calculateRetirement() {
    const initialInvestment = parseFloat(document.getElementById('initialInvestment').value);
    const monthlyContribution = parseFloat(document.getElementById('monthlyContribution').value);
    const annualRate = parseFloat(document.getElementById('annualRate').value) / 100;
    const yearsToSave = parseInt(document.getElementById('yearsToSave').value);
    const retirementYears = parseInt(document.getElementById('retirementYears').value);
    const monthsToSave = yearsToSave * 12;
    let presentValue = initialInvestment;
    const monthlyRate = annualRate / 12;
    let futureValue = initialInvestment

    if (isNaN(initialInvestment) || isNaN(monthlyContribution) || isNaN(annualRate) || 
    isNaN(yearsToSave) || isNaN(retirementYears)) {
        alert("Please fill in all fields with valid numbers.");
        return;
    }

    for (let index = 0; index <= monthsToSave; index++) {
        futureValue += monthlyContribution;
        futureValue *= (1 + monthlyRate);
    }

    const totalSavingsAtRetirement = futureValue;
    const annualIncome = totalSavingsAtRetirement * 0.04;
    const monthlyIncome = annualIncome / 12;
    
    // I could not find a equation to do the math correctly so I made a for loop. 
    // const futureValueInitialInvestment = initialInvestment * Math.pow(1 + annualRate, yearsToSave);
    // const futureValueMonthlyContributions = monthlyContribution * (((Math.pow(1 + annualRate,
    //     yearsToSave) - 1) / annualRate) * (1 + annualRate));
    // const totalSavingsAtRetirement = futureValueInitialInvestment + futureValueMonthlyContributions;
    // const annualIncome = totalSavingsAtRetirement * 0.04; // The 4% rule from the trinity study is why it is 0.04
    // const monthlyIncome = annualIncome / 12;

    // Display the results
    document.getElementById('monthlyIncome').innerText = `Estimated Monthly Retirement Income: 
    $${monthlyIncome.toFixed(2)}`;
    document.getElementById('annualIncome').innerText = `Estimated Annual Retirement Income: 
    $${annualIncome.toFixed(2)}`;
    document.getElementById('totalSavings').innerText = `Total Savings at Retirement: 
    $${totalSavingsAtRetirement.toFixed(2)}`;
}