import { Helmet } from "react-helmet";

import { useState } from "react";
import AppBanner from '../appBanner/AppBanner';
import ComicsList from "../comicsList/ComicsList";


const ComicsPage = () => {

    const [selectedComics, setComics] = useState(null);

    const onComicsSelected = (id) => {
        setComics(id)
    }
    return (
        <>
            <Helmet>
                <meta name="description" content="Page with list of our comics" />
                <title>Comics Page</title>
            </Helmet>
            <AppBanner/>
            <ComicsList onComicsSelected={onComicsSelected}/>
        </>
    )
}

export default ComicsPage;