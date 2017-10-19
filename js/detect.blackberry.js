import {UAgent} from "./commons.constants";

const deviceBB = "blackberry";
const vndRIM = "vnd.rim"; //Detectable when BB devices emulate IE or Firefox
const deviceBBStorm = "blackberry95"; //Storm 1 and 2
const deviceBBBold = "blackberry97"; //Bold
const deviceBBTour = "blackberry96"; //Tour
const deviceBBCurve = "blackberry89"; //Curve 2
const deviceBBTorch = "blackberry 98"; //Torch
const deviceBBPlaybook = "playbook"; //PlayBook tablet

/**
 * @function DetectBlackBerry
 * @description
 * Detects if the current browser is a BlackBerry of some sort.
 * Includes the PlayBook.
 *
 * @return {boolean}
 */
function DetectBlackBerry() {
    if (UAgent.search(deviceBB) > -1) {
        return true;
    }
    return UAgent.search(vndRIM) > -1;
}

/**
 * @function DetectBlackBerryTablet
 * @description
 * Detects if the current browser is on a BlackBerry tablet device.
 *    Example: PlayBook
 *
 * @return {boolean}
 */
function DetectBlackBerryTablet() {
    return UAgent.search(deviceBBPlaybook) > -1;
}


/**
 * @function DetectBlackBerryWebKit
 * @description
 * Detects if the current browser is a BlackBerry device AND uses a
 * WebKit-based browser. These are signatures for the new BlackBerry OS 6.
 * Examples: Torch. Includes the Playbook.
 *
 * @return {boolean}
 */
function DetectBlackBerryWebKit() {
    return DetectBlackBerry() && UAgent.search(engineWebKit) > -1;
}

/**
 * @function DetectBlackBerryTouch
 * @description
 * Detects if the current browser is a BlackBerry Touch
 * device, such as the Storm or Torch. Excludes the Playbook.
 *
 * @return {boolean}
 */
function DetectBlackBerryTouch() {
    return DetectBlackBerry() && ((UAgent.search(deviceBBStorm) > -1) || (UAgent.search(deviceBBTorch) > -1));
}

/**
 * @function DetectBlackBerryHigh
 * @description
 * Detects if the current browser is a BlackBerry OS 5 device AND
 *    has a more capable recent browser. Excludes the Playbook.
 *    Examples, Storm, Bold, Tour, Curve2
 *
 * @return {boolean}
 */
function DetectBlackBerryHigh() {
    //Disambiguate for BlackBerry OS 6 (WebKit) browser
    if (DetectBlackBerryWebKit()) {
        return false;
    }
    if (DetectBlackBerry()) {
        return DetectBlackBerryTouch() ||
            UAgent.search(deviceBBBold) > -1 ||
            UAgent.search(deviceBBTour) > -1 ||
            UAgent.search(deviceBBCurve) > -1;
    }
    else {
        return false;
    }
}

/**
 * @function DetectBlackBerryLow
 * @description
 * Detects if the current browser is a BlackBerry device AND
 *    has an older, less capable browser.
 *    Examples: Pearl, 8800, Curve1.
 *
 * @return {boolean}
 */
function DetectBlackBerryLow() {
    if (DetectBlackBerry()) {
        //Assume that if it's not in the High tier or has WebKit, then it's Low.
        return !(DetectBlackBerryHigh() || DetectBlackBerryWebKit());
    }
    else {
        return false;
    }
}

export {
    DetectBlackBerry,
    DetectBlackBerryTablet,
    DetectBlackBerryWebKit,
    DetectBlackBerryTouch,
    DetectBlackBerryHigh
};