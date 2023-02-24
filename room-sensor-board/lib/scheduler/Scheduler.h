#ifndef __SCHEDULER__
#define __SCHEDULER__

#include "Task.h"

#define MAX_TASKS 5

class Scheduler {
  
  unsigned long basePeriod;
  int nTasks;
  Task* taskList[MAX_TASKS];  
  unsigned long tempo1;
public:
  void init(unsigned int basePeriod);  
  virtual bool addTask(Task* task);  
  virtual void schedule();
};

#endif
