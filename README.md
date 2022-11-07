# Twake-Plugins-onlyoffice

Onlyoffice plugin for Twake

### Install

```
sudo docker build -t onlyoffice-connector .
sudo docker run \
  --restart unless-stopped \
  -dp 5000:5000 \
  -e PORT=5000 \
  -e TWAKE_API='https://canary.twake.app' \
  -e ONLY_OFFICE_SERVER='https://office.twake.app/
  -e APP_ID='test' \
  -e APP_SECRET='secret' \
  onlyoffice-connector
```
