#include "MsgService.h"
#include <Wire.h>
#include "ArduinoJson.h"
#include "Scheduler.h"
#include "a.h"
#include "SmartRoom.h"

#define LED_PIN 13

Scheduler scheduler;
A a;
SmartRoom* s;
Led* l;
rBlinds* r;

void setup() {
  l = new Led(LED_PIN);
  r = new rBlinds(8);
  s = new SmartRoom(l, r);

  MsgServiceBT.init();
  MsgService.init();
  pinMode(LED_PIN,OUTPUT);
  scheduler.init();
  scheduler.addTask(&a);
  

  Serial.begin(9600);
  while (!Serial){}
  Serial.println("ready to go.");  
  a.init(1000); 
}

void loop() {
  scheduler.schedule();
}
