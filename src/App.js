import React, { Component } from 'react';
import logo from './logo.jpg';
import './App.css';
import Button from './presentation/button';
import Select from './presentation/select';
import Header from './components/header';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      conversionRates: [],
      fromCurrency: "USD",
      fromCurrencyValue: 1,
      toCurrencyValue: 1,
      toCurrency: 'USD'
    }
    this.conversionRate = 1;
    console.log('ctor')
  }

  componentWillMount() {
    console.log('will mount');
    this.setState({ conversionRates: this.getConversionRates() });
  }

  render() {
    console.log('render')
    return (
      <div className="App">
        <Header logo={logo} title="Exchange Rate Calculator"
          subTitle="Choose the currency and the amounts to get the exchange rate">
        </Header>
        <div className="currency">
          <Select value={this.state.fromCurrency}
            options={this.state.conversionRates}
            onChange={this.onFromCurrencyChange}></Select>

          <input className="input"
            type="number" defaultValue="1" onChange={this.onCurrencyValueChange}></input>
        </div>
        <div className="swap-rate-container">
          <Button label="SWAP" onClick={this.onSwapClick}></Button>
          <div className="rate">1 {this.state.fromCurrency} = {this.conversionRate} {this.state.toCurrency}
          </div>
        </div>
        <div className="currency">
          <Select value={this.state.toCurrency}
            options={this.state.conversionRates}
            onChange={this.onTargetCurrencyChange}></Select>
          <input className="input"
            type="number" step="0.01" readOnly defaultValue="1" value={this.state.toCurrencyValue}></input>
        </div>
      </div>
    );
  }
  onFromCurrencyChange = (e) => {
    let selectedCurrency = e.target.value;
    this.setState({ fromCurrency: selectedCurrency });
    this.conversionRate = this.getConversionRate('USD', selectedCurrency, this.state.toCurrency);
    this.setState({ toCurrencyValue: this.conversionRate * this.state.fromCurrencyValue });
  }

  onTargetCurrencyChange = (e) => {
    let selectedCurrency = e.target.value;
    this.setState({ toCurrency: selectedCurrency });
    this.conversionRate = this.getConversionRate('USD', this.state.fromCurrency, selectedCurrency);
    this.setState({ toCurrencyValue: this.conversionRate * this.state.fromCurrencyValue });
  }

  onCurrencyValueChange = (e) => {
    this.setState({ fromCurrencyValue: e.target.value, toCurrencyValue: (e.target.value * this.conversionRate) })
  }

  onSwapClick = () => {
    let toCurrency = this.state.fromCurrency,
      fromCurrency = this.state.toCurrency;
    this.conversionRate = this.getConversionRate('USD', fromCurrency, toCurrency);
    this.setState({ toCurrency, fromCurrency, toCurrencyValue: this.state.fromCurrencyValue * this.conversionRate });
  }

  getConversionRate = (baseCurrency, fromCurrency, toCurrency) => {
    return ((this.state.conversionRates[baseCurrency] / this.state.conversionRates[fromCurrency]) * this.state.conversionRates[toCurrency]).toFixed(6);
  }
  getCurrencyCode = () => {
    fetch('https://openexchangerates.org/api/currencies.json')
      .then(res => res.json())
      .then((data) => {
        return { data: data }
        // this.setState({ currencyCode: data })
      })
      .catch(console.log);
  }

  getConversionRates = () => {
    fetch('https://api.exchangerate-api.com/v6/latest')
      .then(res => res.json())
      .then((data) => {
        console.log(data)
        //console.log(data.rates[targetCurrency]);
        //this.conversionRate = data.rates[targetCurrency]
        this.setState({ conversionRates: data.rates }, () => {
          console.log(this.state.conversionRates)
        });
        // return data.rates;
      })
      .catch(console.log)
  }
}

