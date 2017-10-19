import {UAgent} from "./commons.constants";
import {DetectPalmWebOS} from "./detect.palm";

/**
 * @function DetectWebOSTablet
 * @description
 * Detects if the current browser is on an HP tablet running WebOS.
 *
 * @return {boolean}
 */
function DetectWebOSTablet() {
    return UAgent.search(deviceWebOShp) > -1 &&
        UAgent.search(deviceTablet) > -1;
}

export {
    DetectPalmWebOS,
    DetectWebOSTablet
};