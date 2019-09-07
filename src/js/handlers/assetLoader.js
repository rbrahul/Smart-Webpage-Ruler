import $ from 'jquery';
import {CSSFilses} from '../constants/assetList';

export const includeCSS = () => {
    CSSFilses.forEach((file) => {
        const styleElement = `<link href="${chrome.extension.getURL(file)}" data="rb-zeplin-link" rel="stylesheet" type="text/css"/>`
        $("head").append(styleElement);
    });
}

export const removeCSS = () => {
    $('link[data="rb-zeplin-link"]').remove();
}
