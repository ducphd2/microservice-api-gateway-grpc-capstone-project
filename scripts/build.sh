#!/bin/bash

cd gateway && yarn build && cd -
cd users-service && yarn build && cd -
cd merchant-service && yarn build && cd -
cd booking-service && yarn build && cd -
cd notification-service && yarn build && cd -