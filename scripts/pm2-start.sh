#!/bin/bash

cd gateway && pm2 start dist/main.js --name gateway && cd -
cd auth-service && pm2 start dist/main.js --name auth-service && cd -
cd merchant-service-copy && pm2 start dist/main.js --name merchant-service && cd -