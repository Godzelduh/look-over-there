export const isMobileDevice = (): boolean => {
    const isMobile = /Mobi|Android/i.test(window.navigator.userAgent);
    if (isMobile) {
        console.log("Mobile Device");
    } else {
        console.log("Not Mobile Device");
    }
    return isMobile;
};