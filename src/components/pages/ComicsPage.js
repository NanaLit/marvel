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
            <AppBanner/>
            <ComicsList onComicsSelected={onComicsSelected}/>
        </>
    )
}

export default ComicsPage;