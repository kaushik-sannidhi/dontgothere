chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.get(['baseURL', 'redirectURL'], function (result) {
        const { baseURL, redirectURL } = result;
        if (baseURL && redirectURL) {
            const rule = {
                id: 'redirectRule',
                priority: 1,
                condition: {
                    urlFilter: { hostSuffix: baseURL },
                },
                action: {
                    type: 'redirect',
                    redirect: { regexSubstitution: redirectURL },
                },
            };

            chrome.declarativeNetRequest.updateDynamicRules({
                removeRuleIds: ['redirectRule'],
                addRules: [rule],
            });
        }
    });
});
