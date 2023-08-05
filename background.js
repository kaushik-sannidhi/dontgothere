chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
        const tabUrl = tab.url;
        const iconUrl = chrome.runtime.getURL('dontgothere16.png');
        chrome.storage.sync.get('rules', function (result) {
            const rules = result.rules || [];
            for (const rule of rules) {
                if (rule.baseURL && rule.redirectURL && tabUrl.includes(rule.baseURL)) {
                    chrome.tabs.remove(tabId, function () {
                        chrome.tabs.create({ url: rule.redirectURL });
                    });
                    chrome.notifications.create({
                        type: 'basic',
                        iconUrl: iconUrl,
                        title: 'Tab Updated',
                        message: rule.baseURL + " --- " + rule.redirectURL,
                    });
                    break; 
                }
            }
        });
    }
});
