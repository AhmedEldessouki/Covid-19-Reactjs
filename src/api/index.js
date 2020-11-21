import axios from 'axios'
import {useQuery} from 'react-query'

const url = 'https://covid19.mathdro.id/api'

export const fetchData = async country => {
  let changeableUrl = url
  if (country) {
    changeableUrl = `${url}/countries/${country}`
  }
  return window.fetch(changeableUrl)
}

export const fetchDailyData = async () => {
  try {
    const {data} = await axios.get(`${url}/daily`)
    const modifiedData = data.map(dailyData => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }))
    return modifiedData
  } catch (error) {
    console.log(error)
  }
}

export const fetchCountries = async () => {
  try {
    const {
      data: {countries},
    } = await axios.get(`${url}/countries`)

    return countries.map(countries => countries.name)
  } catch (error) {
    console.log(error)
  }
}

export function useReactQuery() {
  const {isLoading, error, data} = useQuery(
    'repoData',
    () => window.fetch(url).then(res => res.json()),
    {
      retry: 5,
    },
  )
  if (isLoading) return 'isLoading...'
  if (error) throw error
  return {data}
}

export function useReactQueryCountry(country) {
  const fetchUrl = `${url}/countries/${country}`

  const {isLoading, error, data} = useQuery(
    [`selectedCountry`, country],
    () => window.fetch(fetchUrl).then(res => res.json()),
    {
      retry: 5,
    },
  )
  if (isLoading) return 'isLoading...'
  if (error) throw error
  return {isLoading, error, data}
}
