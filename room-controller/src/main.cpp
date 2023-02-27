#include "includes.h"

Scheduler s;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  s.init(1000);

}

void loop() {
  // put your main code here, to run repeatedly:
  s.schedule();
}