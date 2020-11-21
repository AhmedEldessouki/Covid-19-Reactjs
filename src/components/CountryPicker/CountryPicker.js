import * as React from 'react'
import {NativeSelect, FormControl} from '@material-ui/core'

import {useCountry} from '../../context/CountryContextProvider'
import styles from './CountryPicker.module.css'

const CountryPicker = ({handleCountryChange, country}) => {
  const {countryList} = useCountry()

  return (
    <FormControl className={styles.formControl}>
      <NativeSelect
        defaultValue={country}
        onChange={e => {
          handleCountryChange(e.target.value)
        }}
        style={{backgroundColor: ' #282c34', color: 'cornflowerblue'}}
      >
        <option value="">Global</option>
        {countryList.map((country, i) => (
          <option key={i} value={country}>
            {country}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  )
}

export default CountryPicker
