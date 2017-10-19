/* *******************************************
// Copyright 2010-2011, Anthony Hand
//
// File version date: July 15, 2011
//		Update:
//		- Refactored the variable called maemoTablet. Its new name is the more generic deviceTablet.
//		- Created the variable deviceWebOShp for HP's line of WebOS devices starting with the TouchPad tablet.
//		- Created the DetectWebOSTablet() method for HP's line of WebOS tablets starting with the TouchPad tablet.
//		- Updated the DetectTierTablet() method to also search for WebOS tablets.
//		- Updated the DetectMaemoTablet() method to disambiguate against WebOS tablets which share some signature traits.
//
// File version date: June 04, 2011
//		Update:
//		- Updated DetectTierIphone() for a BlackBerry issue. Now it checks for both BB WebKit *and* BB Touch.
//		- Updated DetectBlackBerryLow() to ensure that WebKit browsers aren't included here.
//
//
// LICENSE INFORMATION
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//        http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
// either express or implied. See the License for the specific
// language governing permissions and limitations under the License.
//
//
// ABOUT THIS PROJECT
//   Project Owner: Anthony Hand
//   Email: anthony.hand@gmail.com
//   Web Site: http://www.mobileesp.com
//   Source Files: http://code.google.com/p/mobileesp/
//
//   Versions of this code are available for:
//      PHP, JavaScript, Java, ASP.NET (C#), and Ruby
//
//
// WARNING:
//   These JavaScript-based device detection features may ONLY work
//   for the newest generation of smartphones, such as the iPhone,
//   Android and Palm WebOS devices.
//   These device detection features may NOT work for older smartphones
//   which had poor support for JavaScript, including
//   older BlackBerry, PalmOS, and Windows Mobile devices.
//   Additionally, because JavaScript support is extremely poor among
//   'feature phones', these features may not work at all on such devices.
//   For better results, consider using a server-based version of this code,
//   such as Java, APS.NET, PHP, or Ruby.
//
// *******************************************
*/

import {UAgent} from "./commons.constants";

function MDetect() {
    "use strict";
    
    
    //Initialize some initial string variables we'll look for later.
    

    const deviceXoom = "xoom"; //Motorola Xoom
    
    const deviceNuvifone = "nuvifone"; //Garmin Nuvifone
    
    const deviceSymbian = "symbian";
    const deviceS60 = "series60";
    const deviceS70 = "series70";
    const deviceS80 = "series80";
    const deviceS90 = "series90";
    

    
    const deviceWebOShp = "hpwos"; //For HP's line of WebOS devices
    
    
    const deviceKindle = "kindle"; //Amazon Kindle, eInk one.
    
    //Initialize variables for mobile-specific content.
    const vndwap = "vnd.wap";
    const wml = "wml";
    
    //Initialize variables for random devices and mobile browsers.
    //Some of these may not support JavaScript
    const deviceTablet = "tablet"; //Generic term for slate and tablet devices
    const deviceBrew = "brew";
    const deviceDanger = "danger";
    const deviceHiptop = "hiptop";
    const devicePlaystation = "playstation";
    const deviceNintendoDs = "nitro";
    const deviceNintendo = "nintendo";
    const deviceWii = "wii";
    const deviceXbox = "xbox";
    const deviceArchos = "archos";
    
    const engineOpera = "opera"; //Popular browser
    const engineNetfront = "netfront"; //Common embedded OS browser
    const engineUpBrowser = "up.browser"; //common on some phones
    const engineOpenWeb = "openweb"; //Transcoding by OpenWave server
    const deviceMidp = "midp"; //a mobile Java technology
    const uplink = "up.link";
    
    const devicePda = "pda";
    const mini = "mini";  //Some mobile browsers put 'mini' in their names.
    
    //Use Maemo, Tablet, and Linux to test for Nokia's Internet Tablets.
    const maemo = "maemo";
    const linux = "linux";
    const qtembedded = "qt embedded"; //for Sony Mylo and others
    const mylocom2 = "com2"; //for Sony Mylo also
    
    //In some UserAgents, the only clue is the manufacturer.
    const manuSonyEricsson = "sonyericsson";
    const manuericsson = "ericsson";
    const manuSamsung1 = "sec-sgh";
    const manuSony = "sony";
    const manuHtc = "htc"; //Popular Android and WinMo manufacturer
    
    //In some UserAgents, the only clue is the operator.
    const svcDocomo = "docomo";
    const svcKddi = "kddi";
    const svcVodafone = "vodafone";
    
    //Disambiguation strings.
    const disUpdate = "update"; //pda vs. update
    
    return {
 
        /**
         * @function DetectS60OssBrowser
         * @description
         * Detects if the current browser is the Nokia S60 Open Source Browser.
         *
         * @return {boolean}
         */
        DetectS60OssBrowser() {
            if (DetectWebkit()) {
                return (UAgent.search(deviceS60) > -1 ||
                    UAgent.search(deviceSymbian) > -1);
            }
            else {
                return false;
            }
        },
        
        /**
         * @function DetectSymbianOS
         * @description
         * Detects if the current device is any Symbian OS-based device,
         * including older S60, Series 70, Series 80, Series 90, and UIQ,
         * or other browsers running on these devices.
         *
         * @return {boolean}
         */
        DetectSymbianOS() {
            return UAgent.search(deviceSymbian) > -1 ||
                UAgent.search(deviceS60) > -1 ||
                UAgent.search(deviceS70) > -1 ||
                UAgent.search(deviceS80) > -1 ||
                UAgent.search(deviceS90) > -1;
        },
        
        
        
        
        
        /**
         * @function DetectGarminNuvifone
         * @description
         * Detects if the current browser is a Garmin Nuvifone.
         *
         * @return {boolean}
         */
        DetectGarminNuvifone() {
            return UAgent.search(deviceNuvifone) > -1;
        },
        
        
        
        /**
         * @function DetectArchos
         * @description
         * Detects if the current device is an Archos media player/Internet tablet.
         *
         * @return {boolean}
         */
        DetectArchos() {
            return UAgent.search(deviceArchos) > -1;
        },
        
        /**
         * @function DetectBrewDevice
         * @description
         * Detects whether the device is a Brew-powered device.
         *
         * @return {boolean}
         */
        DetectBrewDevice() {
            return UAgent.search(deviceBrew) > -1;
        },
        
        /**
         * @function DetectDangerHiptop
         * @description
         * Detects the Danger Hiptop device.
         *
         * @return {boolean}
         */
        DetectDangerHiptop() {
            return UAgent.search(deviceDanger) > -1 ||
                UAgent.search(deviceHiptop) > -1;
        },
        
        /**
         * @function DetectMaemoTablet
         * @description
         * Detects if the current device is on one of
         * the Maemo-based Nokia Internet Tablets.
         *
         * @return {boolean}
         */
        DetectMaemoTablet() {
            if (UAgent.search(maemo) > -1) {
                return true;
            }
            //For Nokia N810, must be Linux + Tablet, or else it could be something else.
            return (UAgent.search(linux) > -1)
                && (UAgent.search(deviceTablet) > -1)
                && !DetectWebOSTablet();
        },
        
        /**
         * @function DetectSonyMylo
         * @description
         * Detects if the current browser is a Sony Mylo device.
         *
         * @return {boolean}
         */
        DetectSonyMylo() {
            if (UAgent.search(manuSony) > -1) {
                return UAgent.search(qtembedded) > -1 ||
                    UAgent.search(mylocom2) > -1;
            }
            else {
                return false;
            }
        },
        
        /**
         * @function DetectOperaMobile
         * @description
         * Detects if the current browser is Opera Mobile or Mini.
         *
         * @return {boolean}
         */
        DetectOperaMobile() {
            if (UAgent.search(engineOpera) > -1) {
                return UAgent.search(mini) > -1 ||
                    UAgent.search(mobi) > -1;
            }
            else {
                return false;
            }
        },
        
        /**
         * @function DetectSonyPlaystation
         * @description
         * Detects if the current device is a Sony Playstation.
         *
         * @return {boolean}
         */
        DetectSonyPlaystation() {
            return UAgent.search(devicePlaystation) > -1;
        },
        
        /**
         * @function DetectNintendo
         * @description
         * Detects if the current device is a Nintendo game device.
         *
         * @return {boolean}
         */
        DetectNintendo() {
            return UAgent.search(deviceNintendo) > -1 ||
                UAgent.search(deviceWii) > -1 ||
                UAgent.search(deviceNintendoDs) > -1;
        },
        
        /**
         * @function DetectXbox
         * @description
         * Detects if the current device is a Microsoft Xbox.
         *
         * @return {boolean}
         */
        DetectXbox() {
            return UAgent.search(deviceXbox) > -1;
        },
        
        /**
         * @function DetectGameConsole
         * @description
         * Detects if the current device is an Internet-capable game console.
         *
         * @return {boolean}
         */
        DetectGameConsole() {
            if (DetectSonyPlaystation()) {
                return true;
            }
            if (DetectNintendo()) {
                return true;
            }
            return DetectXbox();
        },
        
        /**
         * @function DetectKindle
         * @description
         * Detects if the current device is a Kindle.
         *
         * @return {boolean}
         */
        DetectKindle() {
            return UAgent.search(deviceKindle) > -1;
        },
        
        
        
        
        
        //*****************************
        // For Mobile Web Site Design
        //*****************************

        
        
        
        
        
    
    
        //Optional: Store values for quickly accessing same info multiple times.
        //Note: These values are not set automatically.
        
        //-- We'll use these 4 variables to speed other processing. They're super common.
        
        //Stores whether the device is an iPhone or iPod Touch.
        isIphone : () => DetectIphoneOrIpod(),
        
        //Stores whether the device is an Android phone or multi-media player.
        isAndroidPhone : () =>  DetectAndroidPhone(),
        
        //Stores whether is the Tablet (HTML5-capable, larger screen) tier of devices.
        isTierIphone : () =>  DetectTierIphone(),
        
        //Stores whether is the iPhone tier of devices.
        isTierTablet : () =>  DetectTierTablet(),
        
        //-- Optional: Comment these out if you don't need them.
        
        //Stores whether the device can probably support Rich CSS, but JavaScript support is not assumed. (e.g., newer BlackBerry, Windows Mobile)
        isTierRichCss : () =>  DetectTierRichCss(),
        
        //Stores whether it is another mobile device, which cannot be assumed to support CSS or JS (eg, older BlackBerry, RAZR)
        isTierGenericMobile : () => DetectTierOtherPhones()
    };
}

//Temp solution, need to add webpack for browser support.
if(typeof module !== "undefined" && module.exports){
    module.exports = MDetect();
} else {
    MobileEsp = MDetect();
}
