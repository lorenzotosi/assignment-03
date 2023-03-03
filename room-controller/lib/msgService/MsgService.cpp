#include "MsgService.h"

MsgServiceClass MsgService;

bool MsgServiceClass::isMsgAvailable()
{
  return msgAvailable;
}

void MsgServiceClass::init()
{
  Serial.begin(9600);
  Serial.setTimeout(1);
  msgAvailable = false;
}

void MsgServiceClass::sendMsg(const String &msg)
{
  Serial.println(msg);
}
