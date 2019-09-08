import {
    ACTIVATE_APP,
    DEACTIVATE_APP,
    TOGGLE_APP,
} from '../constants/messages';

export const initalizeEventSubscription = (onSubscribe, onUnSubscribe) => {
    chrome.runtime.onMessage.addListener((request) => {
        switch (request.action) {
            case TOGGLE_APP:
                if (!window.RB_ZEPLIN_RULLER_ENABLED) {
                    onSubscribe();
                    window.RB_ZEPLIN_RULLER_ENABLED = true;
                } else {
                    onUnSubscribe();
                    window.RB_ZEPLIN_RULLER_ENABLED = false;
                }
                break;
            case ACTIVATE_APP:
                onSubscribe();
                window.RB_ZEPLIN_RULLER_ENABLED = true;
                break;
            case DEACTIVATE_APP:
                onUnSubscribe();
                window.RB_ZEPLIN_RULLER_ENABLED = false;
                break;
        }
    });
};
