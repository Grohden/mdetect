import {mobile, UAgent} from "../commons.constants";
import {DetectWindowsMobile, DetectWindowsPhone7} from "./detect.windows";
import {DetectIphoneOrIpod} from "./detect.apple";
import {DetectAndroidPhone} from "./detect.google";
import {DetectBlackBerry} from "./detect.blackberry";
import {DetectPalmOS, DetectPalmWebOS} from "./detect.palm";
import {DetectTierTablet} from "./detect.tier";
import {
    DetectArchos,
    DetectBrewDevice,
    DetectDangerHiptop,
    DetectGarminNuvifone,
    DetectKindle,
    DetectMaemoTablet,
    DetectOperaMobile,
    DetectS60OssBrowser,
    DetectSonyMylo,
    DetectSymbianOS
} from "./detect.specifics";
import {DetectGameConsole} from "./detect.game-consoles";

const engineNetfront = "netfront"; //Common embedded OS browser
const engineUpBrowser = "up.browser"; //common on some phones
const engineOpenWeb = "openweb"; //Transcoding by OpenWave server
const deviceMidp = "midp"; //a mobile Java technology
const uplink = "up.link";
const devicePda = "pda";

//In some UserAgents, the only clue is the manufacturer.
const manuSonyEricsson = "sonyericsson";
const manuericsson = "ericsson";
const manuSamsung1 = "sec-sgh";

//In some UserAgents, the only clue is the operator.
const svcDocomo = "docomo";
const svcKddi = "kddi";
const svcVodafone = "vodafone";
/**
 * @function DetectSmartphone
 * @description
 * Check to see whether the device is a 'smartphone'.
 * You might wish to send smartphones to a more capable web page
 * than a dumbed down WAP page.
 *
 * @return {boolean}
 */
function DetectSmartphone() {
    "use strict";
    
    if (   DetectIphoneOrIpod()
        || DetectAndroidPhone()
        || DetectS60OssBrowser()
        || DetectSymbianOS()
        || DetectWindowsMobile()
        || DetectWindowsPhone7()
        || DetectBlackBerry()
        || DetectPalmWebOS()
        || DetectPalmOS()
        || DetectGarminNuvifone()) {
        return true;
    }
    
    //Otherwise, return false.
    return false;
}

/**
 * @function DetectMobileQuick
 * @description
 * Detects if the current device is a mobile device.
 * This method catches most of the popular modern devices.
 * Excludes Apple iPads and other modern tablets.
 *
 * @return {boolean}
 */
function DetectMobileQuick() {
    "use strict";
    
    //Let's exclude tablets.
    if (DetectTierTablet()) {
        return false;
    }
    
    //Most mobile browsing is done on smartphones
    if (DetectSmartphone()) {
        return true;
    }
    
    if (UAgent.search(deviceMidp) > -1 ||
        DetectBrewDevice()) {
        return true;
    }
    
    if (DetectOperaMobile()) {
        return true;
    }
    
    if (UAgent.search(engineNetfront) > -1) {
        return true;
    }
    if (UAgent.search(engineUpBrowser) > -1) {
        return true;
    }
    if (UAgent.search(engineOpenWeb) > -1) {
        return true;
    }
    
    if (DetectDangerHiptop()) {
        return true;
    }
    
    if (DetectMaemoTablet()) {
        return true;
    }
    if (DetectArchos()) {
        return true;
    }
    
    if ((UAgent.search(devicePda) > -1) && !(UAgent.search(disUpdate) > -1)) {
        return true;
    }
    if (UAgent.search(mobile) > -1) {
        return true;
    }
    
    return DetectKindle();
}

/**
 * @function DetectMobileLong
 * @description
 *  Detects in a more comprehensive way if the current device is a mobile device.
 *
 * @return {boolean}
 */
function DetectMobileLong() {
    "use strict";
    
    if (DetectMobileQuick()) {
        return true;
    }
    if (DetectGameConsole()) {
        return true;
    }
    if (DetectSonyMylo()) {
        return true;
    }
    
    //Detect for certain very old devices with stupid useragent strings.
    if (UAgent.search(manuSamsung1) > -1 ||
        UAgent.search(manuSonyEricsson) > -1 ||
        UAgent.search(manuericsson) > -1) {
        return true;
    }
    
    if (UAgent.search(svcDocomo) > -1) {
        return true;
    }
    if (UAgent.search(svcKddi) > -1) {
        return true;
    }
    return UAgent.search(svcVodafone) > -1;
}

export {
    DetectSmartphone,
    DetectMobileQuick,
    DetectMobileLong,
    
    //Export imported
    DetectWindowsPhone7,
    DetectWindowsMobile,
    DetectIphoneOrIpod,
    DetectAndroidPhone,
    DetectBlackBerry,
    DetectPalmOS,
    DetectPalmWebOS,
    DetectTierTablet,
    DetectArchos,
    DetectBrewDevice,
    DetectDangerHiptop,
    DetectGarminNuvifone,
    DetectKindle,
    DetectMaemoTablet,
    DetectOperaMobile,
    DetectS60OssBrowser,
    DetectSonyMylo,
    DetectSymbianOS,
    DetectGameConsole
};