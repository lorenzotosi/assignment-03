#include "messages.h"
#include "Variables.h"

Messages Message;
MessagesBT MessageBT(btrx, bttx);

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


MessagesBT::MessagesBT(int rxPin, int txPin)
{
    channel = new SoftwareSerial(rxPin, txPin);
    channel->begin(9600);
}

void MessagesBT::init()
{
    payload = "";
    msgArrived = false;
}

bool MessagesBT::isMsgArrived()
{
    return msgArrived;
}

void MessagesBT::read()
{
    payload = "";
    while (channel->available())
    {
        payload = channel->readStringUntil('\n');
        msgArrived = true;
    }
}

void MessagesBT::send()
{
    // serializeJson(doc, payload);
    // Serial.println(payload);
}

