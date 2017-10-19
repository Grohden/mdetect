//Initialize our user agent string.
const UAgent = navigator.userAgent.toLowerCase();

//TODO: review this names
const mobile = "mobile"; //Some mobile browsers put 'mobile' in their user agent strings.
const mobi = "mobi"; //Some mobile browsers put 'mobi' in their user agent strings.
const deviceTablet = "tablet"; //Generic term for slate and tablet devices

export {
    UAgent,
    mobile,
    mobi,
    deviceTablet
};