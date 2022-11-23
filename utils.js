const digitRegularExpression = /\d/;
const maskingValue = "****";

/*
 * Function used to mask the given HTML object
 * and assign it functions to show the original value on mouse over
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



/*
 * Function used to mask several HTML objects that 
 * match the given query selector string (ex: '[class*="balance"]').
 * 
 * This takes as input a maskFunction which should take a htmlObject as input
 */
const maskObjects = (querySelectorString, maskFunction) => {
    const htmlObjects = document.querySelectorAll(querySelectorString);
    for (const htmlObject of htmlObjects) {
        maskFunction(htmlObject);
    }
};