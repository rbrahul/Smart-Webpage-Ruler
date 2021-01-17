import $ from 'jquery';

import {
    drawRuller,
    clearRuller,
    clearRullerLabel,
    drawDistanceLine,
    clearDistanceLine,
    drawShape,
} from '../ruler/draw';

import {
    getAbsoluteDistance,
    getRullerPosition,
    getRelativeDistance,
} from '../ruler/measure';

import shouldExclude from '../helpers/shouldExclude';

function getMeasuresOfElement(element) {
    var axis = $(element).offset();
    var width = $(element).outerWidth();
    var height = $(element).outerHeight();
    return {
        axis,
        width,
        height,
    };
}

const SHAPE_LINE_CLASSES = [];

export const clickHandler = (event) => {
    const { target: element } = event;
    if (shouldExclude(element.classList)) return;

    event.preventDefault();
    event.stopPropagation();
    if ($('.rb-zeplin-selected').length) {
        $('.rb-zeplin-selected').removeClass('rb-zeplin-selected');
    }

    if ($('.rb-zeplin-focused').length) {
        $('.rb-zeplin-focused').removeClass('rb-zeplin-focused');
    }

    selectedElement = element;
    $(element).addClass('rb-zeplin-selected');
    clearRuller();
    clearDistanceLine();
    selectedElementPosition = getMeasuresOfElement(element);
    focusedElementPosition = null;
    const rullerStyles = getRullerPosition(selectedElementPosition);
    drawRuller(rullerStyles, selectedElementPosition);
    drawShape(element);
    return false;
};

export const mouseEnterHanlder = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const node = e.target;
    if (shouldExclude(node.classList)) return;

    clearRullerLabel();
    if ($(node).hasClass('rb-zeplin-selected')) {
        return;
    }
    if ($('.rb-zeplin-focused').length) {
        $('.rb-zeplin-focused').removeClass('rb-zeplin-focused');
    }

    focusedElement = node;
    focusedElementPosition = getMeasuresOfElement(node);
    if (!$(node).is(selectedElement)) {
        $(node).addClass('rb-zeplin-focused');
    }
    clearDistanceLine();
    drawShape(focusedElement, 'focused');

    let distanceOfElements;
    if (
        selectedElement &&
        focusedElement &&
        ($(selectedElement).has(focusedElement).length ||
            $(focusedElement).has(selectedElement).length)
    ) {
        let targetElement, sourceElement;
        if ($(selectedElement).has(focusedElement).length) {
            targetElement = focusedElement;
            sourceElement = selectedElement;
        } else {
            targetElement = selectedElement;
            sourceElement = focusedElement;
        }
        distanceOfElements = getAbsoluteDistance(
            getMeasuresOfElement(targetElement),
            getMeasuresOfElement(sourceElement),
        );
        drawDistanceLine(distanceOfElements);
    } else {
        if (focusedElementPosition && selectedElementPosition) {
            distanceOfElements = getRelativeDistance(
                focusedElementPosition,
                selectedElementPosition,
            );
            drawDistanceLine(distanceOfElements);
        }
    }
    return false;
};
