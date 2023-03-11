const querySelectorStringBalance = '[class*="balance"]';
const querySelectorStringFromDropdown = 'select[id^="fromDropdown"]';
const querySelectorStringToDropdown = 'select[id^="toDropdown"]';

const maxMillisecondsToSearch = 5000;
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
    if (!(htmlObject instanceof HTMLSelectElement)) {
        // Only want to handle select elements
        return;
    }

    for (var i = 0; i < htmlObject.options.length; i++) {
        var option = htmlObject.options[i];
        
        // Assuming it is formatted as "Account Name = $123.12"
        const currentInnerHTMLElements = option.innerHTML.split(" = ");
        if (currentInnerHTMLElements.length > 1) {
            // We want to remove the balance details from the account name
            option.innerHTML = currentInnerHTMLElements[0]; 
        }

    }
};

/*
 * Function used to remove the balance details in the from account dropdown.
 */
const maskFromAccountSelectOptions = () => {
    maskObjects(querySelectorStringFromDropdown, cleanDropdownAccountBalances);
};

/*
 * Function used to remove the balance details in the to account dropdown.
 */
const maskToAccountSelectOptions = () => {
    maskObjects(querySelectorStringToDropdown, cleanDropdownAccountBalances);
};

const target = document.querySelector('head > title');
const observer = new window.WebKitMutationObserver(function(mutations) {
    /**
     * Observing page to check when items to mask are present
     */
    mutations.forEach(function() {
        const start = new Date().getTime();
        const checkAccountBalancesInterval = setInterval(checkAccountBalances, intervalAmount);
        const checkFromAccountDropdown = setInterval(checkFromAccountDropdownMask, intervalAmount);
        const checkToAccountDropdown = setInterval(checkToAccountDropdownMask, intervalAmount);

    
        function checkAccountBalances() {
            const checkFunction = (querySelectorString) => {
                return areLoaded(querySelectorString);
            };
            searchForObjectsToMask(querySelectorStringBalance, start, checkAccountBalancesInterval, maskAccounts, checkFunction, maxMillisecondsToSearch);
        }

        function checkFromAccountDropdownMask() {
            const checkFunction = (querySelectorString) => {
                return areLoaded(querySelectorString);
            };
            searchForObjectsToMask(querySelectorStringFromDropdown, start, checkFromAccountDropdown, maskFromAccountSelectOptions, checkFunction, maxMillisecondsToSearch);
        }

        function checkToAccountDropdownMask() {
            const checkFunction = (querySelectorString) => {
                console.log("Checking to account dropdown");
                console.log(areLoaded(querySelectorString));
                return areLoaded(querySelectorString);
            };
            searchForObjectsToMask(querySelectorStringToDropdown, start, checkToAccountDropdown, maskToAccountSelectOptions, checkFunction, maxMillisecondsToSearch);
        }
    });
});
observer.observe(target, { subtree: true, characterData: true, childList: true });


