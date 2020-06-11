const ACTIVATE_MENU_ID = 'ACTIVATE';
const DEACTIVATE_MENU_ID = 'DEACTIVATE';

const INACTIVE = '#8B8B8B';
const ACTIVE = '#21AF0D';

let SELECTED_TAB_ID = null;

let counter = 0;

function setBadge(text, color) {
    chrome.browserAction.setBadgeText({text});
    chrome.browserAction.setBadgeBackgroundColor({color});
}

function showEnabled() {
    setBadge('On', ACTIVE);
}

function showDisabled() {
    setBadge('Off', INACTIVE);
}

function sendActivationMessage(tabId) {
    chrome.tabs.sendMessage(tabId, { action: 'ACTIVATE_APP' });
    showEnabled();
}

function toggleActivationMessage(tabId, cb) {
    chrome.tabs.sendMessage(tabId, { action: 'TOGGLE_APP' }, () => {
        cb();
    });
}

function sendDeactivationMessage(tabId) {
    chrome.tabs.sendMessage(tabId, { action: 'DEACTIVATE_APP' });
    showDisabled();
}


function getRulerActivationStatus(tabId,cb) {
    chrome.tabs.executeScript(
        tabId,
        {
          code: "!!window.RB_ZEPLIN_RULLER_ENABLED"
        },
        result => cb(result)
      );
}

function hanldeTabChange(tabId) {
    getRulerActivationStatus(tabId, (result) => {
        if(!result) {
            showDisabled();
            return;
        }
        if(result[0]) {
            showEnabled();
        } else {
            showDisabled();
        }
    });
}

(function () {
    chrome.browserAction.onClicked.addListener((tab) => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (
            tabs,
        ) {
            toggleActivationMessage(tabs[0].id, hanldeTabChange.bind(null, tabs[0].id));
        });
    });

    chrome.contextMenus.create({
        id: ACTIVATE_MENU_ID,
        title: 'Enable',
        contexts: ['all'],
        type: 'normal',
        documentUrlPatterns: ['*://*/*'],
        onclick: function (info, tab) {
            if (info.menuItemId !== ACTIVATE_MENU_ID) {
                return;
            }
            sendActivationMessage(tab.id);
        },
    });

    chrome.contextMenus.create({
        id: DEACTIVATE_MENU_ID,
        title: 'Disable',
        contexts: ['all'],
        type: 'normal',
        documentUrlPatterns: ['*://*/*'],
        onclick: function (info, tab) {
            if (info.menuItemId !== DEACTIVATE_MENU_ID) {
                return;
            }
            sendDeactivationMessage(tab.id);
        },
    });


    chrome.tabs.onActivated.addListener(tab => {
        SELECTED_TAB_ID = tab.id;
        hanldeTabChange(SELECTED_TAB_ID)
      });

      chrome.tabs.onUpdated.addListener(tab => {
        SELECTED_TAB_ID = tab.id;
        hanldeTabChange(SELECTED_TAB_ID);
      });
})();
