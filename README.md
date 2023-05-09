# Twake-Plugins-onlyoffice

Onlyoffice plugin for Twake

### Install

```
sudo docker build -t onlyoffice-connector .
sudo docker run \
  --restart unless-stopped \
  -dp 5000:5000 \
  -e SERVER_ORIGIN='https://canary.twake.app/' \ #Only if you are using the plugins behing the node reverse proxy
  -e SERVER_PORT=5000 \
  -e SERVER_PREFIX='/plugins/onlyoffice/'
  -e CREDENTIALS_ENDPOINT='https://canary.twake.app/' \
  -e ONLY_OFFICE_SERVER='https://office.twake.app/
  -e CREDENTIALS_ID='test' \
  -e CREDENTIALS_SECRET='secret' \
  onlyoffice-connector
```

### Token workflow

1. The user open a Twake generated link for this plugins
2. The plugin set a cookie token containing the user session in the context of the onlyoffice plugin, and redirect the user to the /office?office_token=... url. The office_token contains a signed JWT with additional information about access to the file etc
3. The /office frontend can be reloaded several time without loosing the user session (30 days) nor the office_token wich is attached to the user session. The frontend will also contain an in_page_token wich is used for read / save requests comming from onlyoffice server.
4. When requests to save comes from onlyoffice server, if the file is a drive file, we check the last version date and create a new version every 3h.
