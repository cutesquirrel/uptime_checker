# uptime_checker

Tiny project to check on a regular basis, my Domoticz (https://www.domoticz.com/) :)
If an error occured (unavailability or other), it sends me a pushover (https://pushover.net/) message on my mobile app.

## Crontab

Add these lines, and adapt them :

````(bash)
SHELL=/bin/bash
PATH="/usr/bin:/bin:/home/evoilliot/.nvm/versions/node/v14.16.0/bin"

## 22:00 => 08:00 = maintenance window (off hours).
0 8-22 * * * cd /home/uptime && npm start > /var/log/uptime_checker/uptime_checker.log 2>&1
````
