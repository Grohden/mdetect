import {UAgent, mobile} from "../commons.constants";

const deviceAndroid = "android";
const deviceHtcFlyer = "htc_flyer"; //HTC Flyer
const deviceGoogleTV = "googletv";

/**
 * @function DetectGoogleTV
 * @description
 * Detects if the current device is a GoogleTV.
 * @return {boolean}
 */
function DetectGoogleTV() {
    "use strict";
    
    return UAgent.search(deviceGoogleTV) > -1;
}

/**
 * @function DetectAndroid
 * @description
 * Detects *any* Android OS-based device: phone, tablet, and multi-media player.
 * Also detects Google TV.
 * @return {boolean}
 */
function DetectAndroid() {
    "use strict";
    
    if ((UAgent.search(deviceAndroid) > -1) || DetectGoogleTV()) {
        return true;
    }
    //Special check for the HTC Flyer 7" tablet. It should report here.
    return UAgent.search(deviceHtcFlyer) > -1;
}


/**
 * @function DetectAndroidWebKit
 * @description
 * Detects if the current device is an Android OS-based device and
 * the browser is based on WebKit.
 * @return {boolean}
 */
function DetectAndroidWebKit() {
    "use strict";
    return DetectAndroid() && DetectWebkit();
}

/**
 * @function DetectAndroidPhone
 * @description
 * Detects if the current device is a (small-ish) Android OS-based device
 * used for calling and/or multi-media (like a Samsung Galaxy Player).
 * Google says these devices will have 'Android' AND 'mobile' in user agent.
 * Ignores tablets (Honeycomb and later).
 * @return {boolean}
 */
function DetectAndroidPhone() {
    "use strict";
    
    if (DetectAndroid() && (UAgent.search(mobile) > -1)) {
        return true;
    }
    //Special check for the HTC Flyer 7" tablet. It should report here.
    return UAgent.search(deviceHtcFlyer) > -1;
}

/**
 * @function DetectAndroidTablet
 * @description
 * Detects if the current device is a (self-reported) Android tablet.
 * Google says these devices will have 'Android' and NOT 'mobile' in their user agent.
 * @return {boolean}
 */
function DetectAndroidTablet() {
    //Special check for the HTC Flyer 7" tablet. It should NOT report here.
    if (UAgent.search(deviceHtcFlyer) > -1) {
        return false;
    }
    return DetectAndroid() && !(UAgent.search(mobile) > -1);
}


export {
    DetectAndroid,
    DetectGoogleTV,
    DetectAndroidWebKit,
    DetectAndroidPhone,
    DetectAndroidTablet
};