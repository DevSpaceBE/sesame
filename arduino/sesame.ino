/*
  Sesame (Arduino)

  The DevSpace parking gate can be opened by pressing a button. This script
  simulates the button press by shortcutting the wires connected to the
  button for a few milliseconds when a serial command is received. This
  enables us to open the lift gate without using one of the RFID cards (we
  never know who has them).

  Load this code on the Arduino.

  Note: don't use the RX/TX pins as it will trigger the relay when booting.
*/

int commandPin = 8;       // Pin triggering the relay
int buttonDownTime = 500; // Time the "button" is pressed
char openCommand = '1';   // Open command received on serial read
int loopWait = 500;       // Sleep time between loops

// Bootstrap
void setup() {
  Serial.begin(9600);
  pinMode(commandPin, OUTPUT);
}

// Reactor loop
void loop() {
  if (Serial.available() > 0) {
    char input = Serial.read();
    processCommand(input);
  }
  delay(loopWait);
}

// Verifies the received command and acts accordingly
void processCommand(char command) {
  if (command == openCommand) {
    openGate();
  }
}

// Simulates button press for buttonDownTime milliseconds
void openGate() {
  digitalWrite(commandPin, HIGH);
  delay(buttonDownTime);
  digitalWrite(commandPin, LOW);
}
