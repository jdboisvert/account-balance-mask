
/*
 * Function used to mask the RBC balance details present on the page.
 */
const maskAccounts = () => {
    maskObjects('[class*="balance"]', maskObject);
}

/*
 * Function used to remove the balance details in the account drop downs.
 */
function maskAccountSelectionOptions() {
    const digitRegularExpression = /\d/;
    const balanceAmountElements = document.querySelectorAll('option');
    for (const balanceAmountElement of balanceAmountElements) {
        const originalContent = balanceAmountElement.innerHTML;

        if (!digitRegularExpression.test(originalContent)) {
            // Ignore since value does not contain digits.
            continue
        }
        
        // We wish to simply show the account name not the balance. 
        const currentInnerHTML = balanceAmountElement.innerHTML; 

        // Assuming it is formatted as "Account Name = $123.12"
        const currentInnerHTMLElements = currentInnerHTML.split(" = ");

        if (currentInnerHTMLElements.length > 1) {
            balanceAmountElement.innerHTML = currentInnerHTMLElements[0]; 
        }
    }
}

const target = document.querySelector('head > title');
const observer = new window.WebKitMutationObserver(function(mutations) {
    mutations.forEach(function() {
        const start = new Date().getTime();
        const checkAccountBalancesInterval = setInterval(checkAccountBalances, 10);
        const checkAccountOptionsInterval = setInterval(checkAccountOptions, 10);
        const digitRegularExpression = /\d/;
    
        function checkAccountBalances() {
            if (document.querySelectorAll('[class*="balance"]').length > 0) {
                clearInterval(checkAccountBalancesInterval);
                maskAccounts();
            }
    
            if (new Date().getTime() - start > 15000) {
                // Stop checking if it has not found anything after a set amount of time. 
                clearInterval(checkAccountBalancesInterval);
            }
        }
    
        function checkAccountOptions() {
            if (document.querySelectorAll('option').length > 0 && digitRegularExpression.test(document.querySelectorAll('option')[0].innerHTML)) {
                clearInterval(checkAccountOptionsInterval);
                maskAccountSelectionOptions();
            }
    
            if (new Date().getTime() - start > 15000) {
                // Stop checking if it has not found anything after a set amount of time. 
                clearInterval(checkAccountOptionsInterval);
            }
        }
    });
});
observer.observe(target, { subtree: true, characterData: true, childList: true });


