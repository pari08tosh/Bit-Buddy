# Bit Buddy

Bit Buddy is an hybrid productivity app built with ionic and firebase. It includes features which are required by almost all college students in their daily life.

## Authentication

 Login is through facebook or google. All user data is stored on firestore with well defined security rules. Currently the app is tested for android and browser compatibility.

## Easy data access

 As data is not localised to the device, one can log into the app on any device, or visit the website for the app to update his data. Currently the site is hosted at bitbuddy.surge.sh.

## Features

1. **Todo Manager**: An easy to maintain todo manager to keep track of everyday tasks. Includes notifications to remind users about pending todos.
2. **Weather**: Uses the openweatherapi to show regular weather updates. One can select city or use geo-location to set the location.
3. **News**: Uses the api from newsapi.org to show live updates from various sources. One can choose from over 20 sources, from various categories to always stay updated with worldly happenings.
4. **Expense Manager**: A well designed expense manager to help track monthly expenditures. Uses Chart.js to represent monthly expenses categorically.
5. **Debts & Credits Manager**: All students are faced with lending and borrowing issues. This section helps to easily keep a record of one's current debts & credits.

## Installation

The app is based on Ionic 3 and uses all the standard ionic-cli commands.

1. Install all dependecies: 

  ```bash
  $ sudo npm install
  ```

2. Run the standard ionic-cli commands to start the app.
Example: ionic serve to start a live server.  

```bash
$ ionic serve
```

## Setting up firebase

Currently the app has been set to use my own firebase account for authentication and storage. To use your own firebase account, you need to take the following steps.

1. Set up the project for Bit Buddy on firebase.
2. Replace firebase config object in environment.ts file with your own project details.
3. Copy the rules given in firestore-rules.txt file into your firestore rules.
4. Register your app for google and facebook authentication.
