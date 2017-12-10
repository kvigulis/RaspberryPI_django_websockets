# In consumers.py
from channels import Group
import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BOARD)       # Numbers GPIOs by physical location
GPIO.setup(3, GPIO.OUT)   # Set LedPin's mode is output    
GPIO.setup(5, GPIO.OUT)   # Set LedPin's mode is output
red = GPIO.PWM(3, 50)    # create object white for PWM on port 25 at 100 Hertz  
yellow = GPIO.PWM(5, 50)
brightness = 0

def setup():
    GPIO.setmode(GPIO.BOARD)       # Numbers GPIOs by physical location
    GPIO.setup(3, GPIO.OUT)   # Set LedPin's mode is output    
    GPIO.setup(5, GPIO.OUT)   # Set LedPin's mode is output    
    
    
def blink(i):        
    while True:
        
        GPIO.output(LedPin, GPIO.HIGH)  # led on
        time.sleep(0.1)
        GPIO.output(LedPin, GPIO.LOW) # led off
        time.sleep(0.1)
        

# Connected to websocket.connect
def ws_add(message):
    # Accept the connection
    message.reply_channel.send({"accept": True})
    # Add to the chat group
    Group("chat").add(message.reply_channel)
    setup()

# Connected to websocket.receive
def ws_message(message):
    
    message_ascii = message.content['text'].encode('ascii', 'ignore')    
    
    if message_ascii[0] == "P":
        pin_nr, value, brightness = int(message_ascii[4:].split(" ")[0]), message_ascii[4:].split(" ")[1], message_ascii[4:].split(" ")[2]  
        brightness = float(brightness)          
        if value=='HIGH':
            GPIO.output(pin_nr, GPIO.HIGH)
            if pin_nr == 3:
                red.start(brightness)
            else:
                yellow.start(brightness)
        else:
            GPIO.output(pin_nr, GPIO.LOW)
            if pin_nr == 3:
                red.stop()
            else:
                yellow.stop()           
            
    else: 
        print "MSG:", message_ascii
        brightness = float(message_ascii)
        if brightness < 1:
            red.ChangeDutyCycle(0) 
            yellow.ChangeDutyCycle(0) 
        else:
            red.ChangeDutyCycle(brightness) 
            yellow.ChangeDutyCycle(brightness) 
    
    Group("chat").send({
        "text": "[user] %s" % message.content['text'],
    })    

# Connected to websocket.disconnect
def ws_disconnect(message):
    Group("chat").discard(message.reply_channel)