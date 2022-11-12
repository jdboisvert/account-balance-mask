function maskAccounts() {
    const digitRegularExpression = /\d/;
    const balanceAmountElements = document.querySelectorAll('[class*="amount"]');
    for (const balanceAmountElement of balanceAmountElements) {
        const originalContent = balanceAmountElement.innerHTML;

        if (!digitRegularExpression.test(originalContent)) {
            // Ignore since value does not contain digits.
            continue
        }
        
        balanceAmountElement.innerHTML = "****"; 

        balanceAmountElement.onmouseover = function() {
            this.innerHTML = originalContent;
        }
        balanceAmountElement.onmouseout = function() {
            this.innerHTML = "****";
        }
    }
}

function maskBalanceObjects() {
    const digitRegularExpression = /\d/;
    const accountBalances = document.querySelectorAll('span[id*="account-balance"]');
    for (const balanceAmountElement of accountBalances) {
        const originalContent = balanceAmountElement.innerHTML;

        if (!digitRegularExpression.test(originalContent)) {
            // Ignore since value does not contain digits.
            continue
        }
        
        balanceAmountElement.innerHTML = "****"; 

        balanceAmountElement.onmouseover = function() {
            this.innerHTML = originalContent;
        }
        balanceAmountElement.onmouseout = function() {
            this.innerHTML = "****";
        }
    }
}

const target = document.querySelector('head > title');
const observer = new window.WebKitMutationObserver(function(mutations) {
    const start = new Date().getTime();
    const amountClassInterval = setInterval(checkAmountClasses, 300);
    const balanceIdInterval = setInterval(checkBalanceIds, 300);
    function checkAmountClasses() {
        amountClasses = document.querySelectorAll('[class*="amount"]');
        const digitRegularExpression = /\d/;

        if (amountClasses.length > 0 && amountClasses[0].innerHTML == "****") {
            clearInterval(amountClassInterval);
        }
        

        if (amountClasses.length > 0 && digitRegularExpression.test(amountClasses[0].innerHTML)) {
            // Only let it check for a total of 10 seconds. any longer it can be assumed it is missing.
            clearInterval(amountClassInterval);
            maskAccounts();
        }

        if (new Date().getTime() - start > 15000) {
            // Stop checking if it has not found anything after a set amount of time. 
            clearInterval(amountClassInterval);
        }
    }

    function checkBalanceIds() {
        balanceIds = document.querySelectorAll('[id*="account-balance"]');
        const digitRegularExpression = /\d/;

        if (balanceIds.length > 0 && balanceIds[0].innerHTML == "****") {
            clearInterval(balanceIdInterval);
        }

        if (balanceIds.length > 0 && digitRegularExpression.test(balanceIds[0].innerHTML)) {
            // Only let it check for a total of 10 seconds. any longer it can be assumed it is missing.
            clearInterval(balanceIdInterval);
            maskBalanceObjects();
        }

        if (new Date().getTime() - start > 15000) {
            // Stop checking if it has not found anything after a set amount of time. 
            clearInterval(balanceIdInterval);
        }
    }
});
observer.observe(target, { subtree: true, characterData: true, childList: true });



