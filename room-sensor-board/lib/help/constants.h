#ifndef __CONSTANTS__
#define __CONSTANTS__


#include "pir.h"
#include "led.h"
#include "photoresistor.h"
#include "execute.h"
#include "Scheduler.h"
#include "clientWifi.h"

const char* ssid = "";
const char* password = "";


/* MQTT server address */
const char* mqtt_server = "broker.mqtt-dashboard.com";

/* MQTT topic */
const char* topic = "occupance";

#endif