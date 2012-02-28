# Sesame

## What

A mobile webapp, linked with a Node.js server and an Arduino to open the boom gate of our parking lot.

## Why

Our coworking space has a parking at the back and a boom gate with RFID cards to access. We never know who has the cards and the first to arrive regulary has to wait for someone with an RFID card to arrive. What better excuse to automate the process?

## How

Our parking boom gate can be opened with a button from inside the office. The Arduino uses a relay which closes the circuit for a few milliseconds when triggered over USB, faking a button press (and thus opening the gate). The mobile webapp talks with the server component which passes the command to the Arduino via a serial connection.

## Status

The project is still in very early alpha phase. The design and slicing of the mobile webapp is done, as is the first Arduino hardware prototype. The Node.js server to link the two still needs to be build.

## Installation

### Mobile webapp

Difficult to say as there is no server component yet… ;)

### Arduino hardware

Upload the [sesame.ino](https://github.com/DevSpace/sesame/blob/master/arduino/sesame.ino) sketch to an Arduino and connect the wires as outlined in the diagram (still missing). Connect the Arduino via USB to the machine running the Node.js server and the 2 extra wires to the intercom.

## Who

The [@devspace_be](http://twitter.com/devspace_be) crowd or [@cimm](http://twitter.com/cimm), [@david_werbrouck](http://twitter.com/david_werbrouck), [@jbpros](http://twitter.com/jbpros), [@mlainez](http://twitter.com/mlainez), and [@romaingweb](http://twitter.com/romaingweb).

## License

Copyright (C) 2012 DevSpace

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
