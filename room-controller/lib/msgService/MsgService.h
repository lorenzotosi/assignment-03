#ifndef __MSGSERVICE__
#define __MSGSERVICE__

#include <Arduino.h>

class MsgServiceClass
{

public:
	bool msgAvailable;

	void init();
	bool isMsgAvailable();
	void sendMsg(const String &msg);
};

#endif