import $ from 'jquery';

export const drawRuller = (measures) => {
    Object.entries(measures).forEach(([direction, style]) => {
        const ruller = $(`<div class="rb-zeplin-ruller rb-zeplin-ruller-${direction}"></div>`);
        ruller.css(style);
        $('body').append(ruller);
    });
};

export const clearRuller = () => {
    $('.rb-zeplin-ruller').remove();
};


export const drawDistanceLine = ({vertical: {
    position,
    distance: heightOfVerticalGuide
}, horizontal: {
    position: horizontalGuidePosition,
    distance: widthOfHorizontalGuide
}}) => {
        const veriticalLine = $(`<div class="rb-zeplin-distance-line rb-zeplin-distance-line-vertical"></div>`);
        const horizontalLine = $(`<div class="rb-zeplin-distance-line rb-zeplin-distance-line-horizontal"></div>`);
        veriticalLine.css({
            ...position,
            height: heightOfVerticalGuide
        });
        horizontalLine.css({
            ...horizontalGuidePosition,
            width: widthOfHorizontalGuide
        });
        if (heightOfVerticalGuide < 15) {
            veriticalLine.addClass('rb-zeplin-no-arrow');
        } else {
            veriticalLine.append(`<span class="rb-zeplin-guide-distance rb-zeplin-guide-distance-vertical">${Math.abs(parseInt(heightOfVerticalGuide)) - 1}px</span>`);
        }
        if (widthOfHorizontalGuide < 15) {
            horizontalLine.addClass('rb-zeplin-no-arrow');
        } else {
            horizontalLine.append(`<span class="rb-zeplin-guide-distance rb-zeplin-guide-distance-horizontal">${Math.abs(parseInt(widthOfHorizontalGuide)) - 1}px</span>`);
        }
        $('body').append(veriticalLine);
        $('body').append(horizontalLine);
};


export const clearDistanceLine = () => {
    $('.rb-zeplin-distance-line').remove();
};
