import { TransitionGroup, CSSTransition } from 'react-transition-group';
import {useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './comicsList.scss';

const ComicsList = (props) => {

    const [comicsList, setComicsList] = useState([]);
    const [newComicsLoading, setNewComicsLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewComicsLoading(false) : setNewComicsLoading(true);
        getAllComics(offset)
            .then(onAllComicsLoaded);
    }

    const onAllComicsLoaded = (newComicsList) => {

        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }

        setComicsList([...comicsList, ...newComicsList]);
        setNewComicsLoading(false);
        setOffset(offset + 8);
        setComicsEnded(ended);
    }

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('comics__item_selected'));
        itemRefs.current[id].classList.add('comics__item_selected');
        itemRefs.current[id].focus();
    }

    function viewComics(arr){
        const elements = arr.map((item, i)=> {
            const imgNA = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === imgNA) {
                imgStyle = {'objectFit' : 'contain'};
            }
            return (
                <CSSTransition key={i} timeout={500} classNames="comics__item">
                    <li className="comics__item"
                        ref={el => itemRefs.current[i] = el} 
                        tabIndex={0}
                        onClick={() => {
                            props.onComicsSelected(item.id);
                            focusOnItem(i);
                        }}
                        onKeyPress={(e) => {
                            if (e.key === ' ' || e.key === "Enter") {
                                props.onCharSelected(item.id);
                                focusOnItem(i);
                            }
                        }}>
                        <Link to={`/comics/${item.id}`}>
                            <img style={imgStyle} src={item.thumbnail} alt="ultimate war" className="comics__item-img"/>
                            <div className="comics__item-name">{item.name}</div>
                            <div className="comics__item-price">{item.price}</div>
                        </Link>
                    </li> 
                </CSSTransition>
            ) 
        })
        return (
            <ul className="comics__grid">
                <TransitionGroup component={null}>
                    {elements}  
                </TransitionGroup>
            </ul>
        )
    }

    const items = viewComics(comicsList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newComicsLoading ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button className="button button__main button__long"
                    disabled={newComicsLoading}
                    style={{'display': comicsEnded ? 'none' : 'block'}}
                    onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}
ComicsList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default ComicsList;