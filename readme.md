# Travel Expense Tracker

### Description:

This project aims to solve a problem of travel expense tracker. This is a collabarative feature where we solve a problem of keeping track of your money and split it with friends.

### Functionalities

- Signup
- Login
- Dashboard where you can see all your groups
- Add expense
- create group
- see list of transactions
- see how much money you owe someone and someone owes you
- Smart settle the amount

### How to run it ?

- First clone the repo by using `git clone`
- You need node to run the project
- open 2 terminals
- in one terminal do `cd travel-expense-tracker-be` and in another do `cd travel-expense-tracker-fe`
- do this in both `yarn` or `npm i`
- setup `.env` file in both
- Create a mongodb database and put all necessary variables in `.env` of backend
- now you can run it on dev by `yarn dev` on both terminal
- Visit http://localhost:3000

### Technologies used:

- Nodejs
- Express
- Mongodb (cloud atlas)
- React
- Bootstrap
- bcryptjs to store crypted password
- expressjwt
- Typescript

### Folder structure

We have a folder structure defined in a way so that we can put different things in it's own folder to keep things clean.

#### Backend

- db
- middlewares
- models
- public
- routes
- utils

#### Frontend

- public
- src
  - api
  - assets
  - components
  - context
  - pages
  - types

### LIVE Deployment:

- We have deployed it using [render](https://render.com/) and Netlify.
- FE URL is : https://657bc49f7b133621be860f95--polite-naiad-dac416.netlify.app/
- BE url is : ttps://travel-expense-tracker.onrender.com/

### Git Workdflow diagram:

![git workflow](https://raw.githubusercontent.com/Bhalani-Mauli/restaurant-booking/main/docs/gitWorkflow.png)

### Trello Board:

- https://trello.com/b/SANsVMiw/the-travel-app

### Contributors:

- Mauli Makadiya
