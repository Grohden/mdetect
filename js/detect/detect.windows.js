import {UAgent} from "../commons.constants";

const deviceWinPhone7 = "windows phone os 7";
const deviceWinMob = "windows ce";
const deviceWindows = "windows";
const deviceIeMob = "iemobile";
const devicePpc = "ppc"; //Stands for PocketPC
const enginePie = "wm5 pie";  //An old Windows Mobile
const manuHtc = "htc"; //Popular Android and WinMo manufacturer

/**
 * @function DetectWindowsMobile
 * @description
 * Detects if the current browser is a Windows Mobile device.
 * Excludes Windows Phone 7 devices.
 * Focuses on Windows Mobile 6.xx and earlier.
 *
 * @return {boolean}
 */
function DetectWindowsMobile() {
    //Exclude new Windows Phone 7.
    if (DetectWindowsPhone7()) {
        return false;
    }
    //Most devices use 'Windows CE', but some report 'iemobile'
    //  and some older ones report as 'PIE' for Pocket IE.
    if (UAgent.search(deviceWinMob) > -1 ||
        UAgent.search(deviceIeMob) > -1 ||
        UAgent.search(enginePie) > -1) {
        return true;
    }
    //Test for Windows Mobile PPC but not old Macintosh PowerPC.
    if ((UAgent.search(devicePpc) > -1) && !(UAgent.search(deviceMacPpc) > -1)) {
        return true;
    }
    //Test for Windwos Mobile-based HTC devices.
    return UAgent.search(manuHtc) > -1 &&
        UAgent.search(deviceWindows) > -1;
}


/**
 * @function DetectWindowsPhone7
 * @description
 * Detects if the current browser is a
 * Windows Phone 7 device.
 *
 *
 * @return {boolean}
 */
function DetectWindowsPhone7() {
    return UAgent.search(deviceWinPhone7) > -1;
}


export {
    DetectWindowsMobile,
    DetectWindowsPhone7
};