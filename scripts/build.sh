#!/bin/bash

cd gateway && yarn build && cd -
cd user-service && yarn build && cd -
cd merchant-service && yarn build && cd -