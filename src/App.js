import * as React from 'react'
import './App.css'
import {ReactQueryDevtools} from 'react-query-devtools'

import covedImage from './images/image.png'

import {useReactQuery} from './api'
import Covid from './components/Covid'
import {CountryContextProvider} from './context/CountryContextProvider'
import ReactQuery from './context/ReactQuery'

function App() {
  const {isLoading, error, data} = useReactQuery()

  // if (isLoading) return "loading";

  if (error) throw error.message

  return (
    <section className="App">
      <header className="App-header">
        <title>COVID-19</title>
        <img className="image" src={covedImage} alt="COVID-19" />
        <ReactQuery>
          <CountryContextProvider>
            <Covid data={data} />
          </CountryContextProvider>
        </ReactQuery>
      </header>
      <ReactQueryDevtools initialIsOpen />
    </section>
  )
}

export default App
