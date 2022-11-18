// Import scss
// import './assets/scss/_theme-light.scss';
import './assets/scss/theme.scss';
import {BrowserRouter} from "react-router-dom";
import {Router} from "./router";


// import "./assets/scss/app.scss";

export const Preventool = () => {
    return(
        <BrowserRouter>
            <Router/>
        </BrowserRouter>
    )
}