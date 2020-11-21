import React from 'react'
import {QueryCache, ReactQueryCacheProvider} from 'react-query'

const queryCache = new QueryCache()

export default function ReactQuery(props) {
  return <ReactQueryCacheProvider queryCache={queryCache} {...props} />
}
