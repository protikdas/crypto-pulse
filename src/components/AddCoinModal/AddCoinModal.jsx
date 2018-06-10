import React, { Component } from "react";
import "./AddCoinModal.less";

import AddCoinButton from "../AddCoinButton/AddCoinButton";

export default class AddCoinModal extends Component {
  constructor() {
    super();

    this.state = {
      search: "",
      status: "disabled",
      suggestions: [],
      selected: []
    };
  }

  removeDuplicates = suggestions => {
    let duplicateFreeSuggestions = [];
    for (let i = 0; i < suggestions.length; i++) {
      let coin = suggestions[i];
      let coinAlreadyExists = duplicateFreeSuggestions.findIndex(
        c => c.acronym === coin.acronym
      );
      if (coinAlreadyExists === -1) {
        duplicateFreeSuggestions.push(coin);
      }
    }
    return duplicateFreeSuggestions;
  };

  selectCoin = (e, i) => {
    const { suggestions, selected } = this.state;
    const checkExists = selected.findIndex(
      c => c.acronym === suggestions[i].acronym
    );
    if (checkExists === -1) {
      let newSelected = [];
      let coin = suggestions[i];
      coin.holding = 0;
      newSelected.push(suggestions[i]);
      this.setState({
        selected: newSelected,
        status: "enabled"
      });
    } else {
      this.setState({
        selected: [],
        status: "disabled"
      });
    }
  };

  lookUpCoin = () => {
    const { coinsList } = this.props;
    const { search } = this.state;
    let suggestions = [];
    const length = search.length;
    if (length > 0) {
      coinsList.reduce((a, e, i) => {
        if (
          e.acronym.substr(0, length).toUpperCase() === search.toUpperCase()
        ) {
          suggestions.push(e);
        }
        return suggestions;
      }, []);
      coinsList.reduce((a, e, i) => {
        if (e.name.substr(0, length).toUpperCase() === search.toUpperCase()) {
          suggestions.push(e);
        }
        return suggestions;
      }, []);
      if (suggestions.length) {
        suggestions.sort((a, b) => {
          return a.name.length - b.name.length;
        });
        suggestions.sort((a, b) => {
          return a.acronym.length - b.acronym.length;
        });
        let exactMatchIndex = suggestions.findIndex(
          e => e.acronym.toUpperCase() === search.toUpperCase()
        );
        if (exactMatchIndex !== -1) {
          suggestions.unshift(suggestions[exactMatchIndex]);
          suggestions.splice(exactMatchIndex + 1, 1);
        } else {
          exactMatchIndex = suggestions.findIndex(
            e => e.name.toUpperCase() === search.toUpperCase()
          );
          if (exactMatchIndex !== -1) {
            suggestions.unshift(suggestions[exactMatchIndex]);
            suggestions.splice(exactMatchIndex + 1, 1);
          }
        }
      }
      suggestions = this.removeDuplicates(suggestions);
      this.setState({
        suggestions
      });
    }
  };

  handleChange = e => {
    this.setState(
      {
        search: e.target.value,
        status: "disabled"
      },
      () => {
        if (!this.state.search) {
          this.setState({
            suggestions: []
          });
        } else {
          this.lookUpCoin();
        }
      }
    );
  };

  render() {
    const { search, status, suggestions, selected } = this.state;
    const { viewWidth, addCoin } = this.props;

    let suggestionsJSX = [];

    if (suggestions.length) {
      let maxCount = 7;
      if (viewWidth < 550) {
        maxCount = 4;
      }
      for (let i = 0; i < maxCount; i++) {
        let coin = suggestions[i];
        if (coin) {
          const { acronym, name, avatar } = coin;
          let selectedStatus = "";
          if (selected.findIndex(c => c.acronym === acronym) !== -1) {
            selectedStatus = "selected";
          }
          suggestionsJSX.push(
            <div
              className={`suggestion-container ${selectedStatus}`}
              key={i}
              onClick={e => this.selectCoin(e, i)}
            >
              <div className="suggestion-left">
                <img className="suggestion-avatar" src={avatar} alt="" />
                <h3>{acronym}</h3>
              </div>
              <p>{name}</p>
            </div>
          );
        }
      }
    }

    return (
      <div className="modal-container">
        <div className="modal-click-out" onClick={this.props.closeModal} />
        <div className="modal">
          <h1>Add Coin</h1>
          <input
            className="modal-input"
            name="acronym"
            placeholder="Search Coin | BTC, Ethereum..."
            value={search}
            onChange={this.handleChange}
          />
          {suggestionsJSX}
          <AddCoinButton status={status} action={() => addCoin(selected[0])} />
        </div>
      </div>
    );
  }
}
