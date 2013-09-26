Cordova MessageBox Plugin For Blackberry 10
===========================================

This plugin provides a standard API for the Dialog object documented in BB HTML5 Webworks.

## How to setup the plugin and run the sample

1. Install Apache Cordova and Webworks. 
2. Clone the contents of the Webworks-Community-APIs repo into a directory of your choice.
3. Navigate to BB10-Cordova/MessageBox/sample.
4. Type into the console to add the plugin to Cordova: 
```
cordova plugin add ../plugin/
```
5. To run the sample on your phone or simulator, type into the console:
```
cordova run
```

## Javascript API


```javascript
/*
 * Displays an alert message defined according to options. 
 * options is an object that contains one or more of the 
 * following fields:
 *	- okButtonTitle: Default value 'OK'.
 *  - yesButtonTitle: Default value 'Yes'.
 *  - noButtonTitle: Default value 'No'.
 *  - cancelButtonTitle: Default value 'Cancel'.
 *  - title : A string describing the title of the alert box.
 *  - message : A string with the contents of the alert box.
 * callback is a function that gets called as soon as the 
 * native code has done its work. Expected signature:
 * callback(selectedButtonIndex).
 * Can this be standard?
 */
 window.plugins.messageBox.alert(options, callback)

 /*
 * Displays a confirm message defined according to options. 
 * options is an object that contains one or more of the 
 * following fields:
 *	- okButtonTitle: Default value 'OK'.
 *  - yesButtonTitle: Default value 'Yes'.
 *  - noButtonTitle: Default value 'No'.
 *  - cancelButtonTitle: Default value 'Cancel'.
 *  - title : A string describing the title of the alert box.
 *  - message : A string with the contents of the alert box.
 * callback is a function that gets called as soon as the 
 * native code has done its work.
 */
 window.plugins.messageBox.confirm(options, callback)
```

## License

Apache 2 License