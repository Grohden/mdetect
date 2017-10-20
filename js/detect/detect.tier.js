import {UAgent} from "../commons.constants";
import {DetectWebkit} from "./detect.webkit";
import {DetectWindowsMobile, DetectWindowsPhone7} from "./detect.windows";
import {DetectIpad, DetectIphoneOrIpod} from "./detect.apple";
import {DetectAndroidPhone, DetectAndroidTablet} from "./detect.google";
import {DetectBlackBerryHigh, DetectBlackBerryTablet, DetectBlackBerryTouch, DetectBlackBerryWebKit} from "./detect.blackberry";
import {DetectPalmWebOS} from "./detect.palm";
import {
    DetectGarminNuvifone,
    DetectMaemoTablet,
    DetectS60OssBrowser
} from "./detect.specifics";
import {DetectMobileLong, DetectMobileQuick} from "./detect.mobile";
import {DetectWebOSTablet} from "./detect.webos";

const engineTelecaQ = "teleca q"; //a modern feature phone browser

/**
 * @function DetectTierTablet
 * @description
 * The quick way to detect for a tier of devices.
 * This method detects for the new generation of
 * HTML 5 capable, larger screen tablets.
 * Includes iPad, Android (e.g., Xoom), BB Playbook, WebOS, etc.
 *
 * @return {boolean}
 */
function DetectTierTablet() {
    "use strict";
    
    return DetectIpad()
        || DetectAndroidTablet()
        || DetectBlackBerryTablet()
        || DetectWebOSTablet();
}

/**
 * @function DetectTierRichCss
 * @description
 * The quick way to detect for a tier of devices.
 * This method detects for devices which are likely to be
 * capable of viewing CSS content optimized for the iPhone,
 * but may not necessarily support JavaScript.
 *
 * @return {boolean}
 */
function DetectTierRichCss() {
    "use strict";
    
    if (DetectMobileQuick()) {
        if (DetectTierIphone()) {
            return false;
        }
        
        //The following devices are explicitly ok.
        if (DetectWebkit()) {
            return true;
        }
        if (DetectS60OssBrowser()) {
            return true;
        }
        
        //Note: 'High' BlackBerry devices ONLY
        if (DetectBlackBerryHigh()) {
            return true;
        }
        
        //WP7's IE-7-based browser isn't good enough for iPhone Tier.
        if (DetectWindowsPhone7()) {
            return true;
        }
        if (DetectWindowsMobile()) {
            return true;
        }
        
        return UAgent.search(engineTelecaQ) > -1;
    }
    else {
        return false;
    }
}

/**
 * @function DetectTierIphone
 * @description
 *The quick way to detect for a tier of devices.
 *  This method detects for devices which can
 *  display iPhone-optimized web content.
 *  Includes iPhone, iPod Touch, Android, WebOS, etc.
 *
 * @return {boolean}
 */
function DetectTierIphone() {
    "use strict";
    
    if (DetectIphoneOrIpod()) {
        return true;
    }
    if (DetectAndroidPhone()) {
        return true;
    }
    if (DetectBlackBerryWebKit() && DetectBlackBerryTouch()) {
        return true;
    }
    if (DetectPalmWebOS()) {
        return true;
    }
    if (DetectGarminNuvifone()) {
        return true;
    }
    return DetectMaemoTablet();
}

/**
 * @function DetectTierOtherPhones
 * @description
 * The quick way to detect for a tier of devices.
 * This method detects for all other types of phones,
 * but excludes the iPhone and RichCSS Tier devices.
 * NOTE: This method probably won't work due to poor
 *
 * @return {boolean}
 */
function DetectTierOtherPhones() {
    "use strict";
    
    if (DetectMobileLong()) {
        //Exclude devices in the other 2 categories
        return !(DetectTierIphone() || DetectTierRichCss());
    }
    else {
        return false;
    }
}

export {
    DetectTierTablet,
    DetectTierRichCss,
    DetectTierIphone,
    DetectTierOtherPhones
};