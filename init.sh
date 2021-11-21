# /usr/bin/bash

yarn global add @quasar/cli
export PATH=$(yarn global bin):$PATH; >> ~/.bashrc
source ~/.bashrc && quasar dev
