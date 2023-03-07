#ifndef __DESERIALIZE__
#define __DESERIALIZE__

#include <Arduino.h>
#include <ArduinoJson.h>
#include "messages.h"
#include "Task.h"

class Deserialize : public Task {
  public:
    Deserialize();
    void init(int period);
    void tick();
  private:
    DynamicJsonDocument doc = DynamicJsonDocument(256);

};

#endif
