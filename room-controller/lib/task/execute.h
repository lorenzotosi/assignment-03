#ifndef __EXECUTE_H__
#define __EXECUTE_H__

#include "task.h"
#include "led.h"
#include "rBlinds.h"
#include "deserialize.h"
#include "includes.h"

class Execute : public Task
{
public:
    Execute(led *light, rBlinds *rollerBlinds);
    void init(int period);
    void tick();

private:
    led *light;
    rBlinds *rollerBlinds;
    SoftwareSerial *serialBT;
};

#endif __EXECUTE_H__