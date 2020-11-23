import * as React from 'react'
import {useQuery} from 'react-query'

import {useCountry} from '../context/CountryContextProvider'
import {useReactQuery} from '../api'
import ChartMemoed from './Chart/Chart'
import CountryPicker from './CountryPicker/CountryPicker'
import CardsMemoed from './Cards/Cards'
import {CovidErrorBoundary, fakeData} from './utils'

function Covid() {
  const {pickCountry} = useCountry()
  const [country, setCountry] = pickCountry

  const {isLoading, error, data: parentData} = useReactQuery()
  const {status, err, data: countryData} = useQuery([`country`, country], () =>
    window
      .fetch(`https://covid19.mathdro.id/api/countries/${country}`)
      .then(async res => await res.json()),
  )

  const [data, setData] = React.useState({...parentData})

  if (isLoading || status === 'loading') throw Promise

  if (error) throw error
  if (err) throw err

  React.useEffect(() => {
    setData(country !== '' ? countryData : parentData)
  }, [country, countryData, parentData])

  // if (status === 'loading') return status
  if (status === 'loading') throw Promise

  if (error) throw error

  return (
    <>
      <CovidErrorBoundary>
        <React.Suspense fallback={<CardsMemoed data={fakeData} />}>
          <CardsMemoed data={data} />
        </React.Suspense>
      </CovidErrorBoundary>
      <CountryPicker
        handleCountryChange={country => setCountry(country)}
        country={country}
      />
      <CovidErrorBoundary>
        <React.Suspense fallback={<div>loading...</div>}>
          <ChartMemoed data={data} country={country} />
        </React.Suspense>
      </CovidErrorBoundary>
    </>
  )
}

export default Covid
