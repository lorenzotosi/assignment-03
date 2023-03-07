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

void SmartRoom::init(int period)
{
    Message.init();
    Task::init(period);
    this->rollerBlinds->setAngle(map(100, 0, 100, 0, 180));
}

void SmartRoom::tick()
{
     Message.read();
    if (Message.isMsgArrived())
    {
        updateRoom(Message.get());
    }

    //manca il bluetooth, uguale a sopra
}

void SmartRoom::updateRoom(String message)
{
     DeserializationError error = deserializeJson(doc, message);
        if (error)
        {
            Serial.println(error.c_str());
            return;
        }

        if (doc.containsKey("luce"))
        {
            /*digitalWrite(13, doc["luce"] == 1 ? HIGH : LOW);
            int x = doc["luce"];
            int y = doc["tapparelle"];
            Serial.print(x);
            Serial.print(" ");
            Serial.println(y);*/
            this->setLightStatus(doc["luce"] == 1 ? true : false);
        }

        if(doc.containsKey("tapparelle"))
        {
            this->setRollerBlindsStatus(doc["tapparelle"]);
        }
}