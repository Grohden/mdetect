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

//THIS FILE IS SUPPOSED TO BE THE 'ALL BUNDLE', it should be similar to the original repo.
import * as AllApple from "./detect/detect.apple";
import * as AllBlackBerry from "./detect/detect.blackberry";
import * as AllGameConsoles from "./detect/detect.game-consoles";
import * as AllGoogle from "./detect/detect.google";
import * as AllMobile from "./detect/detect.mobile";
import * as AllPalm from "./detect/detect.palm";
import * as AllSpecifics from "./detect/detect.specifics";
import * as AllTier from "./detect/detect.tier";
import * as AllWebKit from "./detect/detect.webkit";
import * as AllWebOS from "./detect/detect.webos";
import * as AllWindows from "./detect/detect.windows";

const MDetecExpport = {
    
    //Optional: Store values for quickly accessing same info multiple times.
    //Note: These values are not set automatically.
    
    //-- We'll use these 4 variables to speed other processing. They're super common.
};

//Stores whether the device can probably support Rich CSS, but JavaScript support is not assumed. (e.g., newer BlackBerry, Windows Mobile)
const isTierRichCss = AllTier.DetectTierRichCss();

//TODO: Review, why not follow the function convention instead of variables?

//Stores whether the device is an iPhone or iPod Touch.
const isIphone = AllApple.DetectIphoneOrIpod();

//Stores whether the device is an Android phone or multi-media player.
const isAndroidPhone = AllGoogle.DetectAndroidPhone();

//Stores whether is the Tablet (HTML5-capable, larger screen) tier of devices.
const isTierIphone = AllTier.DetectTierIphone();

//Stores whether is the iPhone tier of devices.
const isTierTablet = AllTier.DetectTierTablet();

//-- Optional: Comment these out if you don't need them.

//Stores whether it is another mobile device, which cannot be assumed to support CSS or JS (eg, older BlackBerry, RAZR)
const isTierGenericMobile =AllTier. DetectTierOtherPhones();

const allDetects = Object.assign({}
    , MDetecExpport
    , AllApple
    , AllBlackBerry
    , AllGameConsoles
    , AllGoogle
    , AllMobile
    , AllPalm
    , AllSpecifics
    , AllTier
    , AllWebKit
    , AllWebOS
    , AllWindows
    , isTierRichCss
    , isIphone
    , isAndroidPhone
    , isTierIphone
    , isTierTablet
);


/*
 * Since this is the final bundle, and it should expose its functionality in global scope
 * module.exports doesn't make sense here.
 * TODO: review, if this is used as a lib, it should be used with require or import and not expose something in global scope
 **/

window.MDetect = allDetects;