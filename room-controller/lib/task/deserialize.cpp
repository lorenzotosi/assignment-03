#include "deserialize.h"

Deserialize::Deserialize()
{
}

void Deserialize::init(int period)
{
    MsgService.init();
    MsgServiceBT.init();
    Task::init(period);
}

void Deserialize::tick()
{
    readSerialMessage(false, true);
    if (MsgService.isMsgAvailable())
    {
        msg = MsgService.receiveMsg();
        const String command = msg->getContent();
        DeserializationError error = deserializeJson(doc, command);

        if (error)
        {
            Serial.print(F("deserializeJson() failed: "));
            Serial.println(error.f_str());
        }
        else
        {
            Serial.println(F("deserializeJson() succeeded:"));
            int x = doc["luce"];
            int y = doc["tapparelle"];
            Serial.print(x);
            Serial.print(" ");
            Serial.println(y);
        }
        this->msg = NULL;
    }

    // String s = read();
    // Serial.println(s);

}
