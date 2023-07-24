chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
        const tabUrl = tab.url;
        const iconUrl = chrome.runtime.getURL('dontgothere16.png');
        chrome.storage.sync.get(['baseURL', 'redirectURL'], function (result) {
            const { baseURL, redirectURL } = result;
            if (baseURL && redirectURL) {
                chrome.notifications.create({
                    type: 'basic',
                    iconUrl: iconUrl,
                    title: 'Tab Updated',
                    message: baseURL +" --- "+ redirectURL,
                });
            }
        });
    }
});

