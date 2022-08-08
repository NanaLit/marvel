import './singleComic.scss';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import xMen from '../../resources/img/x-men.png';

const SingleComic = (props) => {

    const [comics, setComics] = useState(null);

    const {loading, error, getComics, clearError} = useMarvelService();

    useEffect(() => {
        updateComics();
    }, [])

    useEffect(() => {
        updateComics();
    }, [props.comicsId])

    const updateComics = () => {
        clearError();
        const {comicsId} = props;
        if (!comicsId) {
            return;
        }

        getComics(comicsId)
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
            <img style={imgStyle} src={thumbnail} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pages}</p>
                <p className="single-comic__descr">{language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
        <a href="#" className="single-comic__back">Back to all</a>
        </>
    )
}

export default SingleComic;