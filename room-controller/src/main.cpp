#include "includes.h"

Scheduler s;
Deserialize *d = new Deserialize();

StaticJsonDocument<256> doc;

void setup()
{
    MsgServiceBT.init();
    Serial.begin(9600);
    MsgService.init();
    s.init(1000);
    d->init(1000);
    s.addTask(d);
    while (!Serial){}
    readSerialMessage(false, true);
    Serial.println("ready to go.");  
}

void loop()
{
    if (MsgService.isMsgAvailable())
    {
        Msg *msg = MsgService.receiveMsg();
        String command = msg->getContent();
        Serial.println(command);
        
        // Deserialize the JSON document
        /*DeserializationError error = deserializeJson(doc, command);
        
        if (error)
        {
            Serial.print(F("deserializeJson() failed: "));
            Serial.println(error.c_str());
        } else {
            Serial.println("Deserialization successful");
            int d = doc["d"];
            Serial.println(d);
        }*/
        
        delete msg;
    }
    readSerialMessage(false, true);
}