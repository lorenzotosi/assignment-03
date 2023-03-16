#include "SmartRoom.h"
#include "MsgService.h"

SmartRoom::SmartRoom(Led *l, rBlinds *r)
{
    led = l;
    rBlind = r;
}

void SmartRoom::init(int period)
{
    Task::init(period);
    MsgServiceBT.init();
    MsgService.init();
}

void SmartRoom::tick()
{

    if (MsgServiceBT.isMsgAvailable())
    {
        Msg *msg = MsgServiceBT.receiveMsg();
        updateRoom(msg);
        delete msg;
    }
    if (MsgService.isMsgAvailable())
    {
        Msg *msg = MsgService.receiveMsg();
        updateRoom(msg);
        delete msg;
    }
    readSerialMessage(true, true);
}

void SmartRoom::updateRoom(Msg *msg)
{
    String command = msg->getContent();
    DeserializationError error = deserializeJson(doc, command);
    if (error)
    {
        Serial.println(error.c_str());
        return;
    }
    if (doc.containsKey("light"))
    {
        digitalWrite(13, doc["light"] == 1 ? HIGH : LOW);
    }
    Serial.println(command);
}