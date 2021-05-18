import './App.css';
import PokemonCharacter from './PokemonCharacter';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

function NavBar() {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/pokemon/character/ditto">Ditto</Link>
      </li>
      <li>
        <Link to="/pokemon/character/jigglypuff">Jigglypuff</Link>
      </li>
      <li>
        <Link to="/pokemon/character/mew">Mew</Link>
      </li>
    </ul>
  )
}

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />

        <Switch>
          <Route exact path="/">
            <h1>Home</h1>
          </Route>
          <Route path="/pokemon/character/:character">
            <PokemonCharacter />
          </Route>
          <Route path="*">
            <h1>404</h1>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
