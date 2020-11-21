import React from 'react'
import {useQuery} from 'react-query'

const countriesContext = React.createContext()

function CountryContextProvider(props) {
  const {isLoading, error, data} = useQuery('countryData', () =>
    fetch('https://covid19.mathdro.id/api/countries').then(res => res.json()),
  )
  if (isLoading) return 'isLoading...'
  if (error) throw error
  return (
    <countriesContext.Provider
      value={{isLoading, error, countriesData: data}}
      {...props}
    />
  )
}

function useCountry() {
  const {isLoading, error, countriesData} = React.useContext(countriesContext)
  const [country, setCountry] = React.useState('')
  const countryList = countriesData.countries.map(country => country.name)

  if (!{isLoading, error, countriesData})
    throw new Error(`you need to add countriesContext`)

  return {
    isLoading,
    error,
    countriesData,
    countryList,
    pickCountry: [country, setCountry],
  }
}

export {CountryContextProvider, useCountry}
