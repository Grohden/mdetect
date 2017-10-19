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

function MDetect() {
    "use strict";
    
    
    //Initialize some initial string variables we'll look for later.
    const engineWebKit = "webkit";
    const deviceIphone = "iphone";
    const deviceIpod = "ipod";
    const deviceIpad = "ipad";
    const deviceMacPpc = "macintosh"; //Used for disambiguation
    
    const deviceAndroid = "android";
    const deviceGoogleTV = "googletv";
    const deviceXoom = "xoom"; //Motorola Xoom
    const deviceHtcFlyer = "htc_flyer"; //HTC Flyer
    
    const deviceNuvifone = "nuvifone"; //Garmin Nuvifone
    
    const deviceSymbian = "symbian";
    const deviceS60 = "series60";
    const deviceS70 = "series70";
    const deviceS80 = "series80";
    const deviceS90 = "series90";
    
    const deviceWinPhone7 = "windows phone os 7";
    const deviceWinMob = "windows ce";
    const deviceWindows = "windows";
    const deviceIeMob = "iemobile";
    const devicePpc = "ppc"; //Stands for PocketPC
    const enginePie = "wm5 pie";  //An old Windows Mobile
    
    const deviceBB = "blackberry";
    const vndRIM = "vnd.rim"; //Detectable when BB devices emulate IE or Firefox
    const deviceBBStorm = "blackberry95"; //Storm 1 and 2
    const deviceBBBold = "blackberry97"; //Bold
    const deviceBBTour = "blackberry96"; //Tour
    const deviceBBCurve = "blackberry89"; //Curve 2
    const deviceBBTorch = "blackberry 98"; //Torch
    const deviceBBPlaybook = "playbook"; //PlayBook tablet
    
    const devicePalm = "palm";
    const deviceWebOS = "webos"; //For Palm's line of WebOS devices
    const deviceWebOShp = "hpwos"; //For HP's line of WebOS devices
    
    const engineBlazer = "blazer"; //Old Palm browser
    const engineXiino = "xiino";
    
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
    const engineTelecaQ = 'teleca q'; //a modern feature phone browser
    
    const devicePda = "pda";
    const mini = "mini";  //Some mobile browsers put 'mini' in their names.
    const mobile = "mobile"; //Some mobile browsers put 'mobile' in their user agent strings.
    const mobi = "mobi"; //Some mobile browsers put 'mobi' in their user agent strings.
    
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
    
    //Initialize our user agent string.
    const uagent = navigator.userAgent.toLowerCase();
    
    return {
        /**
         * @function DetectIphone
         * @description Detects if the current device is an iPhone.
         * @return {boolean}
         */
        DetectIphone() {
            if (uagent.search(deviceIphone) > -1) {
                //The iPad and iPod Touch say they're an iPhone! So let's disambiguate.
                return !(DetectIpad() || DetectIpod());
            }
            else {
                return false;
            }
        },
        
        /**
         * @function DetectIpod
         * @description Detects if the current device is an iPod Touch.
         * @return {boolean}
         */
        DetectIpod() {
            return uagent.search(deviceIpod) > -1;
        },
        
        /**
         * @function DetectIpad
         * @description Detects if the current device is an iPad tablet.
         * @return {boolean}
         */
        DetectIpad() {
            return uagent.search(deviceIpad) > -1 && DetectWebkit();
        },
        
        /**
         * @function DetectIphoneOrIpod
         * @description Detects if the current device is an iPhone or iPod Touch.
         * @return {boolean}
         */
        DetectIphoneOrIpod() {
            //We repeat the searches here because some iPods
            //  may report themselves as an iPhone, which is ok.
            return uagent.search(deviceIphone) > -1 || uagent.search(deviceIpod)
                > -1;
        },
        
        /**
         * @function DetectIos
         * @description Detects *any* iOS device: iPhone, iPod Touch, iPad.
         * @return {boolean}
         */
        DetectIos() {
            return DetectIphoneOrIpod() || DetectIpad();
        },
        
        /**
         * @function DetectAndroid
         * @description
         * Detects *any* Android OS-based device: phone, tablet, and multi-media player.
         * Also detects Google TV.
         * @return {boolean}
         */
        DetectAndroid() {
            if ((uagent.search(deviceAndroid) > -1) || DetectGoogleTV()) {
                return true;
            }
            //Special check for the HTC Flyer 7" tablet. It should report here.
            return uagent.search(deviceHtcFlyer) > -1;
        },
        
        /**
         * @function DetectAndroidPhone
         * @description
         * Detects if the current device is a (small-ish) Android OS-based device
         * used for calling and/or multi-media (like a Samsung Galaxy Player).
         * Google says these devices will have 'Android' AND 'mobile' in user agent.
         * Ignores tablets (Honeycomb and later).
         * @return {boolean}
         */
        DetectAndroidPhone() {
            if (DetectAndroid() && (uagent.search(mobile) > -1)) {
                return true;
            }
            //Special check for the HTC Flyer 7" tablet. It should report here.
            return uagent.search(deviceHtcFlyer) > -1;
        },
        
        /**
         * @function DetectAndroidTablet
         * @description
         * Detects if the current device is a (self-reported) Android tablet.
         * Google says these devices will have 'Android' and NOT 'mobile' in their user agent.
         * @return {boolean}
         */
        DetectAndroidTablet() {
            //Special check for the HTC Flyer 7" tablet. It should NOT report here.
            if (uagent.search(deviceHtcFlyer) > -1) {
                return false;
            }
            return DetectAndroid() && !(uagent.search(mobile) > -1);
        },
        
        /**
         * @function DetectAndroidWebKit
         * @description
         * Detects if the current device is an Android OS-based device and
         * the browser is based on WebKit.
         * @return {boolean}
         */
        DetectAndroidWebKit() {
            return DetectAndroid() && DetectWebkit();
        },
        
        /**
         * @function DetectGoogleTV
         * @description
         * Detects if the current device is a GoogleTV.
         * @return {boolean}
         */
        DetectGoogleTV() {
            return uagent.search(deviceGoogleTV) > -1;
        },
        
        /**
         * @function DetectWebkit
         * @description
         * Detects if the current browser is based on WebKit.
         *
         * @return {boolean}
         */
        DetectWebkit() {
            return uagent.search(engineWebKit) > -1;
        },
        
        /**
         * @function DetectS60OssBrowser
         * @description
         * Detects if the current browser is the Nokia S60 Open Source Browser.
         *
         * @return {boolean}
         */
        DetectS60OssBrowser() {
            if (DetectWebkit()) {
                return (uagent.search(deviceS60) > -1 ||
                    uagent.search(deviceSymbian) > -1);
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
            return uagent.search(deviceSymbian) > -1 ||
                uagent.search(deviceS60) > -1 ||
                uagent.search(deviceS70) > -1 ||
                uagent.search(deviceS80) > -1 ||
                uagent.search(deviceS90) > -1;
        },
        
        /**
         * @function DetectWindowsPhone7
         * @description
         * Detects if the current browser is a
         * Windows Phone 7 device.
         *
         *
         * @return {boolean}
         */
        DetectWindowsPhone7() {
            return uagent.search(deviceWinPhone7) > -1;
        },
        
        /**
         * @function DetectWindowsMobile
         * @description
         * Detects if the current browser is a Windows Mobile device.
         * Excludes Windows Phone 7 devices.
         * Focuses on Windows Mobile 6.xx and earlier.
         *
         * @return {boolean}
         */
        DetectWindowsMobile() {
            //Exclude new Windows Phone 7.
            if (DetectWindowsPhone7()) {
                return false;
            }
            //Most devices use 'Windows CE', but some report 'iemobile'
            //  and some older ones report as 'PIE' for Pocket IE.
            if (uagent.search(deviceWinMob) > -1 ||
                uagent.search(deviceIeMob) > -1 ||
                uagent.search(enginePie) > -1) {
                return true;
            }
            //Test for Windows Mobile PPC but not old Macintosh PowerPC.
            if ((uagent.search(devicePpc) > -1) &&
                !(uagent.search(deviceMacPpc) > -1)) {
                return true;
            }
            //Test for Windwos Mobile-based HTC devices.
            return uagent.search(manuHtc) > -1 &&
                uagent.search(deviceWindows) > -1;
        },
        
        /**
         * @function DetectBlackBerry
         * @description
         * Detects if the current browser is a BlackBerry of some sort.
         * Includes the PlayBook.
         *
         * @return {boolean}
         */
        DetectBlackBerry() {
            if (uagent.search(deviceBB) > -1) {
                return true;
            }
            return uagent.search(vndRIM) > -1;
        },
        
        /**
         * @function DetectBlackBerryTablet
         * @description
         * Detects if the current browser is on a BlackBerry tablet device.
         *    Example: PlayBook
         *
         * @return {boolean}
         */
        DetectBlackBerryTablet() {
            return uagent.search(deviceBBPlaybook) > -1;
        },
        
        /**
         * @function DetectBlackBerryWebKit
         * @description
         * Detects if the current browser is a BlackBerry device AND uses a
         * WebKit-based browser. These are signatures for the new BlackBerry OS 6.
         * Examples: Torch. Includes the Playbook.
         *
         * @return {boolean}
         */
        DetectBlackBerryWebKit() {
            return DetectBlackBerry() &&
                uagent.search(engineWebKit) > -1;
        },
        
        /**
         * @function DetectBlackBerryTouch
         * @description
         * Detects if the current browser is a BlackBerry Touch
         * device, such as the Storm or Torch. Excludes the Playbook.
         *
         * @return {boolean}
         */
        DetectBlackBerryTouch() {
            return DetectBlackBerry() &&
                ((uagent.search(deviceBBStorm) > -1) ||
                    (uagent.search(deviceBBTorch) > -1));
        },
        
        /**
         * @function DetectBlackBerryHigh
         * @description
         * Detects if the current browser is a BlackBerry OS 5 device AND
         *    has a more capable recent browser. Excludes the Playbook.
         *    Examples, Storm, Bold, Tour, Curve2
         *
         * @return {boolean}
         */
        DetectBlackBerryHigh() {
            //Disambiguate for BlackBerry OS 6 (WebKit) browser
            if (DetectBlackBerryWebKit()) {
                return false;
            }
            if (DetectBlackBerry()) {
                return DetectBlackBerryTouch() ||
                    uagent.search(deviceBBBold) > -1 ||
                    uagent.search(deviceBBTour) > -1 ||
                    uagent.search(deviceBBCurve) > -1;
            }
            else {
                return false;
            }
        },
        
        /**
         * @function DetectBlackBerryLow
         * @description
         * Detects if the current browser is a BlackBerry device AND
         *    has an older, less capable browser.
         *    Examples: Pearl, 8800, Curve1.
         *
         * @return {boolean}
         */
        DetectBlackBerryLow() {
            if (DetectBlackBerry()) {
                //Assume that if it's not in the High tier or has WebKit, then it's Low.
                return !(DetectBlackBerryHigh() || DetectBlackBerryWebKit());
            }
            else {
                return false;
            }
        },
        
        /**
         * @function DetectPalmOS
         * @description
         * Detects if the current browser is on a PalmOS device.
         *
         * @return {boolean}
         */
        DetectPalmOS() {
            //Most devices nowadays report as 'Palm',
            //  but some older ones reported as Blazer or Xiino.
            if (uagent.search(devicePalm) > -1 ||
                uagent.search(engineBlazer) > -1 ||
                uagent.search(engineXiino) > -1) {
                //Make sure it's not WebOS first
                return !DetectPalmWebOS();
            }
            else {
                return false;
            }
        },
        
        /**
         * @function DetectPalmWebOS
         * @description
         * Detects if the current browser is on a Palm device
         * running the new WebOS.
         *
         * @return {boolean}
         */
        DetectPalmWebOS() {
            return uagent.search(deviceWebOS) > -1;
        },
        
        /**
         * @function DetectWebOSTablet
         * @description
         * Detects if the current browser is on an HP tablet running WebOS.
         *
         * @return {boolean}
         */
        DetectWebOSTablet() {
            return uagent.search(deviceWebOShp) > -1 &&
                uagent.search(deviceTablet) > -1;
        },
        
        /**
         * @function DetectGarminNuvifone
         * @description
         * Detects if the current browser is a Garmin Nuvifone.
         *
         * @return {boolean}
         */
        DetectGarminNuvifone() {
            return uagent.search(deviceNuvifone) > -1;
        },
        
        /**
         * @function DetectSmartphone
         * @description
         * Check to see whether the device is a 'smartphone'.
         * You might wish to send smartphones to a more capable web page
         * than a dumbed down WAP page.
         *
         * @return {boolean}
         */
        DetectSmartphone() {
            if (DetectIphoneOrIpod()
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
        },
        
        /**
         * @function DetectArchos
         * @description
         * Detects if the current device is an Archos media player/Internet tablet.
         *
         * @return {boolean}
         */
        DetectArchos() {
            return uagent.search(deviceArchos) > -1;
        },
        
        /**
         * @function DetectBrewDevice
         * @description
         * Detects whether the device is a Brew-powered device.
         *
         * @return {boolean}
         */
        DetectBrewDevice() {
            return uagent.search(deviceBrew) > -1;
        },
        
        /**
         * @function DetectDangerHiptop
         * @description
         * Detects the Danger Hiptop device.
         *
         * @return {boolean}
         */
        DetectDangerHiptop() {
            return uagent.search(deviceDanger) > -1 ||
                uagent.search(deviceHiptop) > -1;
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
            if (uagent.search(maemo) > -1) {
                return true;
            }
            //For Nokia N810, must be Linux + Tablet, or else it could be something else.
            return (uagent.search(linux) > -1)
                && (uagent.search(deviceTablet) > -1)
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
            if (uagent.search(manuSony) > -1) {
                return uagent.search(qtembedded) > -1 ||
                    uagent.search(mylocom2) > -1;
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
            if (uagent.search(engineOpera) > -1) {
                return uagent.search(mini) > -1 ||
                    uagent.search(mobi) > -1;
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
            return uagent.search(devicePlaystation) > -1;
        },
        
        /**
         * @function DetectNintendo
         * @description
         * Detects if the current device is a Nintendo game device.
         *
         * @return {boolean}
         */
        DetectNintendo() {
            return uagent.search(deviceNintendo) > -1 ||
                uagent.search(deviceWii) > -1 ||
                uagent.search(deviceNintendoDs) > -1;
        },
        
        /**
         * @function DetectXbox
         * @description
         * Detects if the current device is a Microsoft Xbox.
         *
         * @return {boolean}
         */
        DetectXbox() {
            return uagent.search(deviceXbox) > -1;
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
            return uagent.search(deviceKindle) > -1;
        },
        
        /**
         * @function DetectMobileQuick
         * @description
         * Detects if the current device is a mobile device.
         * This method catches most of the popular modern devices.
         * Excludes Apple iPads and other modern tablets.
         *
         * @return {boolean}
         */
        DetectMobileQuick() {
            //Let's exclude tablets.
            if (DetectTierTablet()) {
                return false;
            }
            
            //Most mobile browsing is done on smartphones
            if (DetectSmartphone()) {
                return true;
            }
            
            if (uagent.search(deviceMidp) > -1 ||
                DetectBrewDevice()) {
                return true;
            }
            
            if (DetectOperaMobile()) {
                return true;
            }
            
            if (uagent.search(engineNetfront) > -1) {
                return true;
            }
            if (uagent.search(engineUpBrowser) > -1) {
                return true;
            }
            if (uagent.search(engineOpenWeb) > -1) {
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
            
            if ((uagent.search(devicePda) > -1) &&
                !(uagent.search(disUpdate) > -1)) {
                return true;
            }
            if (uagent.search(mobile) > -1) {
                return true;
            }
            
            return DetectKindle();
        },
        
        /**
         * @function DetectMobileLong
         * @description
         *  Detects in a more comprehensive way if the current device is a mobile device.
         *
         * @return {boolean}
         */
        DetectMobileLong() {
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
            if (uagent.search(manuSamsung1) > -1 ||
                uagent.search(manuSonyEricsson) > -1 ||
                uagent.search(manuericsson) > -1) {
                return true;
            }
            
            if (uagent.search(svcDocomo) > -1) {
                return true;
            }
            if (uagent.search(svcKddi) > -1) {
                return true;
            }
            return uagent.search(svcVodafone) > -1;
        },
        
        //*****************************
        // For Mobile Web Site Design
        //*****************************
        
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
        DetectTierTablet() {
            return DetectIpad()
                || DetectAndroidTablet()
                || DetectBlackBerryTablet()
                || DetectWebOSTablet();
        },
        
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
        DetectTierIphone() {
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
        },
        
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
        DetectTierRichCss() {
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
                
                return uagent.search(engineTelecaQ) > -1;
            }
            else {
                return false;
            }
        },
        
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
         DetectTierOtherPhones() {
            if (DetectMobileLong()) {
                //Exclude devices in the other 2 categories
                return !(DetectTierIphone() || DetectTierRichCss());
            }
            else {
                return false;
            }
        },
    
    
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
if(typeof module !== 'undefined' && module.exports){
    module.exports = MDetect();
} else {
    Object.assign(window, MDetect());
}
