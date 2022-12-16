# Parrot Social Network
Social network project developed on the SysMap Excellence Full Stack Trainee Program 2nd edition.

> Status: Developing ⚠️ 

## Modules:

+ [Backend API](https://github.com/bc-fullstack-02/igor-pestana/tree/main/back-end/rest-api)
+ [Frontend web](https://github.com/bc-fullstack-02/igor-pestana/tree/main/front-end/parrot)
+ [Mobile](https://github.com/bc-fullstack-02/igor-pestana/tree/main/mobile)

## Technologies used:
### Backend API:

<table>
  <tr>
    <td>Node.js</td>
    <td>Express.js</td>
    <td>MongoDB</td>
    <td>Rabbitmq</td>
    <td>Minio</td>
    <td>Docker</td>
  </tr>
  <tr>
    <td>18.12.1</td>
    <td>4.18.2</td>
    <td>latest</td>
    <td>3.11</td>
    <td>latest</td>
    <td>20.10.21</td>
  </tr>
</table>

### Frontend Web:

<table>
  <tr>
    <td>Typescript</td>
    <td>React</td>
    <td>Vite</td>
    <td>Tailwind</td>
  </tr>
  <tr>
    <td>4.6.4</td>
    <td>18.2.0</td>
    <td>3.2.3</td>
    <td>3.2.4</td>
  </tr>
</table>

### Mobile:

<table>
  <tr>
    <td>React Native</td>
  </tr>
  <tr>
    <td> - </td>
  </tr>
</table>

## How to run the application:

1) clone the project: 
```
git clone https://github.com/bc-fullstack-02/igor-pestana.git
```
2) install dependencies on backend:
```
cd ./back-end/rest-api/
npm install
```
3) start the server and the services:
```
cd ./back-end/rest-api/
docker-compose up -d
```
*in case of server error, repeat `docker-compose up -d` after the services are successfully running

4) start the frontend

```
cd ./front-end/parrot/
npm run dev
```

5) access browser url: 
- Web Application: http://localhost:4000
- Api Swagger Documentation: http://localhost:4000/api-docs/

## Author

- [@igorspestana](https://github.com/igorspestana)


## Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/igorspestana/)


## License

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

Free Software, Hell Yeah!