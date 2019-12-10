<img src="https://upload.wikimedia.org/wikipedia/commons/4/48/Twelve_Labours_Altemps_Inv8642.jpg" height="300px"/>

# Heracles: Pleo's Test Engineer Challenge

At this README, I'm just explaining my thought process. At each folder, I have added other README files with instruction on how to run each app/test.

____________________________________

### My thought process

I like the Shift-Left approach. In other words, test early, test often. Also, for this challenge, I figured out that the traditional test pyramid would do great (more unit tests, a bit less integration tests, and only few e2e tests).

I have decided to go for backend-frontend solution, because I wanted to show off some e2e assertions and performance testing. (:

#### Backend

Backend was created with express generator. And I did it TDD-style.

##### Implementation steps for the backend
- Create the basic express application;
- Write tests for the backend. For a given input, a given output would be returned. Boundary-value analysis is critical here. I have also added tests for different types, SQL injection, and much more from the big list of naughty strings (Never heard of it before, and I loved it!)
- Write the code until all tests pass;
- What if the tests are bad? Mutation testing for the win. Run mutation tests (I used stryker), make sure the tests are good too;

##### What I would add and improve
- Tests related to headers (Fun fact: Those are the only mutants that survived at the mutation testing);
- Assertions for error message.

Everything went well? OK, good. Let's move to the front-end.

#### Frontend

For the front-end, I used react-create-app for a simple reactive app.

##### Implementation steps for the frontend
- On input change, it should set state for the value;
- On form submit, it should fire the POST request to the backend;
- If the request is valid, it should render an element with the formatted string;
- If the request is invalid, it should render an element with the Error message;
- Add snapshot testing!
- Add unit tests for handleChange component method;

##### What I would add or improve
- More unit tests, especially for handleSubmit method;
- Snapshot testing when the error message is rendered;
- Mutation testing is also possible at the front-end, and Stryker does it fine.

Now it's time to check for integration.

#### Consumer-Driven Contracts

Best thing since sliced bread: It tests integration without actually deploying the apps. In other words, we don't need to set the house on fire to test the fire alarm. I used Pact.io

Contract Testing is great for testing complex microservices architecture. I heard pleo uses kafka, so I wanted to make sure I would show off Contract Testing as well, although I am not an expert at it (yet!)

##### Implementation steps for the Consumer-Driven Contracts

If locally:
- Write tests for the consumer (here, it's the front-end). After running, it'll generate a Pact json.
- Verify the pact at the provider (the back-end) by providing the path to the pact json.

If I were using a CI server, I would:
- Write the tests for the consumer, then publish the pact to a Pact Broker or Pactflow;
- Fetch the pact at the consumer, verify it, and send the results back to the broker.
- I'd probably use the can-i-deploy feature for safe deployment.

#### End-to-end tests

I used WebdriverIO for e2e tests. Although it tests integration as well, I find it particularly useful for testing visibility of components, how it looks, etc.

##### Implementation steps for the E2E tests

- Run frontend and backend;
- Write page objects;
- Write the actual tests. Make sure to also make assertions for UI elements (for eg. error messages)


#### Performance tests

Functional tests are looking good. But what about the performance?

Here, I think it makes more sense to first have the application deployed, then to test the performance (instead of running tests locally).
 
Plenty of bottlenecks are possible:
- Application;
- Container;
- Network;
- Load balancer;
- Limitations of the machine which the tests are running;
- [...]

I am using K6 for testing this. K6 is written in Golang, but its tests are written in ES6 javascript.
It's integrated with InfluxDB, and its results are displayed with Grafana. At grafana, there are plenty of metrics, but it's currently looking like this.

<img src="https://lukaruna.s3.us-east-2.amazonaws.com/1m-1k-ping.png"/>

##### What I would check in a couple of performance tests
- If the status code and the body are right;
- Average/median/p90/p95 response time;
- Test for different loads and duration (for eg. soak tests);


And that's it! I think it's looking good. Maybe I'd add lint + husky + pre-commit hooks to each repository. I think it's very helpful on delivering good code.


