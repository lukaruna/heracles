# Load tests
## Table of Contents



### Setup

This app needs the following to work:

- [Docker and Docker-compose](https://www.docker.com/)

### How to run

 - First, modify your tests as you need (including the link, options, load, time, etc);
 - Then, run `make build` so it'll build the containers;
 - Then, run `make run`; 
 - Once the tests are running, you can check grafana live at http://localhost:3000;
 - To stop the containers, run `make down`.
### Additional notes

 - This test won't run locally. And it probably shouldn't anyway. First, deploy in your infra, fetch the link and run the tests.
---

Lucas