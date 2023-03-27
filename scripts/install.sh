#!/bin/bash

cd gateway && yarn && cd -
cd users-service && yarn && cd -
cd merchant-service && yarn && cd -
cd booking-service && yarn && cd -
cd notification-service && yarn && cd -