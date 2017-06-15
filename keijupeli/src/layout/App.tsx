import * as React from 'react'
import './App.css'

const logo = require('./images/fairy.svg')

class App extends React.Component<{}, null> {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <div className="Logo">
                        <img src={logo} className="App-logo" alt="logo" />
                    </div>
                    <h1>Keijupeli</h1>
                </div>
                <p className="App-main">
                    To get started, edit <code>src/App.tsx</code> and save to reload.
                </p>
            </div>
        )
    }
}

export default App
