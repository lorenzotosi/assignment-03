#ifndef __WIFI__
#define __WIFI__

#include <WiFi.h>

class clientWifi {
  public:
    static void wifiConnect(const char* ssid, const char* password);
};

#endif
