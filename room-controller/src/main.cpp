#include "includes.h"

Scheduler s;
Deserialize* d = new Deserialize();

//StaticJsonDocument<256> doc;

void setup()
{
  Serial.begin(9600);
  //MsgService.init();
  s.init(1000);
  d->init(1000);
  s.addTask(d);
}

void loop()
{
  s.schedule();
  /*
  if (MsgService.isMsgAvailable())
  {
    Msg *msg = MsgService.receiveMsg();
    Serial.println(msg->getContent());
    DeserializationError error = deserializeJson(doc, Serial);

    if (error)
    {
      Serial.print(F("deserializeJson() failed: "));
      Serial.println(error.f_str());
    }
    else
    {
      Serial.println(F("deserializeJson() succeeded:"));
      int x = doc["d"];
      Serial.println(x);
    }
    
    
    delete msg;
  }
  */

}