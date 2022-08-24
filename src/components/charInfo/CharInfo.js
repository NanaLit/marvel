import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setConrent';
import FindForm from '../findForm/FindForm';
import './charInfo.scss';

function CharInfo (props) {

    const [char, setChar] = useState(null);

    const {getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [props.charId])

    const updateChar = () => {
        
        const {charId} = props;
        if (!charId) {
            return;
        }
        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'));
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    return (
        <div>
            <div className="char__info">
                {setContent(process, View, char)}
            </div>
            <FindForm/>
        </div>
    )
}


const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = data;

    const imgNA = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";
    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === imgNA) {
        imgStyle = {'objectFit' : 'fill'};
    }
    

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : "Комиксов нет"}
                {
                    comics.map((item, i) => {
                        let comicsId = `/comics/${item.resourceURI.replace(/[^+\d]/g, '').slice(1)}`;
                        // eslint-disable-next-line
                        if (i > 9) return;
                        return (
                            <li key={i} className="char__comics-item">
                                <Link to={comicsId}>{item.name}</Link>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;