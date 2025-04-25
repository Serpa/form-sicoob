if not exist "c:\data0\config" mkdir c:\data0\config
if not exist "c:\data0\db" mkdir c:\data0\db
if not exist "c:\data0\log" mkdir c:\data0\log
if not exist "c:\data1\config" mkdir c:\data1\config
if not exist "c:\data1\db" mkdir c:\data1\db
if not exist "c:\data1\log" mkdir c:\data1\log
if not exist "c:\data2\config" mkdir c:\data2\config
if not exist "c:\data2\db" mkdir c:\data2\db
if not exist "c:\data2\log" mkdir c:\data2\log

@echo off
set "arquivo_destino=c:\data0\config\mongod.conf"

(
echo # mongod.conf
echo.
echo # for documentation of all options, see:
echo #   http://docs.mongodb.org/manual/reference/configuration-options/
echo.
echo # Where and how to store data.
echo storage:
echo   dbPath: C:\data0\db
echo   journal:
echo     enabled: true
echo #  engine:
echo #  wiredTiger:
echo.
echo # where to write logging data.
echo systemLog:
echo   destination: file
echo   logAppend: true
echo   path:  C:\data0\log\mongod.log
echo.
echo # network interfaces
echo net:
echo   port: 27017
echo   bindIp: 127.0.0.1
echo.
echo #processManagement:
echo.
echo #security:
echo.
echo #operationProfiling:
echo.
echo #replication:
echo     replSetName: testers0
echo #sharding:
echo.
echo ## Enterprise-Only Options:
echo.
echo #auditLog:
echo.
echo #snmp:
) > "%arquivo_destino%"

@echo off
set "arquivo_destino1=c:\data1\config\mongod.conf"

(
echo # mongod.conf
echo.
echo # for documentation of all options, see:
echo #   http://docs.mongodb.org/manual/reference/configuration-options/
echo.
echo # Where and how to store data.
echo storage:
echo   dbPath: C:\data1\db
echo   journal:
echo     enabled: true
echo #  engine:
echo #  wiredTiger:
echo.
echo # where to write logging data.
echo systemLog:
echo   destination: file
echo   logAppend: true
echo   path:  C:\data1\log\mongod.log
echo.
echo # network interfaces
echo net:
echo   port: 27018
echo   bindIp: 127.0.0.1
echo.
echo #processManagement:
echo.
echo #security:
echo.
echo #operationProfiling:
echo.
echo #replication:
echo     replSetName: testers0
echo #sharding:
echo.
echo ## Enterprise-Only Options:
echo.
echo #auditLog:
echo.
echo #snmp:
) > "%arquivo_destino1%"

@echo off
set "arquivo_destino2=c:\data2\config\mongod.conf"

(
echo # mongod.conf
echo.
echo # for documentation of all options, see:
echo #   http://docs.mongodb.org/manual/reference/configuration-options/
echo.
echo # Where and how to store data.
echo storage:
echo   dbPath: C:\data2\db
echo   journal:
echo     enabled: true
echo #  engine:
echo #  wiredTiger:
echo.
echo # where to write logging data.
echo systemLog:
echo   destination: file
echo   logAppend: true
echo   path:  C:\data2\log\mongod.log
echo.
echo # network interfaces
echo net:
echo   port: 27019
echo   bindIp: 127.0.0.1
echo.
echo #processManagement:
echo.
echo #security:
echo.
echo #operationProfiling:
echo.
echo #replication:
echo     replSetName: testers0
echo #sharding:
echo.
echo ## Enterprise-Only Options:
echo.
echo #auditLog:
echo.
echo #snmp:
) > "%arquivo_destino2%"

echo Arquivo mongod.conf criado em %arquivo_destino%
:: Update the 3.4 if you have another version
cd C:\Program Files\MongoDB\Server\8.0\bin
::set default port variable
::set port=27017
:: Rodar
:: mongosh --port 27017
:: depois
::
::
::
::
::
::

:: add this line at the end of the ~mongod.exe to write the log on a separated file
:: --logpath C:\mongodb\data\log\mongo.log
start cmd /k mongod --dbpath C:\data0\ -port 27017 --replSet "testers0"
start cmd /k mongod --dbpath C:\data1\ -port 27018 --replSet "testers0"
start cmd /k mongod --dbpath C:\data2\ -port 27019 --replSet "testers0"
::mongosh rs.add({_id:1, host: "localhost:27018"}) rs.add({_id:2, host: "localhost:27019"})
cd %~dp0
start cmd /k node server.js
