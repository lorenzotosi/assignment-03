#include "messages.h"

Messages Message;

Messages::Messages()
{
}

void Messages::init()
{
    payload = "";
    msgArrived = false;
}

bool Messages::isMsgArrived()
{
    return msgArrived;
}

void Messages::read()
{
    payload = "";
    while (Serial.available())
    {
        payload = Serial.readStringUntil('\n');
        msgArrived = true;
    }
}

void Messages::send()
{
    // serializeJson(doc, payload);
    // Serial.println(payload);
}