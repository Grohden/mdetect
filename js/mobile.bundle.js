//This module should have all the necessary functions to detect a mobile device.
//Or a tablet (tablets are a kind of mobile device right?)
import * as AllMobile from "./detect/detect.mobile";


const allMobile = Object.assign({}
    , AllMobile
);

/*
 * Since this is the final bundle, and it should expose its functionality in global scope
 * module.exports doesn't make sense here.
 * TODO: review, if this is used as a lib, it should be used with require or import and not expose something in global scope
 **/
window.MDetect = allMobile;