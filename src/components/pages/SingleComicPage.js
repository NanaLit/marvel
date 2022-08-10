import './singleComicPage.scss';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const SingleComicPage = () => {
    const {comicId} = useParams();
    const [comics, setComics] = useState(null);

    const {loading, error, getComics, clearError} = useMarvelService();

    useEffect(() => {
        updateComics();
    }, [comicId])

    const updateComics = () => {
        clearError();
        getComics(comicId)
            .then(onComicsLoaded);
    }

    const onComicsLoaded = (comics) => {
        setComics(comics);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !comics) ? <View comics={comics}/> : null;
    return (
        <div className="single-comic">
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({comics}) => {
    const {name, description, thumbnail, pages, price, language} = comics;

    const imgNA = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";
    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === imgNA) {
        imgStyle = {'objectFit' : 'fill'};
    }
    
    return (
        <>
            <img style={imgStyle} src={thumbnail} alt={name} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pages}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
        <Link to="/comics" className="single-comic__back">Back to all</Link>
        </>
    )
}

export default SingleComicPage;