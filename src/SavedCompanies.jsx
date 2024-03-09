import React from 'react';

function SavedCompanies({ savedCompanies }) {
  return (
    <div className="container">
      <h1 className="mt-5 mb-4">Saved Companies</h1>
      {savedCompanies.length > 0 ? (
        <ul>
          {savedCompanies.map((company, index) => (
            <li key={index}>{company.company}</li>
          ))}
        </ul>
      ) : (
        <p>No companies saved yet.</p>
      )}
    </div>
  );
}

export default SavedCompanies;
