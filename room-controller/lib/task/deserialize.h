#ifndef __DESERIALIZE__
#define __DESERIALIZE__

#include <Arduino.h>
#include <ArduinoJson.h>
#include "MsgService.h"
#include "Task.h"

class Deserialize : public Task {
  public:
    Deserialize();
    void init(int period);
    void tick();
  private:
    StaticJsonDocument<256> doc;
};

#endif
