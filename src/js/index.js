import $ from 'jquery';

import {
    drawRuller,
    clearRuller,
    drawDistanceLine,
    clearDistanceLine,
} from './ruler/draw';
import {
    getAbsoluteDistance,
    getRullerPosition,
    getRelativeDistance,
    getCentralPostion,
} from './ruler/measure';
import '../scss/main.scss';
import '../scss/page.scss';

$(document).ready(() => {
    let selectedElementPosition, focusedElementPosition;
    let focusedElement, selectedElement;
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
    $('body').click((event) => {
        const { target: element } = event;
        event.preventDefault();
        event.stopPropagation();
        if ($('.rb-zeplin-selected').length) {
            $('.rb-zeplin-selected').removeClass('rb-zeplin-selected');
        }

        if ($('.rb-zeplin-focused').length) {
            $('.rb-zeplin-focused').removeClass('rb-focused');
        }

        selectedElement = element;
        $(element).addClass('rb-zeplin-selected');
        clearRuller();
        clearDistanceLine();
        selectedElementPosition = getMeasuresOfElement(element);
        focusedElementPosition = null;
        const rullerStyles = getRullerPosition(selectedElementPosition);
        drawRuller(rullerStyles);
    });

    $('*').mouseenter((e) => {
        e.preventDefault();
        e.stopPropagation();
        const node = e.currentTarget;
        if ($(node).hasClass('rb-zeplin-selected')) {
            return;
        }
        if ($('.rb-zeplin-focused').length) {
            $('.rb-zeplin-focused').removeClass('rb-zeplin-focused');
        }

        focusedElement = node;
        focusedElementPosition = getMeasuresOfElement(node);
        $(node).addClass('rb-zeplin-focused');
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
    });
});
