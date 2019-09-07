import $ from 'jquery';

import {
    drawRuller,
    clearRuller,
    clearRullerLabel,
    drawDistanceLine,
    clearDistanceLine,
} from '../ruler/draw';

import {
    getAbsoluteDistance,
    getRullerPosition,
    getRelativeDistance,
} from '../ruler/measure';


function getMeasuresOfElement(element) {
    var axis = $(element).offset();
    var width = $(element).innerWidth();
    var height = $(element).innerHeight();
    return {
        axis,
        width,
        height,
    };
}


export const clickHandler = (event) => {
    const { target: element } = event;
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
    return false;
};

export const mouseEnterHanlder= (e) => {
    e.preventDefault();
    e.stopPropagation();
    clearRullerLabel();

    const node = e.target;
    if ($(node).hasClass('rb-zeplin-selected')) {
        return;
    }
    if ($('.rb-zeplin-focused').length) {
        $('.rb-zeplin-focused').removeClass('rb-zeplin-focused');
    }


    focusedElement = node;
    focusedElementPosition = getMeasuresOfElement(node);
    if(!$(node).is(selectedElement)) {
        $(node).addClass('rb-zeplin-focused');
    }
    clearDistanceLine();

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
}
