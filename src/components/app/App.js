import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import { MainPage, ComicsPage } from "../pages";


const App = () => {

    return (
        <Router basename="/marvel">
            <div className="app">
                <AppHeader/>
                <main>
                    <Switch>
                        <Route exact path="/">
                            <MainPage/>
                        </Route>
                        <Route exact path="/comics">
                            <ComicsPage/>
                        </Route>
                    </Switch>
                    {/* <AppBanner/>
                    <SingleComic comicsId={selectedComics}/> */}
                </main>
            </div>
        </Router>
    )

}

export default App;