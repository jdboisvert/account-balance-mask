const querySelectorStringAccountAmount = '[class*="amount"]';
const querySelectorStringAccountBalance = 'span[id*="account-balance"]';
const querySelectorStringAccountDetailsBalance = 'div[id*="account-details-balance"]';

const maxMillisecondsToSearch = 15000;
const intervalAmount = 300;

/*
 * Function used to mask the Tangerine amount details present on the homepage.
 */
const maskAccounts = () => {
    maskObjects(querySelectorStringAccountAmount, maskObject);
};

/*
 * Function used to mask the Tangerine balance details present on the homepage.
 */
const maskBalanceObjects = () => {
    maskObjects(querySelectorStringAccountBalance, maskObject);
};

/*
 * Function used to mask the Tangerine balance details present on the account details page.
 */
const maskDetailsBalanceObjects = () => {
    maskObjects(querySelectorStringAccountDetailsBalance, maskObject);
};

const target = document.querySelector('head > title');
const observer = new window.WebKitMutationObserver(function(mutations) {
    /**
     * Observing page to check when items to mask are present
     */
    const start = new Date().getTime();
    const amountClassInterval = setInterval(checkAmountClasses, intervalAmount);
    const balanceIdInterval = setInterval(checkBalanceIds, intervalAmount);
    const detailsBalanceIdInterval = setInterval(checkDetailsBalanceIds, intervalAmount);

    function checkAmountClasses() {
        const checkFunction = (querySelectorString) => {
            return areLoaded(querySelectorString) && isFirstItemADigit(querySelectorString);
        };
        
        searchForObjectsToMask(querySelectorStringAccountAmount, start, amountClassInterval, maskAccounts, checkFunction, maxMillisecondsToSearch);
    }

    function checkBalanceIds() {
        const checkFunction = (querySelectorString) => {
            return areLoaded(querySelectorString) && isFirstItemADigit(querySelectorString);
        };
        
        searchForObjectsToMask(querySelectorStringAccountBalance, start, balanceIdInterval, maskBalanceObjects, checkFunction, maxMillisecondsToSearch);
    }
    
    function checkDetailsBalanceIds() {
        const checkFunction = (querySelectorString) => {
            return areLoaded(querySelectorString) && isFirstItemADigit(querySelectorString);
        };
        
        searchForObjectsToMask(querySelectorStringAccountDetailsBalance, start, detailsBalanceIdInterval, maskDetailsBalanceObjects, checkFunction, maxMillisecondsToSearch);
    }
});
observer.observe(target, { subtree: true, characterData: true, childList: true });



