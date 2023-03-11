const querySelectorPortfolioValue = '[id*="portfolio-value"]';
const querySelectorStringAccountAmount = '[class*="sc-cXHkDB jLBty"]';


const maxMillisecondsToSearch = 5000;
const defaultInterval = 300;

/*
 * Function used to mask the total Portfolio Value present on the dashboard.
 */
const maskPortfolioValue = () => {
    maskObjects(querySelectorPortfolioValue, maskObject);
};

/*
* Function used to mask the account amounts present on the dashboard.
*/
const maskAccountAmounts = () => {
    maskObjects(querySelectorStringAccountAmount, maskObject);
};

const target = document.querySelector('head > title');
const observer = new window.WebKitMutationObserver(function(mutations) {
    /**
     * Observing page to check when items to mask are present
     */
    const start = new Date().getTime();
    const portfolioValueInterval = setInterval(checkPortfolioValueId, defaultInterval);
    const accountAmountClassInterval = setInterval(checkAccountAmountClasses, defaultInterval);
    
    function checkPortfolioValueId() {
        const checkFunction = (querySelectorString) => {
            return areLoaded(querySelectorString) && isFirstItemADigit(querySelectorString);
        };
        
        searchForObjectsToMask(querySelectorPortfolioValue, start, portfolioValueInterval, maskPortfolioValue, checkFunction, maxMillisecondsToSearch);
    }

    function checkAccountAmountClasses() {
        const checkFunction = (querySelectorString) => {
            return areLoaded(querySelectorString) && isFirstItemADigit(querySelectorString);
        };
        
        searchForObjectsToMask(querySelectorStringAccountAmount, start, accountAmountClassInterval, maskAccountAmounts, checkFunction, maxMillisecondsToSearch);
    }
});
observer.observe(target, { subtree: true, characterData: true, childList: true });



