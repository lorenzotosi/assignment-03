#ifndef __TASK__
#define __TASK__

#include "Arduino.h"

class Task {
  int myPeriod;
  int timeElapsed;
  int lastTime;
  int currentTime;
  
public:
  virtual void init(int period){
    myPeriod = period;  
    timeElapsed = 0;
    lastTime = millis();
  }

  virtual void tick() = 0;

  bool updateAndCheckTime(){
    currentTime = millis();
    timeElapsed += currentTime - lastTime;
    lastTime = currentTime;
    if (timeElapsed >= myPeriod){
      timeElapsed = 0;
      return true;
    } else {
      return false;
    }
  }

  void setPeriod(int period){
    myPeriod = period;
  }
  
};

#endif

