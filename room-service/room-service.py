import json, cgi, keyboard
import paho.mqtt.client as paho
import requests as req
from datetime import datetime

def on_key_press(key):
    global stop
    if key.name == "s":
        stop = Trues
        client.loop_stop()
        client.disconnect()
        print("Stopping loop")
        exit()

def on_subscribe(client, userdata, mid, granted_qos):
    print("Subscribed: "+str(mid)+" "+str(granted_qos))


def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))
    client.subscribe("occupance", qos=1)
    
    
def callback(client, userdata, message):
    print("message received " ,str(message.payload.decode("utf-8")))
    
    
def on_message(client, userdata, msg):
    global light_status, window_status, first_entry, url
    print(msg.topic+" "+str(msg.qos)+" "+str(msg.payload))
    decoded_message = msg.payload.decode("utf-8")
    now = datetime.now().strftime("%H:%M:%S")
    if (decoded_message == "occupied"):
        if (first_entry):
            first_entry = False
            window_status = 100
            type = "window"
            request = {
                "content" : {
                    "status" : window_status,
                    "start" : now,
                },
                "type" : type
            }
            req.post(url, json=request)
            # TODO: send request to serial
        if (light_status == "Off"):
            light_status = "On"
            type = "lights"
            request = {
                "content" : {
                    "status" : light_status,
                    "start" : now,
                },
                "type" : type
            }
            req.post(url, json=request)
            # TODO: send request to serial
    else:
        if (light_status == "On"):
            light_status = "Off"
            type = "lights"
            request = {
                "content" : {
                    "status" : light_status,
                    "start" : now,
                },
                "type" : type
            }
            req.post(url, json=request)
            # TODO: send request to serial
        if (datetime.now().hour >= 19 and datetime.now().hour <= 8):
            first_entry = True
            if (window_status != 0):
                window_status = 0
                type = "window"
                request = {
                    "content" : {
                        "status" : window_status,
                        "start" : now,
                    },
                    "type" : type
                }
                req.post(url, json=request)
                # TODO: send request to serial
            
    
light_status = "Off"
window_status = 0
first_entry = True
client = paho.Client()
client.on_connect = on_connect
# client.connect("broker.hivemq.com", 1883)
client.on_subscribe = on_subscribe
client.on_message = on_message
url = "http://localhost/assignment-03/room-dashboard/room-dashboard-history.php"


post_data = cgi.FieldStorage()
post_type = post_data.getvalue("type")
post_value = post_data.getvalue("value")

keyboard.on_press(on_key_press)
stop = False
#client.loop_start()

print("Starting loop")

while stop == False:
    pass

