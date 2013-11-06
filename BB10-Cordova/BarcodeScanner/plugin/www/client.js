/*
* Copyright (c) 2013 BlackBerry Limited
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

var _self = {},
	_ID = "community.barcodescannerplugin",
	exec = cordova.require("cordova/exec");


	/* Start scanning for barcodes. 
	 * @param codeFound
	 *			Function that executes when the barcode has been recognized 
	 *			successfully. Expected signature: codeFound(data)
	 * @param errorFound
	 * 			Function that executes when the barcode has NOT been recognized 
	 *			successfully. Expected signature: errorFound(data)
	 * @param canvasID 
	 *			ID of the Canvas element for displaying the viewfinder.
	 *			The viewfinder will be resized to the size of the canvas given.
	 * @param successStart
	 *			Function that is called when the everything has been set up 
	 *			properly and we are able to start the scan.
	 *			Expected signature: successStart(data), where data = ?
	 */
	_self.startRead = function (codeFound, errorFound, canvasID, successStart) {

		// For callbacks
		var success = function (data, response) {
				//var json = JSON.parse(data);
				//callback(json);
				console.log("startRead started successfully with data: " + data);
			},
			fail = function (data, response) {
				console.log("Error: " + data);
			};

		if (reading === true) {
			return "Stop Scanning before scanning again";
		}

		/*
		if ( typeof(successStart) == "function" ) {
			window.webworks.event.once(_ID, "community.barcodescanner.started", successStart);
		}
		*/

		if ( typeof(successStart) == "function" ) {
			// To register the callback
			exec(successStart, fail, _ID, "registerCallbackOnce", {callback: "successStart"});
		}

		/*if ( canvasID !== null ) {
			canvas = document.getElementById(canvasID);
			window.webworks.event.add(_ID, "community.barcodescanner.frameavailable", frameAvailable);
		}*/

		if ( canvasID != null ) {
			exec(frameAvailable, fail, _ID, "registerCallbackOnce", {callback: "frameAvailable"});	
		}

		/*
		if ( typeof(errorFound) == "function" ) {
			errorfoundCallback = errorFound;
			window.webworks.event.once(_ID, "community.barcodescanner.errorfound", errorfoundCallback);
		}*/

		if ( typeof(errorFound) == "function" ) {
			exec(errorFound, fail, _ID, "registerCallbackOnce", {callback: "errorFound"});	
		}


		/*
		if ( typeof(codeFound) == "function" ) {
			codefoundCallback = codeFound;
			window.webworks.event.once(_ID, "community.barcodescanner.codefound", codefoundCallback);
		}
		*/

		if ( typeof(errorFound) == "function" ) {
			exec(codeFound, fail, _ID, "registerCallbackOnce", {callback: "codeFound"});	
		}


		blackberry.io.sandbox = false;
		reading = true;
		// Turn on prevent sleep, if it's in the app
		if (community.preventsleep) {
			if (!community.preventsleep.isSleepPrevented) {
				community.preventsleep.setPreventSleep(true);
				sleepPrevented = true;
			}
		}

		exec(success, fail, _ID, "startRead", null);

		// This method calls: 
		// startRead(success, fail, args=null)
		// where the success and fail callbacks are provided by Webworks.
		//return window.webworks.execAsync(_ID, "startRead", null);
	};

	/*

	// These methods are called by your App's JavaScript
	// They make WebWorks function calls to the methods
	// in the index.js of the Extension

	// Simple Synchronous test function to get a string
	_self.test = function () {
		var result,
			success = function (data, response) {
				result = data;
			},
			fail = function (data, response) {
				console.log("Error: " + data);
			};
		exec(success, fail, _ID, "test", null);
		return result;
	};
	_self.testInput = function (input) {
		var result,
			success = function (data, response) {
				result = data;
			},
			fail = function (data, response) {
				console.log("Error: " + data);
			};
		exec(success, fail, _ID, "testInput", { input: input });
		return result;
	};

	// Asynchronous with sending and returning a JSON object
	_self.testAsync = function (input, callback) {
		var success = function (data, response) {
				var json = JSON.parse(data);
				callback(json);
			},
			fail = function (data, response) {
				console.log("Error: " + data);
			};
		exec(success, fail, _ID, "testAsync", { input: input });
	};

	// Define a property on the extension object
	// Omit the getter or setter as needed to restrict the property
	Object.defineProperty(_self, "templateProperty", {
		get: function () {
			var result,
				success = function (data, response) {
					result = data;
				},
				fail = function (data, response) {
					console.log("Error: " + data);
				};
			exec(success, fail, _ID, "templateProperty", null);
			return result;
		},
		set: function (arg) {
			var result,
				success = function (data, response) {
					result = data;
				},
				fail = function (data, response) {
					console.log("Error: " + data);
				};
			exec(success, fail, _ID, "templateProperty", {"value": arg });
			return result;
		}
	});

	_self.startThread = function (callback) {
		var success = function (data, response) {
				callback(data);
			},
			fail = function (data, response) {
				console.log("Error: " + data);
			};
		exec(success, fail, _ID, "startThread", null);
	};

	_self.stopThread = function (callback) {
		var result,
			success = function (data, response) {
				result = data;
			},
			fail = function (data, response) {
				console.log("Error: " + data);
			};
		exec(success, fail, _ID, "stopThread", null);
		return result;
	};

	*/

	function frameAvailable(data){
		latestFrame = data.frame;
		timeout = setTimeout(readFile, 4, latestFrame);
	}

module.exports = _self;