#include "MsgService.h"
#include <Wire.h>
#include "ArduinoJson.h"
#include "Scheduler.h"
#include "a.h"

#define LED_PIN 13

DynamicJsonDocument doc = DynamicJsonDocument(256);

Scheduler scheduler;
A a;

void setup() {
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
