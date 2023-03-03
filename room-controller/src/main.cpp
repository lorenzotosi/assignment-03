#include "includes.h"

Scheduler s;
Deserialize *d;

StaticJsonDocument<256> doc;

void setup()
{
    d = new Deserialize();
    s.init(1000);
    d->init(1000);
    s.addTask(d);
    Serial.println("Setup done");
}

void loop()
{
    s.schedule();
}