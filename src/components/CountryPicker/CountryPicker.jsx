import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import cx from "classnames";

import styles from "./CountryPicker.module.css";
import { fetchCountries } from "../../api/index";
const CountryPicker = ({ handleCountryChange }) => {
  const [fetchedcountries, setFetchedCountries] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setFetchedCountries(await fetchCountries());
    };
    fetchAPI();
  }, [setFetchedCountries]);

  return (
    <FormControl className={cx(styles.formcontrol, styles.selectContainer)}>
      <NativeSelect
        className={styles.optionSelected}
        defaultValue=""
        onChange={(e) => handleCountryChange(e.target.value)}
      >
        <option value="">Global</option>
        {fetchedcountries.map((country, i) => (
          <option key={i} value={country}>
            {country}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};
export default CountryPicker;
