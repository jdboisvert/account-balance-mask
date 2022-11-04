function maskAccounts() {
    const digitRegularExpression = /\d/;
    const balanceAmountElements = document.querySelectorAll('[class^="balance"]');
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

var target = document.querySelector('head > title');
var observer = new window.WebKitMutationObserver(function(mutations) {
    mutations.forEach(function() {
        maskAccounts();
    });
});
observer.observe(target, { subtree: true, characterData: true, childList: true });

function init() {
    var checkInternal = setInterval(check, 111);

    function check() {
        if (document.querySelectorAll('[class^="balance"]').length > 0) {
            clearInterval(checkInternal);
            maskAccounts();
        }
    }
};

window.addEventListener("load", init, false);



