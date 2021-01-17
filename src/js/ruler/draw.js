import $ from 'jquery';

export const drawRuller = (
    measures,
    { axis: { top, left }, width, height },
) => {
    const directionShouldHaveLabel = ['top', 'right'];
    const fullHeightDirection = ['left', 'right'];
    Object.entries(measures).forEach(([direction, style]) => {
        let label = '';
        let fullHeightStyle = '';
        if (fullHeightDirection.includes(direction)) {
            fullHeightStyle = `height:${$('body').height()}px`;
        }

        if (directionShouldHaveLabel.includes(direction)) {
            const measure =
                direction === 'top' ? Math.round(width) : Math.round(height);
            const style =
                direction === 'top'
                    ? `left:${left + width / 2 - 20}px; top:-32px;`
                    : `top:${top + height / 2 - 10}px; left: 7px;`;
            label = `<span class="rb-zeplin-ruler-label rb-zeplin-ruler-label-${direction}" style="${style}">${measure}px</span>`;
        }

        const ruller = $(
            `<div class="rb-zeplin-ruller rb-zeplin-ruller-${direction}" style="${fullHeightStyle}">
            ${label}
            </div>`,
        );
        ruller.css(style);
        $('body').append(ruller);
    });
};

export const clearRuller = () => {
    $('.rb-zeplin-ruller').remove();
};

export const clearRullerLabel = () => {
    $('.rb-zeplin-ruler-label').remove();
};

export const drawDistanceLine = ({
    vertical: { position, distance: heightOfVerticalGuide },
    horizontal: {
        position: horizontalGuidePosition,
        distance: widthOfHorizontalGuide,
    },
}) => {
    const veriticalLine = $(
        `<div class="rb-zeplin-distance-line rb-zeplin-distance-line-vertical"></div>`,
    );
    const horizontalLine = $(
        `<div class="rb-zeplin-distance-line rb-zeplin-distance-line-horizontal"></div>`,
    );
    veriticalLine.css({
        ...position,
        height: heightOfVerticalGuide,
    });
    horizontalLine.css({
        ...horizontalGuidePosition,
        width: widthOfHorizontalGuide,
    });
    if (heightOfVerticalGuide < 15) {
        veriticalLine.addClass('rb-zeplin-no-arrow');
    }
    if (heightOfVerticalGuide > 0) {
        veriticalLine.append(
            `<span class="rb-zeplin-guide-distance rb-zeplin-guide-distance-vertical">${Math.round(
                heightOfVerticalGuide,
            )}px</span>`,
        );
    }
    if (widthOfHorizontalGuide < 15) {
        horizontalLine.addClass('rb-zeplin-no-arrow');
    }

    if (widthOfHorizontalGuide > 0) {
        horizontalLine.append(
            `<span class="rb-zeplin-guide-distance rb-zeplin-guide-distance-horizontal">${Math.round(
                widthOfHorizontalGuide,
            )}px</span>`,
        );
    }

    $('body').append(veriticalLine);
    $('body').append(horizontalLine);
};

export const clearDistanceLine = () => {
    $('.rb-zeplin-distance-line').remove();
};

const mountShape = ({ top, left, width, height }, type = 'selected') => {
    if ($('.rb-smart-ruler-shape-' + type).length) {
        $('.rb-smart-ruler-shape-' + type).remove();
    }

    const topForLefRightLines = type === 'selected' ? top+2 : top;

    const leftLineStyle = `top:${topForLefRightLines}px;left:${left}px;height:${height}px;`;
    const topLineStyle = `top:${top}px;left:${left}px;width:${width}px;`;
    const rightLineStyle = `top:${topForLefRightLines}px;left:${
        left + width-1
    }px;height:${height}px;`;
    const bottomLineStyle = `top:${
        top + height-1
    }px;left:${left}px;width:${width}px;`;

    const shapeComponet = `
    <div class="rb-smart-ruler-shape-${type}">
    <div class="rb-smart-ruller-shape-line-top" style="${topLineStyle}"></div>
    <div class="rb-smart-ruller-shape-line-right" style="${rightLineStyle}"></div>
    <div class="rb-smart-ruller-shape-line-left" style="${leftLineStyle}"></div>
    <div class="rb-smart-ruller-shape-line-bottom" style="${bottomLineStyle}"></div>
    </div>
    `;
    $('body').append(shapeComponet);
};

export const drawShape = (element, type = 'selected') => {
    const { left, top } = $(element).offset();
    const width = $(element).outerWidth();
    const height = $(element).outerHeight();
    mountShape({ top, left, width, height }, type);
};
