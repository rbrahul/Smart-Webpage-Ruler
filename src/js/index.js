import $ from 'jquery';

import { clickHandler, mouseEnterHanlder} from './handlers/listeners';
import { initalizeEventSubscription} from './handlers/messageHandler';
import {includeCSS, removeCSS} from './handlers/assetLoader';

import '../scss/main.scss';
import '../scss/page.scss';

window.selectedElementPosition = null;
window.focusedElementPosition = null;
window.focusedElement = null;
window.selectedElement = null;
window.RB_ZEPLIN_RULLER_ENABLED = false;


$(document).ready(() => {
    initalizeEventSubscription(() => {
        $('body').on('click', clickHandler)
        $('*').on('mouseenter', mouseEnterHanlder);
        includeCSS();
    }, () => {
        $('body').off('click', clickHandler)
        $('*').off('mouseenter', mouseEnterHanlder);
        removeCSS();
    });
});

