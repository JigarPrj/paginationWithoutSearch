import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import promise from "redux-promise-middleware";
import { createStore, applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import combineReducers from "../reducers/reducers"
import Home from './Home';
//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__|| compose;
const middleware = [thunk, promise];

const store = createStore(
  combineReducers(),
  composeEnhancers(applyMiddleware(...middleware))
);

test('render Home',()=>{
    render(
        <Provider store={store}>
         <Home/>
        </Provider>
    )
    const home = screen.getByText('Author')
    expect(home).toBeInTheDocument()
})
test('Home',()=>{
  render(
      <Provider store={store}>
       <Home/>
      </Provider>
  )
  const home = screen.getByTestId('html-cell')
  expect(home).toBeInTheDocument()
})