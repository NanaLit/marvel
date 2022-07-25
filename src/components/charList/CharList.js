import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

class CharList extends Component {
    state ={
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 1541,
        charEnded: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
            .then(this.onAllCharsLoaded)
            .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }


    onAllCharsLoaded = (newCharList) => {

        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        this.setState(({offset, charList}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    viewChars = (arr) =>{
        const elements = arr.map(item => {
            const imgNA = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === imgNA) {
                imgStyle = {'objectFit' : 'fill'};
            }
            return (
                <li className="char__item" 
                    key={item.id}
                    onClick={() => this.props.onCharSelected(item.id)}>
                    <img style={imgStyle} src={item.thumbnail} alt="caracter img"/>
                    <div className="char__name">{item.name}</div>
                </li>
            ) 
        })
        return (
            <ul className="char__grid">
                {elements}  
            </ul>
        )
    }
    
    render () {
        const {charList, loading, error, offset, newItemLoading, charEnded} = this.state;

        const items = this.viewChars(charList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button 
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display': charEnded ? 'none' : 'block'}}
                    onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
    
}





export default CharList;