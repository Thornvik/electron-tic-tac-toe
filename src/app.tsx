import React from 'react'
import * as ReactDOMClient from 'react-dom/client'

const container = document.getElementById('app')

const root = ReactDOMClient.createRoot(container)

root.render(<h1>hello world</h1>)
