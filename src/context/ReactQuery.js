import React from 'react'
import {QueryCache, ReactQueryCacheProvider} from 'react-query'

const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      retry: 5,
      suspense: true,
    },
  },
})

export default function ReactQuery(props) {
  return <ReactQueryCacheProvider queryCache={queryCache} {...props} />
}
