#include "deserialize.h"

Deserialize::Deserialize()
{
    pinMode(13, OUTPUT);
}

void Deserialize::init(int period)
{
    Message.init();
    Task::init(period);
}

void Deserialize::tick()
{
    Message.read();
    if (Message.isMsgArrived())
    {
        DeserializationError error = deserializeJson(doc, Message.get());
        if (error)
        {
            Serial.println(error.c_str());
            return;
        }
        if (doc.containsKey("luce"))
        {
            digitalWrite(13, doc["luce"] == 1 ? HIGH : LOW);
            int x = doc["luce"];
            int y = doc["tapparelle"];
            Serial.print(x);
            Serial.print(" ");
            Serial.println(y);
        }
    }
}
