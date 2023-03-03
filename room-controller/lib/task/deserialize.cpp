#include "deserialize.h"

Deserialize::Deserialize()
{
    MsgService.init();
    content = "";
    content.reserve(200);
}

void Deserialize::init(int period)
{
    Task::init(period);
}

void Deserialize::read()
{
    while (Serial.available())
    {
        char ch = (char)Serial.read();
        if (ch == '\n')
        {
            MsgService.currentMsg = new Msg(content);
            MsgService.msgAvailable = true;
        }
        else
        {
            content += ch;
        }
    }
}

void Deserialize::tick()
{
    this->read();
    if (MsgService.isMsgAvailable())
    {
        Msg *msg = MsgService.receiveMsg();
        Serial.println(msg->getContent());

        /*DeserializationError error = deserializeJson(doc, Serial);

        if (error)
        {
            Serial.print("deserializeJson() failed: ");
            Serial.println(error.f_str());
        }
        else
        {
            Serial.println(F("deserializeJson() succeeded:"));
            int x = doc["d"];
            Serial.println(x);
        }*/
        delete msg;
    }
    else
    {
        Serial.println("No message available");
    }
    content = "";
}
