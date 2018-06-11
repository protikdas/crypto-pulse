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
      holdingModalOpen: false
    };
  }

  calculateWalletAmount = () => {
    const { coinsData } = this.state;
    let previousWalletAmount = this.state.walletAmount;
    let walletAmount = 0;
    coinsData.map(coin => {
      if (!isNaN(coin.holding) && !isNaN(coin.price)) {
        return (walletAmount = walletAmount + coin.holding * coin.price);
      }
    });
    walletAmount = walletAmount.toFixed(2);
    this.setState({
      walletAmount,
      previousWalletAmount
    });
  };

  closeModal = () => {
    this.setState({
      addCoinModalOpen: false,
      holdingModalOpen: false
    });
  };

  openHoldingModal = i => {
    this.setState({
      holdingModalOpen: i
    });
  };

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

  openAddCoinModal = () => {
    const { coinsList } = this.state;
    if (coinsList.length) {
      this.setState({
        addCoinModalOpen: true
      });
    }
  };

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
        this.updateCoinValue();
        this.closeModal();
      }
    );
  };

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

  updateCoinValue = () => {
    const { coinsData } = this.state;
    const coins = coinsData.map(coin => coin.acronym);
    api
      .getCoinsValue(coins)
      .then(data => {
        let { coinsData } = this.state;
        coinsData.map((coin, index) => {
          let coinData = this.findCoinData(coin.acronym);
          if (coinData && data[coin.acronym].USD) {
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
        console.log(error.response);
      });
  };

  updateDimensions = () => {
    this.setState({
      viewWidth: window.innerWidth
    });
  };

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

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
    setInterval(() => {
      this.updateCoinValue();
    }, 10000);
  }

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
      coinsList
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
            />
            <div className="coins-container">{coinsJSX}</div>
          </div>
          <SidePanel />
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
        <AddCoinButton action={this.openAddCoinModal} label={true} />
      </div>
    );
  }
}

export default App;
