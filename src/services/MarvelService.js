import {useHttp} from '../hooks/http.hook';


const useMarvelService = () => {

const {request, clearError, process, setProcess} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=2251265076cea635643fe65f130ab7a7';
    const _baseOffset = 210;
    const _comicsOffset = 0;
    
    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getAllComics = async (offset = _comicsOffset) => {
        const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getComics = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

    const getCharByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const _transformCharacter = (char) => {
        if (char.description === "") {
            char.description = "Описание персонажа не найдено";
        } else if (char.description.length > 200) {
            char.description = (char.description.slice(0, 199) + '...');
        }

        return {
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path  + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            id: char.id,
            comics: char.comics.items
        }
    }
    const _transformComics = (comics) => {
        if(comics.prices.price === '') {
            comics.prices.price = "NOT AVALIBLE"
        }

        return {
            title: comics.title,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects.language || 'en-us',
            price: comics.prices.price ? `${comics.prices.price}$` : 'not available',
            id: comics.id
        }
    }
    return {getAllCharacters, 
            getCharacter, 
            getCharByName, 
            getAllComics, 
            getComics, 
            clearError, 
            process,
            setProcess}
}

export default useMarvelService;