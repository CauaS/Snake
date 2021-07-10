import { BrowserRouter, Route } from "react-router-dom";
import Login from '../src/screen/login/login';
import Game from '../src/screen/game/game';

function Routes() {
    return(
        <BrowserRouter>
            <Route path="/" component={Login} exact/>
            <Route path="/game" component={Game} exact/>
        </BrowserRouter>
    );
}

export default Routes
