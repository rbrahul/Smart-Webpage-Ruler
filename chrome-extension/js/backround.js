const ACTIVATE_MENU_ID = 'ACTIVATE';
const DEACTIVATE_MENU_ID = 'DEACTIVATE';

function sendActivationMessage(tabId) {
    chrome.tabs.sendMessage(tabId, { action: 'ACTIVATE_APP' });
}

function toggleActivationMessage(tabId) {
    chrome.tabs.sendMessage(tabId, { action: 'TOGGLE_APP' });
}

function sendDeactivationMessage(tabId) {
    chrome.tabs.sendMessage(tabId, { action: 'DEACTIVATE_APP' });
}

(function(){
    chrome.browserAction.onClicked.addListener((tab) => {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            toggleActivationMessage(tabs[0].id);
        });
    });

    chrome.contextMenus.create({
        id: ACTIVATE_MENU_ID,
        title: 'Enable',
        contexts: ['all'],
        type: 'normal',
        documentUrlPatterns: ["*://*/*"],
        onclick: function(info, tab) {
              if (info.menuItemId !== ACTIVATE_MENU_ID) {
                return;
              }
              sendActivationMessage(tab.id);
            }
    });

    chrome.contextMenus.create({
        id: DEACTIVATE_MENU_ID,
        title: 'Disable',
        contexts: ['all'],
        type: 'normal',
        documentUrlPatterns: ["*://*/*"],
        onclick: function(info, tab) {
              if (info.menuItemId !== DEACTIVATE_MENU_ID) {
                return;
              }
              sendDeactivationMessage(tab.id);
            }
    });
})()


