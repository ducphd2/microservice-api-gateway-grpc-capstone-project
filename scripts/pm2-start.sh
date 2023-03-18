#!/bin/bash

cd gateway && pm2 start dist/main.js --name gateway && cd -
cd users-service && pm2 start dist/main.js --name user-service && cd -
cd merchant-service && pm2 start dist/main.js --name merchant-service && cd -