import { ACTIVATE_APP } from '../constants/messages';


export const initalizeEventSubscription = (onSubscribe, onUnSubscribe) => {
    chrome.runtime.onMessage.addListener((request) => {
        console.log(request,window.RB_ZEPLIN_RULLER_ENABLED);
        if (request.action === ACTIVATE_APP) {
            if (!window.RB_ZEPLIN_RULLER_ENABLED) {
                onSubscribe();
                window.RB_ZEPLIN_RULLER_ENABLED = true;
            } else {
                onUnSubscribe();
                window.RB_ZEPLIN_RULLER_ENABLED = false;
            }
        }
    });
};
