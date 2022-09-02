#!/usr/bin/bash

if [ "$1" = "" ]; then
    echo "Veuillez entrer un nom de commit"
else
    git add *
    git commit -m "$1"
    git push -u origin main

    docker build -t antoinemair/discord-backend ./backend-discord
    docker push antoinemair/discord-backend

    docker build -t antoinemair/vue-discord ./vue-discord-main
    docker push antoinemair/vue-discord
fi