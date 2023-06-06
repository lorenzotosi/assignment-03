#ifndef __CONSTANTS__
#define __CONSTANTS__


#include "pir.h"
#include "led.h"
#include "photoresistor.h"
#include "execute.h"
#include "Scheduler.h"
#include "clientWifi.h"

#define SCHEDULER 2000
#define EXECUTE 2000

const char* ssid = "AndroidAP";
const char* password = "paolobello";



/* MQTT server address */
const char* mqtt_server = "broker.mqtt-dashboard.com";

/* MQTT topic */
const char* topic = "occupance";

#endif