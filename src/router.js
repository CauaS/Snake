import { BrowserRouter, Route } from "react-router-dom";
import Login from '../src/screen/login/login';
import Canvas from '../src/screen/canvas/Canvas';

function Routes() {
    return(
        <BrowserRouter>
            <Route path="/" component={Login} exact/>
            <Route path="/canvas" component={Canvas} exact/>
        </BrowserRouter>
    );
}

export default Routes
