
#include "includes.h"

Scheduler s;
Deserialize *d = new Deserialize();

//StaticJsonDocument<256> doc;

void setup()
{
    //MsgServiceBT.init();
    Serial.begin(9600);
    //MsgService.init();
    s.init(1000);
    d->init(1000);
    s.addTask(d);
    while (!Serial){}
    //readSerialMessage(false, true);
    Serial.println("ready to go.");  
}

void loop()
{
    s.schedule();
}

/*
#include <ArduinoJson.h>
void setup() {
  Serial.begin(9600); 
  while(!Serial) {
  }
}

void loop() {
  String  payload;
  while ( !Serial.available()  ){}
  if ( Serial.available() )
    payload = Serial.readStringUntil( '\n' );
  StaticJsonDocument<512> doc;

  DeserializationError   error = deserializeJson(doc, payload);
  if (error) {
    Serial.println(error.c_str()); 
    return;
  }
  if (doc["luce"] == 1) {
    int x = doc["luce"];
    int y = doc["tapparelle"];
    Serial.print(x);
    Serial.print(" ");
    Serial.println(y);
  }
  else {
      Serial.println("{\"Success\":\"False\"}");
   }
  delay(1);
}
*/