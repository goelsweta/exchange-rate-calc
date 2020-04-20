import React, { Component } from 'react';
import logo from './images/money.png'
import './App.css';
import CustomButton from './presentation/button';
import CustomSelect from './presentation/select';
import Header from './components/header';
import Input from './presentation/input';
import Box from '@material-ui/core/Box';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      conversionRates: [],
      fromCurrency: "USD",
      fromCurrencyValue: 1,
      toCurrencyValue: 1,
      toCurrency: "USD"
    }
    this.conversionRate = 1;
  }

  componentDidMount() {
    this.setState({ conversionRates: this.getConversionRates() });
  }

  render() {
    return (
      <div className="App">
        <Header logo={logo} title="Exchange Rate Calculator"
          subTitle="Choose the currency and the amounts to get the exchange rate">
        </Header>
        <div>
          <CustomSelect lblId="lbl-from-currency"
            id="from-currency"
            value={this.state.fromCurrency}
            options={this.state.conversionRates}
            onChange={this.onFromCurrencyChange}></CustomSelect>
          <Input onChange={this.onCurrencyValueChange}></Input>
        </div>

        <div>
          <CustomButton label="SWAP" onClick={this.onSwapClick}></CustomButton>
          <Box component="div" display="inline">
            1 {this.state.fromCurrency} = {this.conversionRate} {this.state.toCurrency}
          </Box>
        </div>
        <div>
          <CustomSelect lblId="lbl-to-currency"
            id="to-currency"
            value={this.state.toCurrency}
            options={this.state.conversionRates}
            onChange={this.onTargetCurrencyChange}></CustomSelect>
          <Input disabled value={this.state.toCurrencyValue}
            onChange={this.onCurrencyValueChange}></Input>
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
      })
      .catch(console.log);
  }

  getConversionRates = () => {
    fetch('https://api.exchangerate-api.com/v6/latest')
      .then(res => res.json())
      .then((data) => {
        this.setState({ conversionRates: data.rates });
      })
      .catch(console.log)
  }
}

