# Crypto Pulse

Crypto Pulse is a web application for cryptocurrency buyers to track the real-time value of their coins in USD.

##Live Demo

Link to App: [Crypto Pulse](http://cryptopulse.herokuapp.com)

_Please wait for about 15 seconds as the free Heroku server fires up to for the app._

##Getting Started

###Prerequisites
#####Node and NPM

###Installation
#####From Zip File

Uncompress the Zip File. From the command line interface of your computer, navigate to the uncompressed folder, and enter the following command:

```
$ npm install
```

Node Package Manager will now install all the required dependencies for the app.

#####From Github Repository
If you have the Git CLI installed on your computer, from the command line interface, you can clone the git repository of the app by entering the following command:

```
$ git clone https://github.com/protikdas/crypto-pulse.git
```

Once the download is completed, navigate to the app folder, and enter the following command:

```
$ npm install
```

###Start
After the installation is complete, enter the following command:

```
$ npm start
```

This command will start a local development server on your computer, and the app can be accessed from a browser at:
_http://localhost:3000_

###Build for Production

To bundle all the JSX code and process all the Less code to CSS, enter the following command:

```
$ npm run build
```

A build folder will be created once the build process is completed, the build folder can then be deployed to a app hosting service of choice.

##Built With

- React (JavaScript library)

  React was chosen as the JavaScript library to quickly render different views based on user interaction and changes in data in the app. It was also possible to make the app very modular and pass down properties to different child components that depend on the same data from a high level component (App -> Wallet, Coin, Chart etc).

- LESS (CSS Preprocessor)

  Less was used to declare variables that stored different colors and fonts that were used globally throughout the font. A webpack precompiler script was added to compile the LESS code to broswer readable CSS code.

- Recharts (Charting Library for React)

      	Recharts was used to render the line charts depicting the price changes of selected coins. This charting library is very customizable and it was possible to change the color and font schemes according to the project theme quite easily. The charts accepted dynamic arrays and could be scaled according to data requirements. This was essential to plot the fluctuating price data against time.

##API

- CryptoCompare

      The CryptoCompare API was used to fetch metadata (acronym, avatar and name) of over 2000 cryptocurrencies available. The GET request was sent to:

      ```
      https://www.cryptocompare.com/api/data/coinlist/
      ```

  The above api route does not allow a devserver without CORS headers to make a call to it. Therefore, the GET request was proxied as follows:

      ```
      https://cors-anywhere.herokuapp.com/https://www.cryptocompare.com/api/data/coinlist/
      ```

      The CryptoCompareAPI was also used to fetch real time price data for select cryptocurrencies every 10 seconds, and on adding/deleting coins or updating number of a certain coin the user is holding. The GET request (for eg. BTC, ETH, LTC) was sent to:

      ```
      https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD`
      ```

##Project Extension
Currently, Crypto Pulse is a fun basic playground for cryptocurrency owners to track the trend of their currencies in real time, and compare the changes in prices of two different coins using the two chart views available. There is, however, a lot of room for extending the project. Some ideas have been brainstormed below.

- Database

      	A database can be set up for the application, so that users are able to save the number of coins they are holding and also keep track of the historical balance of their cryptocurrency portfolio.

      	Price data collected and stored for different cryptocurrencies can also be depicted on user friendly line charts, and this might help the user to speculate the price of their currencies intuitively.

- Authentication

      	A token-based authorization system can also be set up once the database is designed to save user authentication information (email, username, password). This will allow only authenticated users to view their own portfolios, save portfolio balance and other data.

      	The app would be much more useful to a user if they did not have to add their coins and number of coins they are holding every time visit the application.

- Live Prices
  Currently, the app is programmed to fetch the price data of selected cryptocurrencies every 10 seconds. The CryptoCompare API has a web socket that Crypto Pulse can connect to in order to receive real-time market data updates. This would be benefitial because the data would always be fresh.
- Responsive Web Design and Better User Interface

      	Some care has been taken to allow the app to be used on different screen resolutions and screen sizes. However, the design is in no way 100% user friendly for all screens. Having a designer design the different views of the app is almost always better than a developer quickly putting together what s/he thinks looks acceptable. (Colors would not be all over the place as well.)

      	The user interface should be redesigned for better accessibility. The app was built while previewing on a high resolution retina display. It looks a little bulky on lower resolution screens. Other intuitive ways of using the app (eg. firing "Accept" events when the Return key is pressed) can also be implemented.

- Code Refactoring

      	Crypto Pulse was built a little like how an oil painting is created (Hackers and Painters - Paul Graham Reference). As features were thought of, code was added in. Famous oil painters paint over and over their original ideas until they think the painting looks just right.

      	Although all components were built to do as few things as possible, a lot more thought can be put into refactoring the code and redesigning the architecture of the application for better readablity and collaboration.

- Social

      	Wouldn't it be more fun to use Crypto Pulse if cryptocurrency aficionados could upload pictures of themselves, their dogs (may be cats), and message their friends about the new hot coin or unexpected trend they just spotted on a chart in the app?

##Author

- Protik Das (Email: protikdas@hotmail.com)

##License
This project is licensed under the MIT License
