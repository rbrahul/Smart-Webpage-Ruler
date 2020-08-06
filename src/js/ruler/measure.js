export const getRullerPosition = ({
    axis: { top: topOffset, left: leftOffset },
    width,
    height,
}) => {
    const left = {
        left: `${leftOffset}px`,
        top: 0,
    };
    const right = {
        left: `${leftOffset + width-1}px`,
        top: 0,
    };
    const top = {
        left: 0,
        top: `${topOffset}px`,
    };

    const bottom = {
        left: 0,
        top: `${topOffset + height-1}px`,
    };

    return {
        left,
        right,
        top,
        bottom,
    };
};

export const getCentralPostion = ({ axis: { top, left }, width, height }) => {
    const horizontalCenterTop = {
        left: left + width / 2,
        top,
    };
    const horizontalCenterBottom = {
        left: left + width / 2,
        top: top + height,
    };
    const verticalCenterLeft = {
        left,
        top: top + height / 2,
    };

    const verticalCenterRight = {
        left: left + width,
        top: top + height / 2,
    };

    return {
        horizontalCenterTop,
        horizontalCenterBottom,
        verticalCenterLeft,
        verticalCenterRight,
    };
};

export const getRelativeDistance = (positionOfFocused, positionOfSelected) => {
    const {
        axis: {
            top: focusedElementsTopOffset,
            left: focusedElementsLeftOffset,
        },
        height: heightOfFocusedElement,
        width: widthOfFocusedElement,
    } = positionOfFocused;
    const {
        axis: {
            top: selectedElementsTopOffset,
            left: selectedElementsLeftOffset,
        },
        height: heightOfSelectedElement,
        width: widthOfSelectedElement,
    } = positionOfSelected;
    let verticalPosition,
        horizontalPosition,
        verticalDistance,
        horizontalDistance;

    if (focusedElementsTopOffset < selectedElementsTopOffset) {
        const { horizontalCenterBottom } = getCentralPostion(positionOfFocused);
        verticalDistance =
            selectedElementsTopOffset -
            (focusedElementsTopOffset + heightOfFocusedElement);
        verticalPosition = {
            position: horizontalCenterBottom,
            distance: verticalDistance,
        };
    } else {
        const {
            horizontalCenterTop: { top, left },
        } = getCentralPostion(positionOfFocused);
        verticalDistance =
            focusedElementsTopOffset -
            (selectedElementsTopOffset + heightOfSelectedElement);
        verticalPosition = {
            position: {
                top: top - verticalDistance,
                left,
            },
            distance: verticalDistance,
        };
    }

    if (focusedElementsLeftOffset < selectedElementsLeftOffset) {
        const { verticalCenterRight } = getCentralPostion(positionOfFocused);
        horizontalDistance =
            selectedElementsLeftOffset -
            (focusedElementsLeftOffset + widthOfFocusedElement);
        horizontalPosition = {
            position: verticalCenterRight,
            distance: horizontalDistance,
        };
    } else {
        const {
            verticalCenterLeft: { top, left },
        } = getCentralPostion(positionOfFocused);
        horizontalDistance =
            focusedElementsLeftOffset -
            (selectedElementsLeftOffset + widthOfSelectedElement);
        horizontalPosition = {
            position: {
                top,
                left: left - horizontalDistance,
            },
            distance: horizontalDistance,
        };
    }
    return {
        vertical: verticalPosition,
        horizontal: horizontalPosition,
    };
};

export const getAbsoluteDistance = (
    positionOfTargetElement,
    positionOfSourceElement,
) => {
    const {
        axis: { top: targetElementsTopOffset, left: targetElementsLeftOffset },
    } = positionOfTargetElement;
    const {
        axis: { top: sourceElementsTopOffset, left: sourceElementsLeftOffset },
    } = positionOfSourceElement;

    let vertical, horizontal;
    const {
        verticalCenterLeft: { top, left },
    } = getCentralPostion(positionOfTargetElement);
    const verticalDistance =
        targetElementsLeftOffset - sourceElementsLeftOffset;
    horizontal = {
        position: {
            top: top,
            left: left - verticalDistance,
        },
        distance: verticalDistance,
    };
    const {
        horizontalCenterTop: { top: topOffset, left: leftOffset },
    } = getCentralPostion(positionOfTargetElement);
    const horizontalDistance =
        targetElementsTopOffset - sourceElementsTopOffset;
    vertical = {
        position: {
            top: topOffset - horizontalDistance,
            left: leftOffset,
        },
        distance: horizontalDistance,
    };
    return {
        vertical,
        horizontal,
    };
};
