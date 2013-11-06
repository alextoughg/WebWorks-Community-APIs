function errorFound(data){
        console.log("Error : "+data.error + " description : "+ data.description);
}

function codeFound(data) {
        console.log(data);
        /*if (gotCode === false) {
                gotCode = true;
                stopBarcodeRead();
                blackberry.ui.toast.show("Detected : "+data.value);
        }*/
}

function onStartRead(data){
        console.log("Started : "+data.successful);
}

function onStopRead(data){
        console.log("Stopped : " +data.successful);
}

function startBarcodeRead(){
        //gotCode = false;
        //blackberry.app.lockOrientation("portrait-primary", false);
        community.barcodescannerplugin.startRead(codeFound, errorFound, "myCanvas", onStartRead);
        //scanTimeout = setTimeout(scanTimeoutHalt, 60000);
}

function stopBarcodeRead(){
        community.barcodescannerplugin.stopRead(onStopRead, errorFound);
        //clearTimeout(scanTimeout);
        //scanTimeout = null;
        //blackberry.app.unlockOrientation();
}

function scanTimeoutHalt() {
        //blackberry.ui.toast.show("No Code found in 60s. Stopping Scanner");
        //stopBarcodeRead();
}

function onPause() {
        //if (scanTimeout !== null) {
        //        showResumeToast = true;
        //        stopBarcodeRead();
        //}
}

function onResume() {
        //if (showResumeToast === true) {
        //        blackberry.ui.toast.show("Application Minimized. Scanner Stopped");
        //        showResumeToast = false;
        //}
}

startBarcodeRead();