THIS SERVER WILL BE RUNNING ON LOCALHOST AT PORT 8000

SETTING UP NODEJS ENVIRONMENT

Link: https://nodejs.org/en/download/ 

  - Download the recommended version.
  - Make sure you check the box at "Tools for Native Modules" to automatically install the necessary tool for NodeJS !
  - [Screenshot 2021-06-05 233818](https://user-images.githubusercontent.com/48262597/120915232-8a51c080-c657-11eb-9e7d-aaa51b5c0b8e.png)
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
  
    curl --header "Content-Type: application/json" --request POST --data "{\"payer\": \"DANNON\", \"points\": 1000, \"timestamp\": \"2020-11-02T14:00:00Z\" }" http://localhost:8000/add
  
  - To send request with spending points to /spend route, follow this syntax in Command Prompt / Terminal:
  
    curl --header "Content-Type: application/json" --request POST --data "{\"points\": 5000}" http://localhost:8000/spend
  
  - To send request to /balance route, follow this syntax in Command Prompt / Terminal:
  
    curl --request GET http://localhost:8000/balance
  
  - NOTE: remember to add '\' before " for --data String.
          
  
CHALLENGE RESULT:
  
  ![Screenshot 2021-06-06 001313](https://user-images.githubusercontent.com/48262597/120916128-99873d00-c65c-11eb-8363-ebc3fb228bcf.png)

    

