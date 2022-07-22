import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

class CharList extends Component {
    state ={
        charList: [],
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.marvelService.getAllCharacters()
            .then(this.onAllCharsLoaded)
            .catch(this.onError)
    }

    onAllCharsLoaded = (charList) => {
        this.setState({
            charList,
            loading: false
        })
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
                imgStyle = {'objectFit' : 'contain'};
            }
            return (
                <li className="char__item" key={item.id}>
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
        const {charList, loading, error} = this.state;

        const items = this.viewChars(charList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
    
}





export default CharList;