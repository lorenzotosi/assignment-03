#include "SmartRoom.h"

SmartRoom::SmartRoom(led *light, rBlinds *rollerBlinds)
{
    this->light = light;
    this->rollerBlinds = rollerBlinds;
}

bool SmartRoom::isLightOn()
{
    return this->light->isOn();
}

void SmartRoom::setLightStatus(bool status)
{
    if (status)
    {
        this->light->on();
    }
    else
    {
        this->light->off();
    }
}

int SmartRoom::getRollerBlindsStatus()
{
    return map(this->rollerBlinds->getAngle(), 0, 180, 0, 100);
}

void SmartRoom::setRollerBlindsStatus(int percentage)
{
    this->rollerBlinds->setAngle(map(percentage, 0, 100, 0, 180));
}
