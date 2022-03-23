import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link //@ts-ignore
} from "react-router-dom";
import Home from './component/Home';
import Information from './component/Information';

function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/info" component={Information}/>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
