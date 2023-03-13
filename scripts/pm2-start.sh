#!/bin/bash

cd gateway && pm2 start dist/main.js --name gateway
cd auth-service && pm2 start dist/main.js --name auth-service
cd merchant-service && pm2 start dist/main.js --name merchant-service