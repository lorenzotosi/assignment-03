#include "includes.h"
#include "MsgService.h"


Scheduler s;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  MsgService.init();
  //s.init(1000);

}

void loop() {
if (MsgService.isMsgAvailable()) {
    Msg* msg = MsgService.receiveMsg();    
    Serial.println(msg->getContent());
    delete msg;
  }
  
}