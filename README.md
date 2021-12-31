<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest



## Description
A transactional email service that provides an abstraction between at least two different email service providers.

 #### Framework
  - [Nest](https://github.com/nestjs/nest) framework. I used this framework because it is an open-source server-side application development framwework for builing efficient and scalable Nodejs applications and it has a large community and support system.
  
 #### Language
  - [Typescript](https://www.typescriptlang.org/) I chose typescript because it makes you application or api easier to use due to defined typings. It also allows for early spotting of bugs and makes your code base readable.

 #### Libraries
 - [Swagger](https://swagger.io/) Api Docs - I chose this because it provides a UI that describes into details, your API and its elements and gives you a clean interactive documentation. 

 #### Things I left out 
 - I couldn't complete the `unit` and `end-to-end` tests for the email API services

 #### Time spent
 I spent approximately 3 days for this project. I spent more time trying to research on testing the email API services.
 
 #### Things I wish to include
 - A custon HttpException class that wraps all the API's expected Http error statusCodes and a mapping to the NestJs HttpException classes with custome error messages that make sense to clients or consumers of the API.
 - Implement a `Queue` service to circumvent application scaling and performance challenges. So the `Queue` would hold as many emails as possible and dispatch them one after the other via it's daemon process. This will ensure that users get instant successfull responses when they send out emails, regardless of whether the email reached the recipient or not. 


 
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

