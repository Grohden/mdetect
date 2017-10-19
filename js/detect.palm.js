import {UAgent} from "./commons.constants";

const devicePalm = "palm";
const deviceWebOS = "webos"; //For Palm's line of WebOS devices
const engineBlazer = "blazer"; //Old Palm browser
const engineXiino = "xiino";

/**
 * @function DetectPalmOS
 * @description
 * Detects if the current browser is on a PalmOS device.
 *
 * @return {boolean}
 */
function DetectPalmOS() {
    //Most devices nowadays report as 'Palm',
    //  but some older ones reported as Blazer or Xiino.
    if (UAgent.search(devicePalm) > -1 ||
        UAgent.search(engineBlazer) > -1 ||
        UAgent.search(engineXiino) > -1) {
        //Make sure it's not WebOS first
        return !DetectPalmWebOS();
    }
    else {
        return false;
    }
}

/**
 * @function DetectPalmWebOS
 * @description
 * Detects if the current browser is on a Palm device
 * running the new WebOS.
 *
 * @return {boolean}
 */
function DetectPalmWebOS() {
    return UAgent.search(deviceWebOS) > -1;
}

export {
    DetectPalmOS,
    DetectPalmWebOS
};