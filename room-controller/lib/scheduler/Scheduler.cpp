#include "Scheduler.h"
#include <Arduino.h>

volatile bool timerFlag;

void timerHandler(void){
  timerFlag = true;
}

void Scheduler::init(unsigned int basePeriod){
  this->basePeriod = basePeriod;
  timerFlag = false;
  tempo1 = millis();
  nTasks = 0;
}

bool Scheduler::addTask(Task* task){
  if (nTasks < MAX_TASKS-1){
    taskList[nTasks] = task;
    nTasks++;
    return true;
  } else {
    return false; 
  }
}

void Scheduler::schedule(){
  while (millis() - tempo1 < basePeriod){}

  for (int i = 0; i < nTasks; i++){

    if (taskList[i]->updateAndCheckTime(basePeriod)){
      taskList[i]->tick();
    }
  }
  tempo1 = millis();
}

