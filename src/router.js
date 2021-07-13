import { BrowserRouter, Route } from "react-router-dom";
import Login from '../src/screen/login/login';
import Game from '../src/screen/game/game';
import Scores from "./screen/scores/scores";

function Routes() {
    return(
        <BrowserRouter>
            <Route path="/" component={Login} exact/>
            <Route path="/game" component={Game} exact/>
            <Route path="/scores" component={Scores} exact/>
        </BrowserRouter>
    );
}

export default Routes
