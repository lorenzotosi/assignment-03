#include "includes.h"

Scheduler s;
led *l = new led(13);
rBlinds *r = new rBlinds(3);
SmartRoom *d = new SmartRoom(l, r);

void setup()
{
    l->initialize();
    Serial.begin(9600);
    s.init(1000);
    d->init(1000);
    s.addTask(d);
    while (!Serial){}
    Serial.println("ready to go.");
}

void loop()
{
    s.schedule();
}