//FIXME: find a better way to separate this functions, maybe its better to have one file for each of them.
import {UAgent} from "../commons.constants";
import {DetectWebkit} from "./detect.webkit";
import {DetectWebOSTablet} from "./detect.webos";

const deviceSymbian = "symbian";
const deviceS60 = "series60";
const deviceS70 = "series70";
const deviceS80 = "series80";
const deviceS90 = "series90";
const deviceXoom = "xoom"; //Motorola Xoom

const deviceNuvifone = "nuvifone"; //Garmin Nuvifone

const deviceKindle = "kindle"; //Amazon Kindle, eInk one.

//Initialize variables for mobile-specific content.
const vndwap = "vnd.wap";
const wml = "wml";

//Initialize variables for random devices and mobile browsers.
//Some of these may not support JavaScript
const deviceBrew = "brew";
const deviceDanger = "danger";
const deviceHiptop = "hiptop";

const deviceArchos = "archos";

const engineOpera = "opera"; //Popular browser


const mini = "mini";  //Some mobile browsers put 'mini' in their names.

//Use Maemo, Tablet, and Linux to test for Nokia's Internet Tablets.
const maemo = "maemo";
const linux = "linux";
const qtembedded = "qt embedded"; //for Sony Mylo and others
const mylocom2 = "com2"; //for Sony Mylo also


const manuSony = "sony";



//Disambiguation strings.
const disUpdate = "update"; //pda vs. update


/**
 * @function DetectS60OssBrowser
 * @description
 * Detects if the current browser is the Nokia S60 Open Source Browser.
 *
 * @return {boolean}
 */
function DetectS60OssBrowser() {
    if (DetectWebkit()) {
        return (UAgent.search(deviceS60) > -1 ||
            UAgent.search(deviceSymbian) > -1);
    }
    else {
        return false;
    }
}

/**
 * @function DetectSymbianOS
 * @description
 * Detects if the current device is any Symbian OS-based device,
 * including older S60, Series 70, Series 80, Series 90, and UIQ,
 * or other browsers running on these devices.
 *
 * @return {boolean}
 */
function DetectSymbianOS() {
    return UAgent.search(deviceSymbian) > -1 ||
        UAgent.search(deviceS60) > -1 ||
        UAgent.search(deviceS70) > -1 ||
        UAgent.search(deviceS80) > -1 ||
        UAgent.search(deviceS90) > -1;
}

/**
 * @function DetectGarminNuvifone
 * @description
 * Detects if the current browser is a Garmin Nuvifone.
 *
 * @return {boolean}
 */
function DetectGarminNuvifone() {
    return UAgent.search(deviceNuvifone) > -1;
}

/**
 * @function DetectArchos
 * @description
 * Detects if the current device is an Archos media player/Internet tablet.
 *
 * @return {boolean}
 */
function DetectArchos() {
    return UAgent.search(deviceArchos) > -1;
}

/**
 * @function DetectBrewDevice
 * @description
 * Detects whether the device is a Brew-powered device.
 *
 * @return {boolean}
 */
function DetectBrewDevice() {
    return UAgent.search(deviceBrew) > -1;
}

/**
 * @function DetectDangerHiptop
 * @description
 * Detects the Danger Hiptop device.
 *
 * @return {boolean}
 */
function DetectDangerHiptop() {
    return UAgent.search(deviceDanger) > -1 ||
        UAgent.search(deviceHiptop) > -1;
}

/**
 * @function DetectMaemoTablet
 * @description
 * Detects if the current device is on one of
 * the Maemo-based Nokia Internet Tablets.
 *
 * @return {boolean}
 */
function DetectMaemoTablet() {
    if (UAgent.search(maemo) > -1) {
        return true;
    }
    //For Nokia N810, must be Linux + Tablet, or else it could be something else.
    return (UAgent.search(linux) > -1)
        && (UAgent.search(deviceTablet) > -1)
        && !DetectWebOSTablet();
}

/**
 * @function DetectSonyMylo
 * @description
 * Detects if the current browser is a Sony Mylo device.
 *
 * @return {boolean}
 */
function DetectSonyMylo() {
    if (UAgent.search(manuSony) > -1) {
        return UAgent.search(qtembedded) > -1 ||
            UAgent.search(mylocom2) > -1;
    }
    else {
        return false;
    }
}

/**
 * @function DetectOperaMobile
 * @description
 * Detects if the current browser is Opera Mobile or Mini.
 *
 * @return {boolean}
 */
function DetectOperaMobile() {
    if (UAgent.search(engineOpera) > -1) {
        return UAgent.search(mini) > -1 ||
            UAgent.search(mobi) > -1;
    }
    else {
        return false;
    }
}



/**
 * @function DetectKindle
 * @description
 * Detects if the current device is a Kindle.
 *
 * @return {boolean}
 */
function DetectKindle() {
    return UAgent.search(deviceKindle) > -1;
}


export {
    DetectS60OssBrowser,
    DetectSymbianOS,
    DetectGarminNuvifone,
    DetectArchos,
    DetectBrewDevice,
    DetectDangerHiptop,
    DetectMaemoTablet,
    DetectSonyMylo,
    DetectOperaMobile,
    DetectKindle
};