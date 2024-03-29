class MarvelService {

    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=2251265076cea635643fe65f130ab7a7';
    _baseOffset = 210;

    getResourse = async (url) => {
        let res = await fetch(url);

        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }
    
    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResourse(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResourse(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {
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
}

export default MarvelService;