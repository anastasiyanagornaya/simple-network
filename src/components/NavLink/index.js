import React, { Component } from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import './style.scss'

export default class NavLink extends Component {
    render() {
        return(
            <Link {...this.props} activeClassName = 'active' />
        )
    }
}