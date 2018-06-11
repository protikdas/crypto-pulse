import React, { Component } from "react";
import "./UpdateHoldingModal.less";

export default class UpdateHoldingModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentHolding: props.coin.holding,
      holding: props.coin.holding,
      update: "disabled"
    };
  }

  handleChange = e => {
    let value = e.target.value.replace(/[^\d.-]/g, "");
    this.setState(
      {
        [e.target.name]: value
      },
      () => {
        let update = "disabled";
        const { holding } = this.state;
        let holdingFloat = parseFloat(holding);
        const { currentHolding } = this.state;
        if (holding !== "" && currentHolding !== holdingFloat) {
          update = "enabled";
        }
        this.setState({
          holding: value,
          update
        });
      }
    );
  };

  updateHolding = () => {
    let { coin, index } = this.props;
    const { holding } = this.state;
    coin.holding = parseFloat(holding);
    this.props.updateHolding(index, coin);
  };

  render() {
    const { coin } = this.props;
    const { acronym, avatar, name } = coin;
    const { holding, update } = this.state;

    return (
      <div className="modal-container">
        <div className="modal-click-out" onClick={this.props.closeModal} />
        <div className="modal holding-modal">
          <div className="modal-coin">
            <img className="coin-avatar" src={avatar} alt="" />
            <div className="coin-identity">
              <h2 className="coin-acronym">{acronym}</h2>
              <p className="coin-name">{name}</p>
            </div>
          </div>
          <label className="modal-label">Holding</label>
          <input
            className="modal-input holding-input"
            name="holding"
            value={holding}
            onChange={this.handleChange}
          />
          <button
            className={`update-button ${update}`}
            disabled={!update}
            onClick={this.updateHolding}
          >
            Update
          </button>
        </div>
      </div>
    );
  }
}
