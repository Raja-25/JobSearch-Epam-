import React, { useState } from 'react';
import axios from 'axios';
import './JobsSearch.css';
import { Loader } from './Loader';
import { toast } from 'sonner';

function JobsSearch() {
  const [query, setQuery] = useState('');
  const [jobsData, setJobsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const suggestionWords = [
    'Software Developer',
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'UI/UX Designer',
    'Data Analyst',
    'Data Engineer',
    'Machine Learning Engineer',
    'DevOps Engineer',
    'Network Engineer',
    'Security Analyst',
    'System Administrator',
    'Product Manager',
    'Business Analyst',
    'Project Manager',
    'Technical Writer',
    'Quality Assurance Engineer',
    'Customer Support Representative',
    'Software Engineer',
    'Web Developer',
    'Mobile App Developer',
    'Game Developer',
    'Database Administrator',
    'Cloud Architect',
    'Graphic Designer',
    'Business Intelligence Analyst',
    'Artificial Intelligence Specialist',
    'Cybersecurity Analyst',
    'Network Administrator',
    'Systems Analyst',
    'Technical Support Specialist',
    'IT Consultant',
    'Sales Engineer',
    'Marketing Specialist',
    'Content Writer',
    'Social Media Manager',
    'Financial Analyst',
    'Human Resources Manager',
    'Legal Counsel',
    'Healthcare Professional',
    'Education Consultant',

  ];



  const handleQueryChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim().length > 0) {
      filterSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const filterSuggestions = (input) => {
    const filtered = suggestionWords.filter(word =>
      word.toLowerCase().includes(input.toLowerCase())
    );
    setSuggestions(filtered);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    const options = {
      method: 'GET',
      url: 'https://jobs-api14.p.rapidapi.com/list',
      params: {
        query: query,
        location: 'India',
        distance: '1.0',
        language: 'en_GB',
        remoteOnly: 'false',
        datePosted: 'month',
        employmentTypes: 'fulltime;parttime;intern;contractor',
        index: '0'
      },
      headers: {
        'X-RapidAPI-Key': 'fec307e567msh8973332cb7d2418p1bb94ajsnd750f07c108c',
        'X-RapidAPI-Host': 'jobs-api14.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data)
      setJobsData(response.data);
      if (response.data.jobCount === 0) {
        toast.error("Use another Role to Search")
      } else {
        toast.success('Event has been created');
      }
    } catch (error) {
      console.error(error);
      setJobsData(null);
      toast.error('An error occurred while fetching jobs.');
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]);
  };

  const handleSave = (job) => {
    let savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
    if (savedJobs.some(savedJob => savedJob.title === job.title)) {
      toast.error('Job already saved.');
    } else {
      savedJobs.push(job);
      localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
      toast.success('Job saved successfully.');
    }
  };

  return (
    <div className="container">
      <h1 className="mt-5 mb-4">Job Search</h1>
      <div className="mb-3 position-relative">
        <label className="form-label">Query:</label>
        <input
          type="text"
          className="form-control"
          placeholder='Enter the role your want to Search'
          value={query}
          onChange={handleQueryChange}
        />
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button className="btn btn-primary mb-3" onClick={handleSearch}>Search</button>
      {loading ? (
        <Loader />
      ) : jobsData && jobsData.jobs.length > 0 ? (
        <div>
          <h2 className="mb-3">Jobs Found:</h2>
          {jobsData.jobs.map((job, index) => (
            <div key={index} className="card mb-3">
              <div className="card-body">
                <h3 className="card-title">{job.title}</h3>
                <p className="card-text"><strong>Company:</strong> {job.company}</p>
                {job.image === "" ? "" : <img src={job.image} alt={job.title} className="img-fluid mb-3" />}
                <p className="card-text"><strong>Description:</strong> {job.description}</p>
                <p className="card-text"><strong>Location: </strong>{job.location}</p>
                <p className="card-text"><strong>Employment Type:</strong> {job.employmentType}</p>
                <p className="card-text"><strong>Posted: </strong>{job.datePosted}</p>
                <p className="card-text"><strong>Job Providers:</strong></p>
                <ul className="list-group list-group-flush">
                  {job.jobProviders.map((provider, idx) => (
                    <li key={idx} className="list-group-item">
                      <a href={provider.url} target="_blank" rel="noopener noreferrer">{provider.jobProvider}</a>
                    </li>
                  ))}
                </ul>
                <button onClick={() => handleSave(job)}>Save</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default JobsSearch;
