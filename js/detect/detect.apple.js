import {UAgent} from "../commons.constants";
import {DetectWebkit} from "./detect.webkit";


//TODO: review if this should be in a separated file.
//Initialize some initial string variables we'll look for later.
const deviceIphone = "iphone";
const deviceIpod = "ipod";
const deviceIpad = "ipad";
const deviceMacPpc = "macintosh"; //Used for disambiguation

/**
 * @function DetectIphone
 * @description Detects if the current device is an iPhone.
 * @return {boolean}
 */
function DetectIphone() {
    if (UAgent.search(deviceIphone) > -1) {
        //The iPad and iPod Touch say they're an iPhone! So let's disambiguate.
        return !(DetectIpad() || DetectIpod());
    }
    else {
        return false;
    }
}

/**
 * @function DetectIpod
 * @description Detects if the current device is an iPod Touch.
 * @return {boolean}
 */
function DetectIpod() {
    return UAgent.search(deviceIpod) > -1;
}

/**
 * @function DetectIpad
 * @description Detects if the current device is an iPad tablet.
 * @return {boolean}
 */
function DetectIpad() {
    return UAgent.search(deviceIpad) > -1 && DetectWebkit();
}

/**
 * @function DetectIphoneOrIpod
 * @description Detects if the current device is an iPhone or iPod Touch.
 * @return {boolean}
 */
function DetectIphoneOrIpod() {
    //We repeat the searches here because some iPods
    //  may report themselves as an iPhone, which is ok.
    return UAgent.search(deviceIphone) > -1 || UAgent.search(deviceIpod)
        > -1;
}

/**
 * @function DetectIos
 * @description Detects *any* iOS device: iPhone, iPod Touch, iPad.
 * @return {boolean}
 */
function DetectIos() {
    return DetectIphoneOrIpod() || DetectIpad();
}

export {
    DetectIos,
    DetectIphone,
    DetectIpod,
    DetectIpad,
    DetectIphoneOrIpod
};