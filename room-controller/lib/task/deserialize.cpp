#include "deserialize.h"

Deserialize::Deserialize() {
    
}

void Deserialize::init(int period) {
  MsgService.init();
  Task::init(period);
}

void Deserialize::tick() {
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
  
}

