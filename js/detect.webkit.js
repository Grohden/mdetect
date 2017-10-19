import {UAgent} from "./commons.constants";

const engineWebKit = "webkit";


/**
 * @function DetectWebkit
 * @description
 * Detects if the current browser is based on WebKit.
 *
 * @return {boolean}
 */
function DetectWebkit() {
    return UAgent.search(engineWebKit) > -1;
}



export {
    DetectWebkit,
    engineWebKit
};