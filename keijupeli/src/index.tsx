import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './layout/App'
import { Provider } from 'react-redux'
import './index.css'
import {store} from './game/GameState'

ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.getElementById('root') as HTMLElement
)
