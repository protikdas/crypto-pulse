import axios from "axios";

export default {
  getCoinList: () => {
    return axios
      .get(
        "https://cors-anywhere.herokuapp.com/https://www.cryptocompare.com/api/data/coinlist/"
      )
      .then(response => {
        if (response.status === 200) {
          let coinsArray = [];
          let data = response.data.Data;
          for (let key in data) {
            let coin = data[key];
            let coinObject = {
              acronym: coin.Symbol,
              name: coin.CoinName,
              avatar: "https://www.cryptocompare.com" + coin.ImageUrl
            };
            coinsArray.push(coinObject);
          }
          return coinsArray;
        }
      });
  },
  getCoinsValue: coinArray => {
    return axios
      .get(
        `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${coinArray.toString()}&tsyms=USD`
      )
      .then(response => {
        if (response.status === 200) {
          return response.data;
        }
      });
  }
};
