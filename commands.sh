#!/bin/bash
npm i --save react-bootstrap bootstrap react-router-dom react-icons @material-ui/core @material-ui/lab @material-ui/icons material-table
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -px