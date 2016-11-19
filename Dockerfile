 FROM node:6
 ADD . /code
 WORKDIR /code
 CMD npm install
 CMD npm run start
