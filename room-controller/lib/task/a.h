#ifndef __A__
#define __A__

#include "Arduino.h"
#include "Task.h"

#define LED_PIN 13

class A : public Task
{
public:
    DynamicJsonDocument doc = DynamicJsonDocument(256);
    void init(int period)
    {
        Task::init(period);
    }
    void tick()
    {
        if (MsgServiceBT.isMsgAvailable())
        {
            Msg *msg = MsgServiceBT.receiveMsg();
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
            String response = "{\"light\":";
            response += digitalRead(LED_PIN) == HIGH ? "1" : "0";
            response +=  ",\"window\":";
            response += "50";
            response += "}";
            MsgServiceBT.sendMsg(response);
            //MsgServiceBT.sendMsg("suca");
            delete msg;
        }

        if (MsgService.isMsgAvailable())
        {
            Msg *msg = MsgService.receiveMsg();
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
           /*String response = "{\"light\":";
            response += digitalRead(LED_PIN) == HIGH ? "1" : "0";
            response +=  ",\"window\":";
            response += doc["window"].as<int>();
            response += "}";*/
            //MsgServiceBT.sendMsg(response);
            delete msg;
        }
        // in this example messages incoming from serial are flushed
        readSerialMessage(true, true);
    }
};

#endif