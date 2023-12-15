<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest



## Description
A transactional email service that provides an abstraction between at least two different email service providers.

 #### Framework
  - [Nest](https://github.com/nestjs/nest) framework.
  
 #### Language
  - [Typescript](https://www.typescriptlang.org/)

 #### Libraries
 - [Swagger](https://swagger.io/)

 
#### I aim to incorporate:

- A custom HttpException class consolidating expected API error status codes and mapping them to NestJs HttpException classes. These custom error messages will enhance clarity for API consumers.
- Introducing a Queue service to address application scaling and performance hurdles. The Queue will efficiently manage emails, dispatching them sequentially via its daemon process. This guarantees immediate successful responses for users sending emails, irrespective of their final delivery status.

 
## Installation

```bash
$ npm install
```

## Configuration
Create a `.env` file in the root directory `email-service/` You can copy and paste the content from the `env-example` file found in the root directory.

The `.env` file has the following variables described below.
| Varibles                       | Description                                         | Example  | Required
| ------------------------------ |:---------------------------------------------------:| -----:|:-----------|
| SENDGRID_API_KEY               | Your account's sendgrid API key                     | SG.UEU63jf... | Yes         |
| MAILGUN_API_KEY                | Your account's Mailgun API key                      |   46274ireerdbb.. | Yes         |
| MAILGUN_DOMAIN                 | Your account's mailgun domain name                  |    yourdomain.com | No (Optional)|
| EMAIL_FAILURE_RETRY            | Option to retry sending email after failed attempts |    true | No (Optional)|
| EMAIL_FAILURE_RETRY_TIMES      | The number of retry times                           |    4 | No (Optional)|
| EMAIL_FAILURE_RETRY_DELAY      | Option to add delay email retry interval            |    true | No (Optional)|
| EMAIL_FAILURE_RETRY_DELAY_TIME | The delay interval time in milliseconds             |    3000 | No (Optional)|


## Running the app
You can choose to run the app via `npm` or `Docker`

```bash
# using npm
$ npm run start

# using docker
$ docker-compose up
```

## Using the app
#### Swagger Api Documentation
   - On your web browser, navigate to `http://localhost:3000/api`
   - > If you chose to run the app using `Docker`, please navigate to `http://localhost:3001/api` instead.
   - ![Screen Shot 2021-12-31 at 2 42 24 PM](https://user-images.githubusercontent.com/2057169/147839552-9e1395a7-6752-4593-a3db-f71cf963c28f.png)  
   - You can also refer to your `terminal` to view the email dispatch process logs. 
          ![Screen Shot 2021-12-31 at 2 48 02 PM](https://user-images.githubusercontent.com/2057169/147839646-b24e5faa-66e7-475a-bccd-49175daeba07.png)

## Testing

```bash
# test coverage
$ npm run test:cov
```

