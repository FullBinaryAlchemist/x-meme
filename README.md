# x-meme

Responsive MERN app using REST API for sharing memes(jokes) and browsing memes deployed on AWS EC2(might not be running).
Built from sratch as part of development challenge task by [Crio.do Winter of Doing stage 2B](https://www.crio.do/crio-winter-of-doing/) and [successfully cleared to stage 3](https://www.linkedin.com/posts/dg-divyanshu-gupta_criowinterofdoing-restapi-docker-activity-6768909918272671744-UVmy)

## Features:
- Uses RESTful API following the OPEN API v3 standard with [swagger-ui](https://swagger.io/tools/swagger-ui/) documentation available at ```localhost:8080/swagger-ui/```
- Post memes using :
   * `name`(author/poster)
   * `caption`(title)
   * `image url`(url of the image. Url must have property `Content-type:image/*` ) 
 
- Edit Memes using the ```/PATCH/ api```
- Delete Memes using the ```/DELETE/ api```

## Tech Stack:
- Frontend
  - React
  - Bootstrap 5
- Backend
  - NodeJs
  - ExpressJS
  - API Testing Framework
    - Mocha
    - Chai
- Database
  - MongoDB(local)
  

## Project Organisation
- Web-app is divided into two parts: Frontend and Backend - available in their respective folders
- install.sh - Shell script to install the project dependencies*
- server_run.sh - Shell script to install backend dependencies and run the backend server*
- test_server.sh - Shell script to clone this repo and executes the install.sh & server_run.sh & sleep.sh ,followed by testing the API endpoints*
For Ubuntu system (tested on 18.04)
