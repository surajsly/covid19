import React from "react";
import Cards from "./components/Cards/Cards";
import Chart from "./components/Chart/Chart";
import CountryPicker from "./components/CountryPicker/CountryPicker";
import styles from "./App.module.css";
import { fetchData } from "./api/index";

class App extends React.Component {
  state = {
    data: {},
    country: "",
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country: country });
  };

  render() {
    const { data } = this.state;
    return (
      <div className={styles.container}>
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Cards data={data} />
        <Chart data={this.state.data} country={this.state.country} />
      </div>
    );
  }
}

export default App;
