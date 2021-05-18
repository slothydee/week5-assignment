import React, { Component } from 'react';
import { withRouter } from 'react-router';

class PokemonCharacter extends Component {
    state = {
        isLoading: true,
        pokemonCharacter: null,
        error: false
    }

    componentDidMount() {
        this.characterSearch();
    }

    componentDidUpdate(prevProps) {
        const oldUsername = prevProps.match.params.character;
        const incomingUsername = this.props.match.params.character;
        if (oldUsername !== incomingUsername) {
            this.characterSearch();
        }
    }

    characterSearch = () => {
        const character = this.props.match.params.character;

        fetch(`https://pokeapi.co/api/v2/pokemon/${character}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    isLoading: false,
                    pokemonCharacter: data
                });
            })
            .catch(() => {
                this.setState({
                    isLoading: false,
                    error: true
                });
            });
    }

    render() {
        const {isLoading, error, pokemonCharacter} = this.state;
        let content;
        if (pokemonCharacter) {
            const id = pokemonCharacter.id
            const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`
            const abilities =  pokemonCharacter.abilities.map(ability => {
                const effectString = ability.ability.name
                if (effectString) {
                    return <li key={effectString.slice(0, 5)}>Effect: {effectString}</li>
                }
            })
            const heldItems = pokemonCharacter.held_items.map(item =>{
                const itemString = item.item.name
                if (itemString) {
                    return <li key={itemString.slice(0, 5)}>Held Item: {itemString}</li>
                }
            })
            content = (
                <div>
                    <h2>{pokemonCharacter.name}</h2>
                    <img src={image} alt={pokemonCharacter.name}/>
                    <ul>
                        <li>Height: {pokemonCharacter.height}</li>
                        <li>Weight: {pokemonCharacter.weight}</li>
                        {abilities}
                        {heldItems}
                    </ul>
                </div>
            );
        }

        return (
            <div>
                <h1>Pokemon Character</h1>
                {isLoading && <p>Loading...</p>}
                {error && <p>Error. Please refresh and try again</p>}
                {content}
            </div>
        );
    }
}

export default withRouter(PokemonCharacter);