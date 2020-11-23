import React from 'react'
import {Bar, Line} from 'react-chartjs-2'
import Chart from 'chart.js'
import {fetchDailyData} from '../../api'
import {createResource} from '../utils'
import styles from './Chart.module.css'

const dailyDataResource = createResource(fetchDailyData())

const ChartX = ({data = {}, country}) => {
  const dailyData = dailyDataResource.read()
  const dailyDataFiltered = {
    dateArr: [],
    confirmedArr: [],
    deathsArr: [],
  }

  if (typeof dailyData === 'object') {
    dailyData.map(({confirmed, date, deaths}, i) => {
      dailyDataFiltered.dateArr.push(date)
      dailyDataFiltered.confirmedArr.push(confirmed)
      dailyDataFiltered.deathsArr.push(deaths)
    })
  }

  if (country) {
    const {confirmed, recovered, deaths} = data
    return (
      <Bar
        data={{
          labels: ['Infected', 'Recovered', 'Deaths'],
          datasets: [
            {
              label: 'people',
              backgroundColor: [
                'rgba(0, 0, 225, 0.5)',
                'rgba(0, 255, 0, 0.5)',
                'rgba(255, 0, 0, 0.5)',
              ],
              data: [confirmed.value, recovered.value, deaths.value],
            },
          ],
        }}
        options={{
          legend: {display: false},
          title: {display: true, text: `Current state in ${country}`},
        }}
      />
    )
  }
  return (
    <Line
      data={{
        labels: dailyDataFiltered.dateArr,
        datasets: [
          {
            data: dailyDataFiltered.confirmedArr,
            label: 'Infected',
            borderColor: '#3333ff',
            fill: true,
          },
          {
            data: dailyDataFiltered.deathsArr,
            label: 'Deaths',
            borderColor: 'rgba(255,0,0,0.5)',
            fill: true,
          },
        ],
      }}
    />
  )
}

const ChartMemoed = React.memo(ChartX)

export default ChartMemoed
