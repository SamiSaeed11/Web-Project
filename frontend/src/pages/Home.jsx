import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchJobs();
    fetchBranches();
  }, [selectedBranch]);

  const fetchJobs = async () => {
    try {
      const params = selectedBranch ? { branch: selectedBranch } : {};
      const { data } = await api.get('/jobs', { params });
      setJobs(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load jobs');
      setLoading(false);
    }
  };

  const fetchBranches = async () => {
    try {
      const { data } = await api.get('/branches');
      setBranches(data);
    } catch (err) {
      console.error('Failed to load branches');
    }
  };

  if (loading) return <div className="loading">Loading jobs...</div>;

  return (
    <div>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ marginBottom: '20px' }}>Available Job Openings</h1>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ marginRight: '10px' }}>Filter by Branch:</label>
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            style={{ padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db' }}
          >
            <option value="">All Branches</option>
            {branches.map((branch) => (
              <option key={branch._id} value={branch._id}>
                {branch.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {jobs.length === 0 ? (
        <div className="card">
          <p>No jobs available at the moment.</p>
        </div>
      ) : (
        <div className="grid">
          {jobs.map((job) => (
            <div key={job._id} className="job-card">
              <h3>{job.title}</h3>
              <div className="job-meta">
                <span>📍 {job.branch?.name}</span>
                <span>🏢 {job.department}</span>
              </div>
              <div className="job-meta">
                <span>💼 {job.jobType}</span>
                <span>👥 {job.availableSeats} seats</span>
              </div>
              {job.salaryRange && (
                <div style={{ margin: '10px 0', color: '#10b981', fontWeight: 'bold' }}>
                  💰 {job.salaryRange}
                </div>
              )}
              <p style={{ margin: '15px 0', color: '#6b7280', lineHeight: '1.5' }}>
                {job.description.substring(0, 150)}...
              </p>
              <Link to={`/jobs/${job._id}`} className="btn btn-primary">
                View Details & Apply
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
