# hyperledgerfarbic
The project implements blockchain-based certificate use case using fabric network to store data, smart contract for certificate issue &amp; verification

There are 3 parts: Frontend (Reactjs), Server ( Nodejs, to communicate between frontend and blockchain network), Fabric network

Guide to start the project

1)Init the frontend

cd frontend/

npm install

npm start

2)Init the server and fabric network

cd backend

./runApp.sh: this command will start all necessary node containers in docker. The prerequisite is to make sure Docker container already installed in your computer.

./test.sh: this is the sample workflow created in script from registering the new sample user registered by FABRIC-CA, join channel into org2, install chaincode, to update anchor peers. Due to the policy of fabric, user have to install the chaincode on both org before instantiating it.

3)The optional tool for blockchain owner is blockchain-explorer viewing the blockchain's activities
cd blockchain-explorer

./start.sh: bring up the server and the log message will stored in logs/console

./stop.sh: this command used when you want to re-run the explorer again

Make sure the Postgres database is clear before run ./start.sh

More infor , please go to https://github.com/hyperledger/blockchain-explorer
