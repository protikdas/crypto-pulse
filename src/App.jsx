import React, { Component } from "react";
import "./App.less";
import "./css/global.less";

/*<-----API----->*/
import api from "./api";

/*<-----Components----->*/
import Navbar from "./components/Navbar/Navbar";
import SidePanel from "./components/SidePanel/SidePanel";
import Wallet from "./components/Wallet/Wallet";
import Coin from "./components/Coin/Coin";
import AddCoinButton from "./components/AddCoinButton/AddCoinButton";
import AddCoinModal from "./components/AddCoinModal/AddCoinModal";
import UpdateHoldingModal from "./components/UpdateHoldingModal/UpdateHoldingModal";

class App extends Component {
  constructor() {
    super();

    this.state = {
      coinsList: [],
      coinsData: [
        {
          acronym: "BTC"
        },
        {
          acronym: "ETH"
        },
        {
          acronym: "LTC"
        }
      ],
      previousWalletAmount: 0,
      walletAmount: 0,
      addCoinModalOpen: false,
      holdingModalOpen: false,
      chartCoins: ["X", "X"],
      pixelRatio: window.devicePixelRatio
    };
  }

  calculateWalletAmount = () => {
    const { coinsData } = this.state;
    let previousWalletAmount = this.state.walletAmount;
    let walletAmount = 0;
    coinsData.map(coin => {
      if (!isNaN(coin.holding) && !isNaN(coin.price)) {
        return (walletAmount = walletAmount + coin.holding * coin.price);
      } else {
        return walletAmount;
      }
    });
    walletAmount = walletAmount.toFixed(2);
    this.setState({
      walletAmount,
      previousWalletAmount
    });
  };

  //Open and Close Modals
  openAddCoinModal = () => {
    const { coinsList } = this.state;
    if (coinsList.length) {
      this.setState({
        addCoinModalOpen: true
      });
    }
  };

  openHoldingModal = i => {
    this.setState({
      holdingModalOpen: i
    });
  };

  closeModal = () => {
    this.setState({
      addCoinModalOpen: false,
      holdingModalOpen: false
    });
  };

  //Update holding amount for a coin
  updateHolding = (index, coin) => {
    let coinsData = Array.from(this.state.coinsData);
    coinsData[index] = coin;
    this.setState(
      {
        coinsData
      },
      () => {
        this.calculateWalletAmount();
        this.closeModal();
      }
    );
  };

  //Add New Coin
  addCoin = coin => {
    let coinsData = Array.from(this.state.coinsData);
    let checkExists = coinsData.findIndex(c => c.acronym === coin.acronym);
    if (checkExists === -1) {
      coinsData.push(coin);
    }
    this.setState(
      {
        coinsData
      },
      () => {
        this.updateCoinValue("new");
        this.closeModal();
      }
    );
  };

  //Delete Coin from List
  deleteCoin = index => {
    let coinsData = Array.from(this.state.coinsData);
    coinsData.splice(index, 1);
    this.setState(
      {
        coinsData
      },
      () => {
        this.updateCoinValue();
      }
    );
  };

  //Retrieve Coin MetaData from all coins list
  findCoinData = coinAcronym => {
    const { coinsList, coinsData } = this.state;
    let coinIndex = coinsList.findIndex(coin => coin.acronym === coinAcronym);
    if (coinIndex !== -1) {
      return coinsList[coinIndex];
    } else {
      let badCoinIndex = coinsData.findIndex(
        coin => coin.acronym === coinAcronym
      );
      let newCoinsData = Array.from(coinsData);
      if (badCoinIndex > -1) {
        newCoinsData.splice(badCoinIndex, 1);
      }
      this.setState({
        coinsData: newCoinsData
      });
      return false;
    }
  };

  //Call API to update value of coin
  updateCoinValue = time => {
    const { coinsData } = this.state;
    const coins = coinsData.map(coin => coin.acronym);
    api
      .getCoinsValue(coins)
      .then(data => {
        let { coinsData } = this.state;
        coinsData.map((coin, index) => {
          let coinData = this.findCoinData(coin.acronym);
          if (coinData && data[coin.acronym].USD) {
            //Push time and price to exisiting priceHistory
            if (time === "update") {
              let priceHistory = Array.from(coinData.priceHistory);
              priceHistory.push({
                time: priceHistory[priceHistory.length - 1].time + 10,
                price: data[coin.acronym].USD
              });
              coinData.priceHistory = priceHistory;
            }
            //Create priceHistory with empty data for new coin (for comparison)
            if (time === "new" && index === coinsData.length - 1) {
              let notApplicableIntervals = 0;
              let intervalsLengths = [];
              let priceHistory = [];
              coinsData.map(coin => {
                if (coin.priceHistory) {
                  intervalsLengths.push(coin.priceHistory.length);
                }
              });
              if (intervalsLengths) {
                let maxIntervals = Math.max(...intervalsLengths);
                for (let i = 0; i < maxIntervals; i++) {
                  priceHistory.push({ time: i * 10, price: "N/A" });
                }
              }
              coinData.priceHistory = priceHistory;
            }
            coinData.previousPrice = coinData.price;
            coinData.price = data[coin.acronym].USD;
          }
          return (coinsData[index] = coinData);
        });
        this.setState(
          {
            coinsData
          },
          () => {
            this.calculateWalletAmount();
          }
        );
      })
      .catch(error => {
        console.log(error);
      });
  };

  //Show/Hide Chart
  toggleChart = (e, index) => {
    let chartCoins = Array.from(this.state.chartCoins);
    const checkExists = chartCoins.indexOf(index);
    if (checkExists === -1) {
      chartCoins.unshift(index);
      chartCoins.splice(chartCoins.length - 1, 1);
      chartCoins.sort(function(a, b) {
        return a - b;
      });
    } else {
      chartCoins[checkExists] = "X";
    }
    this.setState({
      chartCoins
    });
  };

  //Record width of screen on app load, and browser resize
  updateDimensions = () => {
    this.setState({
      viewWidth: window.innerWidth
    });
  };

  /*
    Get all coins list (avatar, acronym, coin name), 
    fetch price for initial coins, set holding to 0, 
    initiate price history array
  */
  componentWillMount() {
    api
      .getCoinList()
      .then(coinsList => {
        this.setState({
          coinsList
        });
      })
      .then(() => {
        const coinsArray = this.state.coinsData.map(coin => coin.acronym);
        return api.getCoinsValue(coinsArray);
      })
      .then(data => {
        let { coinsData } = this.state;
        coinsData.map((coin, index) => {
          let coinData = this.findCoinData(coin.acronym);
          if (coinData && data[coin.acronym].USD) {
            coinData.price = data[coin.acronym].USD;
            coinData.holding = 0;
            coinData.priceHistory = [
              { time: 0, price: data[coin.acronym].USD }
            ];
          }
          return (coinsData[index] = coinData);
        });
        this.setState({
          coinsData
        });
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  /*
    Activate window resize event listener, 
    declare setInterval method to call UpdateCoinValue function every 10 seconds
  */
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
    setInterval(() => {
      this.updateCoinValue("update");
    }, 10000);
  }

  /*
    Remove window resize event listener when app is shut down
  */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    const {
      viewWidth,
      coinsData,
      previousWalletAmount,
      walletAmount,
      addCoinModalOpen,
      holdingModalOpen,
      coinsList,
      chartCoins,
      pixelRatio
    } = this.state;
    let coinsJSX;

    coinsJSX = coinsData.map((coinData, index) => {
      const { acronym, name, avatar, price, previousPrice, holding } = coinData;
      return (
        <Coin
          key={index}
          index={index}
          viewWidth={viewWidth}
          acronym={acronym}
          avatar={avatar}
          name={name}
          holding={holding}
          price={price}
          previousPrice={previousPrice}
          deleteCoin={this.deleteCoin}
          openHoldingModal={this.openHoldingModal}
          toggleChart={this.toggleChart}
          chartCoins={chartCoins}
        />
      );
    });

    return (
      <div className="App">
        <Navbar />
        <div className="app-container">
          <div className="portfolio-container">
            <Wallet
              viewWidth={viewWidth}
              amount={walletAmount}
              previousAmount={previousWalletAmount}
              pixelRatio={pixelRatio}
            />
            <div className="coins-container">{coinsJSX}</div>
            <AddCoinButton action={this.openAddCoinModal} label={true} />
          </div>
          <SidePanel coinsData={coinsData} chartCoins={chartCoins} />
          {addCoinModalOpen && (
            <AddCoinModal
              closeModal={this.closeModal}
              coinsList={coinsList}
              viewWidth={viewWidth}
              addCoin={this.addCoin}
            />
          )}
          {holdingModalOpen !== false && (
            <UpdateHoldingModal
              closeModal={this.closeModal}
              coin={coinsData[holdingModalOpen]}
              index={holdingModalOpen}
              updateHolding={this.updateHolding}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
