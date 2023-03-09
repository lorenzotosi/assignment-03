#include "Scheduler.h"
#include <Arduino.h>

void Scheduler::init(){
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
  for (int i = 0; i < nTasks; i++){
    if (taskList[i]->updateAndCheckTime()){
      taskList[i]->tick();
    }
  }
}

