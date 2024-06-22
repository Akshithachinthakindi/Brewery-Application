import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BrewerySearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('city'); // Default search type
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`https://api.openbrewerydb.org/v1/breweries?${searchType}=${searchTerm}`);
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error searching breweries:', error);
            setError('Error searching breweries');
        }
    };

    return (
        <div className="container mt-4">
            <h2>Brewery Search</h2>
            <form onSubmit={handleSearch}>
                <div className="mb-3">
                    <label htmlFor="searchTerm" className="form-label">Search Term</label>
                    <input type="text" className="form-control" id="searchTerm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="searchType" className="form-label">Search By</label>
                    <select className="form-select" id="searchType" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                        <option value="city">City</option>
                        <option value="name">Name</option>
                        <option value="type">Type</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Search</button>
            </form>

            {error && <div className="alert alert-danger mt-3">{error}</div>}

            {searchResults.length > 0 && (
                <div className="mt-4">
                    <h3>Search Results:</h3>
                    <ul className="list-group">
                        {searchResults.map(brewery => (
                            <li key={brewery.id} className="list-group-item">
                                <Link to={`/brewery-details/${brewery.id}`}>{brewery.name}</Link>
                                <p>{brewery.city}, {brewery.state}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default BrewerySearch;