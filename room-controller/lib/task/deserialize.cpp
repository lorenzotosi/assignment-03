#include "deserialize.h"

Deserialize::Deserialize()
{
    MsgService.init();
    content = "";
}

void Deserialize::init(int period)
{
    Task::init(period);
}

void Deserialize::read()
{
    content = "";
    while (Serial.available())
    {
        char ch = (char)Serial.read();
        if (ch == '\n')
        {
            this->content = content;
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
    /*this->read();
    
    if (MsgService.isMsgAvailable())
    {
        MsgService.msgAvailable = false;

        DeserializationError error = deserializeJson(doc, content);

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
        }
        fflush(stdout);
    }*/

    
}
