const querySelectorStringBalance = '[class*="balance"]';
const querySelectorStringDropdownOptions = 'option';

const maxMillisecondsToSearch = 15000;
const intervalAmount = 10;


/*
 * Function used to mask the RBC balance details present on the page.
 */
const maskAccounts = () => {
    maskObjects(querySelectorStringBalance, maskObject);
};

/**
 * Specific to the dropdown items that have account balances in them. 
 * @param {*} htmlObject representing an object from the DOM
 */
const cleanDropdownAccountBalances = (htmlObject) => {
    // We wish to simply show the account name not the balance. 
    const currentInnerHTML = htmlObject.innerHTML; 

    // Assuming it is formatted as "Account Name = $123.12"
    const currentInnerHTMLElements = currentInnerHTML.split(" = ");
    if (currentInnerHTMLElements.length > 1) {
        htmlObject.innerHTML = currentInnerHTMLElements[0]; 
    }
};

/*
 * Function used to remove the balance details in the account drop downs.
 */
const maskAccountSelectionOptions = () => {
    maskObjects(querySelectorStringDropdownOptions, cleanDropdownAccountBalances);

};

const target = document.querySelector('head > title');
const observer = new window.WebKitMutationObserver(function(mutations) {
    /**
     * Observing page to check when items to mask are present
     */
    mutations.forEach(function() {
        const start = new Date().getTime();
        const checkAccountBalancesInterval = setInterval(checkAccountBalances, intervalAmount);
        const checkAccountOptionsInterval = setInterval(checkAccountOptions, intervalAmount);
    
        function checkAccountBalances() {
            const checkFunction = (querySelectorString) => {
                return areLoaded(querySelectorString);
            };
            searchForObjectsToMask(querySelectorStringBalance, start, checkAccountBalancesInterval, maskAccounts, checkFunction, maxMillisecondsToSearch);
        }

        function checkAccountOptions() {
            const checkFunction = (querySelectorString) => {
                return areLoaded(querySelectorString) && isFirstItemADigit(querySelectorString);
            };
            searchForObjectsToMask(querySelectorStringDropdownOptions, start, checkAccountOptionsInterval, maskAccountSelectionOptions, checkFunction, maxMillisecondsToSearch);
        }
    });
});
observer.observe(target, { subtree: true, characterData: true, childList: true });


