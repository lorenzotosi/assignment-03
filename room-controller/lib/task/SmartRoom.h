#ifndef __SMARTROOM__
#define __SMARTROOM__

#include "includes.h"

class SmartRoom
{
public:
    SmartRoom(led *light, rBlinds *rollerBlinds);
    bool isLightOn();
    void setLightStatus(bool status);
    int getRollerBlindsStatus();
    void setRollerBlindsStatus(int percentage);

private:
    led *light;
    rBlinds *rollerBlinds;
};

#endif