# Studnets Management System
---
An integrated performance and quality students management system for Imam Al-Kadhim College, Dhi Qar departments.<strong>You can navigate throw the branches to see the rest of the code.</strong>


## Features
---
1-CRUD functionality:
For every department, batch and student there is a crud functionality.

2-Responsibility system : 
* Manager: Can access all departments, batches and students data. He can also add and delete admins and supervisers.
* Superviser: Can access batches and students data for specific department by add, delete and update there data.
* Admin: Can access students data for specific department by add, delete and update specific data of that student

3- Access system: Admins and Supervisers can't minmanipulate any data out of the specific chosen department that the manager set it.

4- Simple Desing: Simple and clear design to make it easy for minmanipulating any data that user can access.


### How to use it 
---
It is a React app so all you need is to install the repo in your machine and install [node.js](https://nodejs.org/en/node.js) if you don't have it then run the command below in the terminal
```
npm run start
```
then open the backend folder and run the command 
```
node .\server.js
```
or if you have nodemon installed then run
```
nodemon .\server.js
```


This should run it all. Have a great day 😍.