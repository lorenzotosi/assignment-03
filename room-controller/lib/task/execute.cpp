#include "execute.h"

Execute::Execute(led *light, rBlinds *rollerBlinds)
{
    this->light = light;
    this->rollerBlinds = rollerBlinds;
    this->serialBT = new SoftwareSerial(2, 3); // TODO pin giusti
    serialBT->begin(9600);
}

void Execute::init(int period)
{
    Task::init(period);
}

void Execute::tick()
{
    if (serialBT.available())
    {
        String btMsg = serialBT.read();
        Serial.println(btMsg);
        StaticJsonDocument<200> doc;
        deserializeJson(doc, btMsg);
        String type = doc["type"];
        if (type == "light")
        {
            String status = doc["status"];
            if (status == "On")
            {
                light->on();
            }
            else if (status == "Off")
            {
                light->off();
            }
        }
        else if (type == "rollerBlinds")
        {
            String status = doc["status"];
            rollerBlinds->setAngle(status.toInt());
        }
    }

    // vogliamo mostrare nell'app lo stato dei componenti?
    // SerialBT.print();
}