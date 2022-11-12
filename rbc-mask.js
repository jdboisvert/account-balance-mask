function maskAccounts() {
    const digitRegularExpression = /\d/;
    const balanceAmountElements = document.querySelectorAll('[class*="balance"]');
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

const target = document.querySelector('head > title');
const observer = new window.WebKitMutationObserver(function(mutations) {
    mutations.forEach(function() {
        maskAccounts();
    });
});
observer.observe(target, { subtree: true, characterData: true, childList: true });

function init() {
    const start = new Date().getTime();
    var checkInternal = setInterval(check, 100);

    function check() {
        if (document.querySelectorAll('[class*="balance"]').length > 0) {
            clearInterval(checkInternal);
            maskAccounts();
        }

        if (new Date().getTime() - start > 15000) {
            // Stop checking if it has not found anything after a set amount of time. 
            clearInterval(checkInternal);
        }
    }
};

window.addEventListener("load", init, false);



