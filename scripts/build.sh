#!/bin/bash

cd gateway && yarn build && cd -
cd auth-service && yarn build && cd -
cd merchant-service && yarn build && cd -