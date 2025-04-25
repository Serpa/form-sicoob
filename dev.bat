@echo off
setlocal enabledelayedexpansion

:: Configurações
set BASEDIR=C:\data
set BINDIP=127.0.0.1
set REPLNAME=testers0
set MONGO_VERSION=8.0
set MONGO_BIN="C:\Program Files\MongoDB\Server\%MONGO_VERSION%\bin"
set NODE_APP=server.js

:: Criar diretórios e arquivos de configuração
for %%i in (0 1 2) do (
    set PORT=2701%%i
    set DATADIR=%BASEDIR%%%i

    mkdir "%DATADIR%\db" >nul 2>&1
    mkdir "%DATADIR%\log" >nul 2>&1
    mkdir "%DATADIR%\config" >nul 2>&1

    set CONFIGFILE=%DATADIR%\config\mongod.conf

    (
    echo storage:
    echo   dbPath: "!DATADIR!\db"
    echo   journal:
    echo     enabled: true
    echo
    echo systemLog:
    echo   destination: file
    echo   logAppend: true
    echo   path: "!DATADIR!\log\mongod.log"
    echo
    echo net:
    echo   port: !PORT!
    echo   bindIp: %BINDIP%
    echo
    echo replication:
    echo   replSetName: "%REPLNAME%"
) > "!CONFIGFILE!"
)

:: Iniciar instâncias mongod
cd %MONGO_BIN%
start cmd /k mongod --config "%BASEDIR%0\config\mongod.conf"
start cmd /k mongod --config "%BASEDIR%1\config\mongod.conf"
start cmd /k mongod --config "%BASEDIR%2\config\mongod.conf"

:: Aguardar para garantir que os mongod estejam subindo
echo Aguardando MongoDB subir...
timeout /t 10 >nul

:: Instruções para iniciar o replica set manualmente (ou via script separado)
echo.
echo Inicie o replica set com este comando no mongosh:
echo.
echo   rs.initiate({
echo     _id: "%REPLNAME%",
echo     members: [
echo       { _id: 0, host: "localhost:27010" },
echo       { _id: 1, host: "localhost:27011" },
echo       { _id: 2, host: "localhost:27012" }
echo     ]
echo   })
echo.

:: Voltar para o diretório do script e rodar o servidor Node.js
cd /d %~dp0
echo Iniciando servidor Node.js...
start cmd /k node %NODE_APP%

pause