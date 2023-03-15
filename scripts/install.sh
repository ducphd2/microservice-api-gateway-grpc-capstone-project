#!/bin/bash

cd gateway && yarn && cd -
cd auth-service && yarn && cd -
cd merchant-service-copy && yarn && cd -