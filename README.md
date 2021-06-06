THIS SERVER WILL BE RUNNING ON LOCALHOST AT PORT 8000

SETTING UP NODEJS ENVIRONMENT

Link: https://nodejs.org/en/download/ 

  - Download the recommended version.
  - Make sure you check the box at "Tools for Native Modules" to automatically install the necessary tool for NodeJS !
  ![Screenshot 2021-06-05 234427](https://user-images.githubusercontent.com/48262597/120916141-ab68e000-c65c-11eb-851c-8d3a5b8d75ad.png)
  - to check NodeJS installation, run <node -v> in Command Prompt, it should return a version


INSTALLING EXPRESS FRAMEWORK

  - Navigate to project folder name "FetchRewardsServer" in Command Prompt or Terminal
  - run <npm install express --save> to install express
  
 
STARTING NODE SERVER
  - In the project folder, simply run <node Server.js> in Command Prompt or Terminal.
  - ctrl + C to stop the server.
 
SENDING HTTP REQUESTS (reference: https://docs.oracle.com/en/cloud/saas/marketing/eloqua-develop/Developers/GettingStarted/APIRequests/curl-formats.htm)
  - Open another Command Prompt / Terminal to send HTTP requests to the Node server.
  
  - To send request with new transaction to /add route, follow this syntax in Command Prompt / Terminal:
  
    curl --header "Content-Type: application/json" --request POST --data "{\\"payer\\": \\"DANNON\\", \\"points\\": 1000, \\"timestamp\\": \\"2020-11-02T14:00:00Z\\" }" http://localhost:8000/add
  
  - To send request with spending points to /spend route, follow this syntax in Command Prompt / Terminal:
  
    curl --header "Content-Type: application/json" --request POST --data "{\\"points\\": 5000}" http://localhost:8000/spend
  
  - To send request to /balance route, follow this syntax in Command Prompt / Terminal:
  
    curl --request GET http://localhost:8000/balance
  
  - NOTE: remember to add '\' before " for --data String.
          
  
CHALLENGE RESULT:
  1. curl --header "Content-Type: application/json" --request POST --data "{\\"payer\\": \\"DANNON\\", \\"points\\": 300, \\"timestamp\\": \\"2020-10-31T10:00:00Z\\" }" http://localhost:8000/add
  2. curl --header "Content-Type: application/json" --request POST --data "{\\"payer\\": \\"UNILEVER\\", \\"points\\": 200, \\"timestamp\\": \\"2020-10-31T11:00:00Z\\" }" http://localhost:8000/add
  3. curl --header "Content-Type: application/json" --request POST --data "{\\"payer\\": \\"DANNON\\", \\"points\\": -200, \\"timestamp\\": \\"2020-10-31T15:00:00Z\\" }" http://localhost:8000/add
  4. curl --header "Content-Type: application/json" --request POST --data "{\\"payer\\": \\"MILLERS COORS\\", \\"points\\": 10000, \\"timestamp\\": \\"2020-11-01T14:00:00Z\\" }" http://localhost:8000/add
  5. curl --header "Content-Type: application/json" --request POST --data "{\\"payer\\": \\"DANNON\\", \\"points\\": 1000, \\"timestamp\\": \\"2020-11-02T14:00:00Z\\" }" http://localhost:8000/add
  6. curl --header "Content-Type: application/json" --request POST --data "{\\"points\\": 5000}" http://localhost:8000/spend
  7. curl --request GET http://localhost:8000/balance
  
  ![Screenshot 2021-06-06 001313](https://user-images.githubusercontent.com/48262597/120916128-99873d00-c65c-11eb-8363-ebc3fb228bcf.png)

    

