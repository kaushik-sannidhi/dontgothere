chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.get(['baseURL', 'redirectURL', 'ruleID'], function (
    result
  ) {
    const { baseURL, redirectURL, ruleID } = result;
    if (baseURL && redirectURL) {
      const rule = {
        id: ruleID || 'redirectRule',
        priority: 1,
        condition: {
          urlFilter: { hostSuffix: baseURL },
        },
        action: {
          type: 'redirect',
          redirect: { regexSubstitution: redirectURL },
        },
      };

      if (ruleID) {
        chrome.declarativeNetRequest.updateDynamicRules(
          { removeRuleIds: [ruleID] },
          function () {
            addRuleAndSaveID(rule);
          }
        );
      } else {
        addRuleAndSaveID(rule);
      }
    }
  });
});

function addRuleAndSaveID(rule) {
  chrome.declarativeNetRequest.updateDynamicRules({ addRules: [rule] }, function () {
    if (!rule.id) {
      const newRuleID = rule.id;
      chrome.storage.sync.set({ ruleID: newRuleID });
    }
  });
}
