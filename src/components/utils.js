import React from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {ReactQueryErrorResetBoundary} from 'react-query'

function createResource(promise) {
  let status = 'pending'
  let result = promise.then(
    resolved => {
      status = 'resolved'
      result = resolved
    },
    rejected => {
      status = 'rejected'
      result = rejected
    },
  )
  return {
    read() {
      if (status === 'pending') throw result
      if (status === 'rejected') throw result
      if (status === 'resolved') return result
      throw new Error('Impossible')
    },
  }
}

function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function CovidErrorBoundary(parentProps) {
  const canReset = Boolean(parentProps.onReset || parentProps.resetKeys)
  return (
    <ReactQueryErrorResetBoundary>
      {({reset}) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={props => (
            <ErrorFallback canReset={canReset} {...props} />
          )}
          {...parentProps}
        />
      )}
    </ReactQueryErrorResetBoundary>
  )
}

const fakeCountryData = {
  confirmed: {value: 0},
  recovered: {value: 0},
  deaths: {value: 0},
  lastUpdate: '11-11-1111',
}

const fakeDailyData = {
  confirmed: [9999, 9999, 9999, 9999, 9999],
  deaths: [9999, 9999, 9999, 9999, 9999],
  date: ['XX-XX-XXXX', 'XX-XX-XXXX', 'XX-XX-XXXX', 'XX-XX-XXXX', 'XX-XX-XXXX'],
}

export {CovidErrorBoundary, createResource, fakeDailyData, fakeCountryData}
