#!/bin/bash

(export PRODUCTION_BUILD=true API_HOST=https://api.envkey.com/api/v1 && ./build.sh)