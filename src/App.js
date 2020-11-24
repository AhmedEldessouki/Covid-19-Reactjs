import * as React from 'react'
import './App.css'
import {ReactQueryDevtools} from 'react-query-devtools'

import covedImage from './images/image.png'

import Covid from './components/Covid'
import {CountryContextProvider} from './context/CountryContextProvider'
import ReactQuery from './context/ReactQuery'
import CardsMemoed from './components/Cards/Cards'
import {fakeCountryData} from './components/utils'

function App() {
  return (
    <section className="App">
      <header className="App-header">
        <title>COVID-19</title>
        <img className="image" src={covedImage} alt="COVID-19" />
        <ReactQuery>
          <React.Suspense fallback={<CardsMemoed data={fakeCountryData} />}>
            <CountryContextProvider>
              <Covid />
            </CountryContextProvider>
          </React.Suspense>
        </ReactQuery>
      </header>
      <ReactQueryDevtools initialIsOpen />
    </section>
  )
}

export default App
