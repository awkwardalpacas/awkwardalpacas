[![Build Status](https://travis-ci.org/Glamorous-Gerbils/awkwardalpacas.svg)](https://travis-ci.org/Glamorous-Gerbils/awkwardalpacas)

![KaMealeon](/client/images/chameleon.jpg)

KaMealeon
===========================

kamealeon.herokuapp.com

Contributors
------------

Vishal Atmakuri [Vishal's Github profile] (https://github.com/vishalatmakuri)

Pat Dalberg [Pat's Github profile] (https://github.com/pat-dalberg)

Phil Dornfeld [Phil's Github profile] (https://github.com/phillydorn)

Ben Johnson [Ben's Github profile] (https://github.com/bjmfactory)


Stack
-----

Mongo, Express, Angular, Node


Database
--------

The MongoDB stores Users and Events in collections. Users have an id assigned by Mongo, name, password, and eventIDs from events document. Events have an id assigned by Mongo, a description, a location, a creatorID corresponding to the userID of the event creator, and a list of userIDs of people who have joined the event.

