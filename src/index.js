import React from 'react'
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/configureStore'
import PostList from './components/PostList/PostList'
import LoginPage from './components/LoginPage/LoginPage'
import RegisterPage from './components/RegisterPage/RegisterPage'
import UserPage from './components/UserPage/UserPage'
import PageHeader from './components/Header/Header'
import Post from './components/Post/Post'
import App from './App'

// const isUserLoggined = () => {
//   return Boolean(
//     localStorage.getItem('access-token') &&
//     localStorage.getItem('uid') &&
//     localStorage.getItem('client')
//   )
// }

const isUserLoggined = () => {
  if (
    localStorage.getItem('access-token') &&
    localStorage.getItem('uid') &&
    localStorage.getItem('client')
  ) {
    store.dispatch({type: 'FETCH_USER_PROFILE'})
    return true
  }
  else {
    return false
  }
}

const PrivateRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} 
      render={props => 
        !(isUserLoggined())
        ? <Redirect to='/login' />
        : <Component {...rest} {...props} />
      } 
    />
  )
}

const PublicRoute = ({component: Component, ...rest}) => {
  console.log('isUserLoggined() ', isUserLoggined() );
  return (
    <Route {...rest} 
      render={props => 
        isUserLoggined() 
        ? <Redirect to='/posts' />
        : <Component {...rest} {...props} />
      } 
    />
  )
}

ReactDOM.render(
    <Provider store ={ store }>
      <BrowserRouter>
        <Switch>
          <Route path='/' component={ App }>
            <PageHeader />
            <PublicRoute path='/' component={ LoginPage } exact /> 
            <PublicRoute path='/posts' component={ LoginPage } /> 
            <PublicRoute path='/register' component={ RegisterPage } exact/> 
            <PublicRoute path='/login' component={ LoginPage } exact /> 
            <PrivateRoute path='/posts' component={ PostList } exact />
            <PrivateRoute path='/posts/:id' component={ Post } /> {/*checked*/}
            <PrivateRoute path='/user' component={ UserPage } />
          </Route>            
        </Switch>
      </BrowserRouter>  
    </Provider>,
  document.getElementById('root')
)
