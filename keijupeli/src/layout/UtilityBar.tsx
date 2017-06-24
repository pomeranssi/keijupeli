import * as React from 'react'
import './UtilityBar.css'

export default class UtilityBar extends React.Component<{}, {}> {
    render() {
        return (
            <div className="UtilityBar">
                <div className="App-icon">
                    <img src={require('./images/icon-random.png')} className="App-logo" alt="logo" />
                </div>
            </div>
        )
    }
}
