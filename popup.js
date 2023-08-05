document.addEventListener('DOMContentLoaded', function () {
    const baseURLInput = document.getElementById('baseURL');
    const redirectURLInput = document.getElementById('redirectURL');
    const addRuleButton = document.getElementById('addRule');
    const rulesList = document.getElementById('rulesList');

    chrome.storage.sync.get('rules', function (result) {
        const existingRules = result.rules || [];
        for (const rule of existingRules) {
            addRuleToList(rule.baseURL, rule.redirectURL);
        }
    });

    addRuleButton.addEventListener('click', function () {
        const baseURL = baseURLInput.value.trim();
        const redirectURL = redirectURLInput.value.trim();

        if (baseURL && redirectURL) {
            addRuleToList(baseURL, redirectURL);
            baseURLInput.value = '';
            redirectURLInput.value = '';

            saveRulesToStorage();
        }
    });

    rulesList.addEventListener('click', function (event) {
        if (event.target.classList.contains('removeRule')) {
            const ruleItem = event.target.parentElement;
            removeRuleFromList(ruleItem);

            saveRulesToStorage();
        }
    });

    function addRuleToList(baseURL, redirectURL) {
        const ruleItem = document.createElement('li');
        ruleItem.setAttribute('data-baseurl', baseURL);
        ruleItem.setAttribute('data-redirecturl', redirectURL);
        ruleItem.textContent = baseURL + ' => ' + redirectURL;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('removeRule');
        ruleItem.appendChild(removeButton);

        rulesList.appendChild(ruleItem);
    }

    function removeRuleFromList(ruleItem) {
        ruleItem.remove();
    }

    function saveRulesToStorage() {
        const rules = [];
        const ruleItems = rulesList.querySelectorAll('li');
        ruleItems.forEach(function (ruleItem) {
            const baseURL = ruleItem.getAttribute('data-baseurl');
            const redirectURL = ruleItem.getAttribute('data-redirecturl');
            rules.push({ baseURL, redirectURL });
        });

        chrome.storage.sync.set({ rules }, function () {
            console.log('Redirecting rules saved!');
        });
    }
});
