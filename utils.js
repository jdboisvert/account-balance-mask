const digitRegularExpression = /\d/;
const maskingValue = "****";

/**
 * Function used to mask the given HTML object
 * and assign it functions to show the original value on mouse over
 * @param {*} htmlObject 
 */
const maskObject = (htmlObject) => {
    const originalContent = htmlObject.innerHTML;

    if (!digitRegularExpression.test(originalContent)) {
        // Ignore since value does not contain digits.
        return
    }
    
    htmlObject.innerHTML = maskingValue; 

    htmlObject.onmouseover = function() {
        this.innerHTML = originalContent;
    }
    htmlObject.onmouseout = function() {
        this.innerHTML = maskingValue;
    }
};


/**
 * Function used to mask several HTML objects that 
 * match the given query selector string (ex: '[class*="balance"]').
 * 
 * @param {*} querySelectorString match the given query selector string (ex: '[class*="balance"]').
 * @param {*} maskFunction this takes as input a maskFunction which should take a htmlObject as input
 */
const maskObjects = (querySelectorString, maskFunction) => {
    const htmlObjects = document.querySelectorAll(querySelectorString);
    for (const htmlObject of htmlObjects) {
        maskFunction(htmlObject);
    }
};

/**
 * Function used to search for items on the page and will stop searching after a set amount of time.
 * 
 * @param {*} querySelectorString used to search for the items
 * @param {*} startTime the timestamp of when the search started 
 * @param {*} interval that is running the checks that needs to be cleared 
 * @param {*} maskFunction handles the masking
 * @param {*} checkFunction handles checking if the objects have been found (takes as input the querySelectorString)
 * @param {*} maxMillisecondsToSearch an integer of milliseconds that should be spent searching
 */
 const searchForObjectsToMask = (querySelectorString, startTime, interval, maskFunction, checkFunction, maxMillisecondsToSearch) => {
    if (checkFunction(querySelectorString)) {
        clearInterval(interval);
        maskFunction();
    }

    if (new Date().getTime() - startTime > maxMillisecondsToSearch) {
        // Stop checking if it has not found anything after a set amount of time. 
        clearInterval(interval);
    }
};

/**
 * Checks if any elements in the DOM are present matching the querySelectorString
 * 
 * @param {*} querySelectorString used to search for the items
 * @returns true if first item is a digit false otherwise
 */
const areLoaded = (querySelectorString) => {
    return document.querySelectorAll(querySelectorString).length > 0
};

/**
 * Checks if the first item's html is a digit
 * 
 * @param {*} querySelectorString used to search for the items
 * @returns true if first item is a digit false otherwise
 */
const isFirstItemADigit = (querySelectorString) => {
    return digitRegularExpression.test(document.querySelectorAll(querySelectorString)[0].innerHTML);
};