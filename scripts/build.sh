#!/bin/bash

cd gateway && yarn build && cd -
cd users-service && yarn build && cd -
cd merchant-service && yarn build && cd -