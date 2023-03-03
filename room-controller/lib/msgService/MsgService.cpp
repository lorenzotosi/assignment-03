#include "MsgService.h"

MsgServiceClass MsgService;

bool MsgServiceClass::isMsgAvailable()
{
  return msgAvailable;
}

Msg *MsgServiceClass::receiveMsg()
{
    Msg *msg = currentMsg;
    msgAvailable = false;
    currentMsg = NULL;
    return msg;
}

void MsgServiceClass::init()
{
  Serial.begin(9600);
  Serial.setTimeout(1);
  currentMsg = NULL;
  msgAvailable = false;
}

void MsgServiceClass::sendMsg(const String &msg)
{
  Serial.println(msg);
}