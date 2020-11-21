import * as React from 'react'
import {useQuery} from 'react-query'

import {useCountry} from '../context/CountryContextProvider'
import ChartMemoed from './Chart/Chart'
import CountryPicker from './CountryPicker/CountryPicker'
import CardsMemoed from './Cards/Cards'
import {CovidErrorBoundary, fakeData} from './utils'

function Covid({data: parentData}) {
  const {pickCountry} = useCountry()
  const [country, setCountry] = pickCountry

  const {status, error, data: countryData} = useQuery(
    [`country`, country],
    () =>
      window
        .fetch(`https://covid19.mathdro.id/api/countries/${country}`)
        .then(async res => await res.json()),
  )

  const [data, setData] = React.useState({...parentData})

  React.useEffect(() => {
    setData(country !== '' ? countryData : parentData)
  }, [country, countryData, parentData])

  if (status === 'loading') return status

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
        <React.Suspense
          fallback={<ChartMemoed data={fakeData} country={country} />}
        >
          <ChartMemoed data={data} country={country} />
        </React.Suspense>
      </CovidErrorBoundary>
    </>
  )
}

export default Covid
