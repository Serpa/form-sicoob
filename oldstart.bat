if not exist "C:\mongodb\data\db\" mkdir C:\mongodb\data\db
if not exist "C:\mongodb\data\log\" mkdir C:\mongodb\data\log
if not exist "C:\mongodb\data\db2\" mkdir C:\mongodb\data\db2
if not exist "C:\mongodb\data\log2\" mkdir C:\mongodb\data\log2
if not exist "C:\mongodb\data\db3\" mkdir C:\mongodb\data\db3
if not exist "C:\mongodb\data\log3\" mkdir C:\mongodb\data\log3
@echo off

:: Update the 3.4 if you have another version
cd C:\Program Files\MongoDB\Server\6.0\bin
::set default port variable
set port=27017

:: add this line at the end of the ~mongod.exe to write the log on a separated file
:: --logpath C:\mongodb\data\log\mongo.log
start cmd /k mongod --dbpath C:\data\db --logpath C:\data\log\mongo.log --replSet rs0
start cmd /k mongod --dbpath C:\data\db2 --logpath C:\data\log2\mongo.log --port 27018 --replSet rs0
start cmd /k mongod --dbpath C:\data\db3 --logpath C:\data\log3\mongo.log --port 27019 --replSet rs0
cd %~dp0
start cmd /k node server.js
