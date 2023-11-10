# Node Server JSGuru test

## Prerequisite
 - Node >= 16
 - Docker 
 - Docker compose

## Installations

Clone the repo:

```bash
git clone https://github.com/smrgan14/jsguru.git 
```

Install the dependencies:

```bash
npm install
```

Set the environment variables:

```bash
cp .env.example .env
```

## Commands

Build project:

```bash
npm run build
```

Running locally:

```bash
npm run start
```
Docker:

```bash
# run docker container
docker-compose up -d
```

Linting:

```bash
# run TSLint
npm run lint

# fix TSLint errors
npm run lint:fix
```

## Environment Variables

The environment variables can be found and modified in the `.env` file. Default environment variables are in the .env.example

## API Documentation

To view the list of available APIs and their specifications, run the server and go to `http://localhost:2000/v1/docs` in your browser. This documentation page is automatically generated using the [swagger](https://swagger.io/) definitions written in YAML files in docs folder.

## Rate limit test
Send more then 7 requests in 10 sec
You should see response message that you have reached limit