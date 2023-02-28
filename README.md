# Twake-Plugins-onlyoffice

Onlyoffice plugin for Twake

### Install

```
sudo docker build -t onlyoffice-connector .
sudo docker run \
  --restart unless-stopped \
  -dp 5000:5000 \
  -e SERVER_PORT=5000 \
  -e SERVER_PREFIX='/plugins/onlyoffice/'
  -e CREDENTIALS_ENDPOINT='https://canary.twake.app/' \
  -e ONLY_OFFICE_SERVER='https://office.twake.app/
  -e CREDENTIAL_ID='test' \
  -e CREDENTIALS_SECRET='secret' \
  onlyoffice-connector
```
