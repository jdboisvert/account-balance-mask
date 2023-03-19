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
        return;
    }

    // Assuming it is formatted as "Account Name = $123.12"
    for (var i = 0; i < htmlObject.options.length; i++) {
        var option = htmlObject.options[i];
        // We want to remove the balance details from the account name
        const currentInnerHTMLElements = option.innerHTML.split(" = ");
        if (currentInnerHTMLElements.length > 1) {
            option.innerHTML = currentInnerHTMLElements[0]; 
        }
    }
};

/*
 * Function used to remove the balance details in the from account dropdown.
 */
const maskAccountSelectOptions = (querySelectorString) => {
    maskObjects(querySelectorString, cleanDropdownAccountBalances);
};

const target = document.querySelector('head > title');
const observer = new window.WebKitMutationObserver((mutations) => {
    mutations.forEach(() => {
        const start = new Date().getTime();
        const checkInterval = setInterval(() => {
            checkForMasking(querySelectorStringBalance, maskAccounts);
            checkForMasking(querySelectorStringFromDropdown, () => maskAccountSelectOptions(querySelectorStringFromDropdown));
            checkForMasking(querySelectorStringToDropdown, () => maskAccountSelectOptions(querySelectorStringToDropdown));
        }, intervalAmount);

        function checkForMasking(querySelectorString, maskFunction) {
            const checkFunction = (querySelectorString) => areLoaded(querySelectorString);
            searchForObjectsToMask(querySelectorString, start, checkInterval, maskFunction, checkFunction, maxMillisecondsToSearch);
        }
    });
});
observer.observe(target, { subtree: true, characterData: true, childList: true });
