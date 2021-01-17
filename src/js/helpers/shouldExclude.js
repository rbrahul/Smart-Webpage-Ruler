import { AVOIDALBE_ELEMENT_CALSSES } from '../constants/common';

export default (elementClassList = []) =>
    Array.from(elementClassList).some((className) =>
        AVOIDALBE_ELEMENT_CALSSES.includes(className),
    );
