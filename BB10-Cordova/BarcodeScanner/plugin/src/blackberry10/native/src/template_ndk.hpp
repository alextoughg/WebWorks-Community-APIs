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

#ifndef BARCODESCANNERNDK_HPP_
#define BARCODESCANNERNDK_HPP_

#include <string>
#include <pthread.h>

class BarcodeScannerJS;

namespace webworks {

class BarcodeScannerNDK {
public:
	explicit BarcodeScannerNDK(BarcodeScannerJS *parent = NULL);
	virtual ~BarcodeScannerNDK();

	// The extension methods are defined here
	std::string barcodescannerTestString();

	std::string barcodescannerTestString(const std::string& inputString);

	std::string getBarcodeScannerProperty();

	void setBarcodeScannerProperty(const std::string& inputString);

	void barcodescannerTestAsync(const std::string& callbackId, const std::string& inputString);

	std::string barcodescannerStartThread(const std::string& callbackId);

	std::string barcodescannerStopThread();

	bool isThreadHalt();

	void barcodescannerThreadCallback();

private:
	BarcodeScannerJS *m_pParent;
	int barcodescannerProperty;
	int barcodescannerThreadCount;
	bool threadHalt;
	std::string threadCallbackId;
	pthread_t m_thread;
	pthread_cond_t cond;
	pthread_mutex_t mutex;
};

} // namespace webworks

#endif /* BARCODESCANNERNDK_H_ */
