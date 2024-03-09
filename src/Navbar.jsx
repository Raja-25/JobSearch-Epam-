import React, { useState } from 'react';
import { toast } from 'sonner';
import { NavLink } from 'react-router-dom';
export default function Navbar() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        searchInPage(searchQuery);
    };

    const searchInPage = (query) => {
        const searchText = query.toLowerCase();
        const elements = document.getElementsByTagName('*');

        let nearestElement;
        let nearestDistance = Infinity;

        for (let element of elements) {
            const text = element.innerText.toLowerCase();
            const words = text.split(/\s+/); // Split text into words

            for (let word of words) {
                if (word === searchText) { // Compare entire word with query
                    const index = text.indexOf(word);
                    const distance = Math.abs(index - text.indexOf(word, index + word.length));

                    if (distance < nearestDistance) {
                        nearestElement = element;
                        nearestDistance = distance;
                    }
                }
            }
        }

        if (nearestElement) {
            nearestElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            toast.success(`Found "${query}" in the webpage.`);
        } else {
            toast.error(`"${query}" not found in the webpage.`);
        }
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">JobSearch </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/saved">Saved Companies</a>
                            </li>
                        </ul>
                        <form className="d-flex" onSubmit={handleSearchSubmit}>
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchQuery} onChange={handleSearch} />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    );
}
