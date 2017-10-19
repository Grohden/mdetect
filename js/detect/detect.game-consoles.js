import {UAgent} from "../commons.constants";

const devicePlaystation = "playstation";
const deviceNintendoDs = "nitro";
const deviceNintendo = "nintendo";
const deviceWii = "wii";
const deviceXbox = "xbox";

/**
 * @function DetectSonyPlaystation
 * @description
 * Detects if the current device is a Sony Playstation.
 *
 * @return {boolean}
 */
function DetectSonyPlaystation() {
    return UAgent.search(devicePlaystation) > -1;
}

/**
 * @function DetectNintendo
 * @description
 * Detects if the current device is a Nintendo game device.
 *
 * @return {boolean}
 */
function DetectNintendo() {
    return UAgent.search(deviceNintendo) > -1 ||
        UAgent.search(deviceWii) > -1 ||
        UAgent.search(deviceNintendoDs) > -1;
}

/**
 * @function DetectXbox
 * @description
 * Detects if the current device is a Microsoft Xbox.
 *
 * @return {boolean}
 */
function DetectXbox() {
    return UAgent.search(deviceXbox) > -1;
}

/**
 * @function DetectGameConsole
 * @description
 * Detects if the current device is an Internet-capable game console.
 *
 * @return {boolean}
 */
function DetectGameConsole() {
    if (DetectSonyPlaystation()) {
        return true;
    }
    if (DetectNintendo()) {
        return true;
    }
    return DetectXbox();
}


export {
    DetectSonyPlaystation,
    DetectNintendo,
    DetectXbox,
    DetectGameConsole
};