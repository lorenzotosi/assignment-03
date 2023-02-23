import json
import paho.mqtt.client as paho
from paho import mqtt
from queue import Queue

q = Queue()

def on_subscribe(client, userdata, mid, granted_qos):
    print("Subscribed: "+str(mid)+" "+str(granted_qos))

def on_message(client, userdata, msg):
    print(msg.topic+" "+str(msg.qos)+" "+str(msg.payload))
    decoded_message = msg.payload.decode("utf-8")
    msg = json.loads(decoded_message)
    q.put(msg)

def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))
    client.subscribe("occupance", qos=1)
    
def callback(client, userdata, message):
    print("message received " ,str(message.payload.decode("utf-8")))

client = paho.Client()
client.on_connect = on_connect
client.connect("broker.hivemq.com", 1883)
client.on_subscribe = on_subscribe
client.on_message = on_message

client.loop_forever()
    
while True:
    message = q.get()
    if message is None:
        print("No message")
    else:
        print(message)