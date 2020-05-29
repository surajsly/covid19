import React from "react";

import SentimentChartPie from "./components/sentimentChart/sentimentChartPie";
import SentimentChart from "./components/sentimentChart/sentimentChart";
import Map from "./components/Map/Map";
import Cards from "./components/Cards/Cards";
import Chart from "./components/Chart/Chart";
import CountryPicker from "./components/CountryPicker/CountryPicker";
import styles from "./App.module.css";
import { fetchData } from "./api/index";
import image from "./images/grayed.png";
import imageSentimentAnalysis from "./images/sentimentAnalysis.png";
import OutsideLinks from "./components/OutsideLinks/OutsideLinks";
import IncidentRate from "./components/IncidentRate/IncidentRate";
import Footer from "./components/Footer/Footer";

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
        <img src={image} className={styles.imageClass} alt="Logo" />
        <h3 className={styles.mapHeading}>Coronavirus Map</h3>
        <Map />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Cards data={data} />
        <Chart data={this.state.data} country={this.state.country} />
        <IncidentRate />
        <img
          src={imageSentimentAnalysis}
          className={styles.imageClass}
          alt="Logo"
        />
        <SentimentChart />
        <SentimentChartPie />
        <OutsideLinks />
        <Footer />
      </div>
    );
  }
}

export default App;
