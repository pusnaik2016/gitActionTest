#!/bin/bash
while IFS='=' read -r key value; do [[ -n "$key" && ! "$key" =~ ^# ]] && echo "$value" | gh secret set "$key" > /dev/null 2>&1; done < .env
