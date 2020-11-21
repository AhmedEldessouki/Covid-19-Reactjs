import React from 'react'
import {ErrorBoundary} from 'react-error-boundary'

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
    <ErrorBoundary
      fallbackRender={props => <ErrorFallback canReset={canReset} {...props} />}
      {...parentProps}
    />
  )
}

const fakeData = {
  confirmed: {value: 11111},
  recovered: {value: 11111},
  deaths: {value: 11111},
}

export {CovidErrorBoundary, createResource, fakeData}
