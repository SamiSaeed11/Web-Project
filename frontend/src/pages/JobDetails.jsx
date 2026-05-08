import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const JobDetails = () => {
  const { id } = useParams();
  const { isAuthenticated, isCandidate } = useAuth();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [resumeFile, setResumeFile] = useState(null);

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const { data } = await api.get(`/jobs/${id}`);
      setJob(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load job details');
      setLoading(false);
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!isCandidate) {
      setError('Only candidates can apply for jobs');
      return;
    }

    setApplying(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('jobId', id);
      if (resumeFile) {
        formData.append('resume', resumeFile);
      }

      await api.post('/applications', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSuccess('Application submitted successfully! Check your email for confirmation.');
      setApplying(false);
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit application');
      setApplying(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!job) return <div className="alert alert-error">Job not found</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="card">
        <h1>{job.title}</h1>
        <div className="job-meta" style={{ margin: '20px 0', fontSize: '16px' }}>
          <span>📍 {job.branch?.name}</span>
          <span>🏢 {job.department}</span>
          <span>💼 {job.jobType}</span>
          <span>👥 {job.availableSeats} seats</span>
        </div>

        {job.salaryRange && (
          <div style={{ margin: '15px 0', fontSize: '18px', color: '#10b981', fontWeight: 'bold' }}>
            💰 Salary: {job.salaryRange}
          </div>
        )}

        <div style={{ marginTop: '30px' }}>
          <h3>Job Description</h3>
          <p style={{ lineHeight: '1.8', color: '#4b5563', marginTop: '10px' }}>
            {job.description}
          </p>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h3>Requirements</h3>
          <p style={{ lineHeight: '1.8', color: '#4b5563', marginTop: '10px', whiteSpace: 'pre-line' }}>
            {job.requirements}
          </p>
        </div>

        {job.responsibilities && (
          <div style={{ marginTop: '30px' }}>
            <h3>Responsibilities</h3>
            <p style={{ lineHeight: '1.8', color: '#4b5563', marginTop: '10px', whiteSpace: 'pre-line' }}>
              {job.responsibilities}
            </p>
          </div>
        )}

        {job.experienceRequired && (
          <div style={{ marginTop: '30px' }}>
            <h3>Experience Required</h3>
            <p style={{ lineHeight: '1.8', color: '#4b5563', marginTop: '10px' }}>
              {job.experienceRequired}
            </p>
          </div>
        )}

        {job.branch && (
          <div style={{ marginTop: '30px', padding: '20px', background: '#f9fafb', borderRadius: '6px' }}>
            <h3>Branch Contact</h3>
            <p style={{ margin: '10px 0' }}>📍 {job.branch.address}</p>
            {job.branch.contactEmail && <p>📧 {job.branch.contactEmail}</p>}
            {job.branch.contactPhone && <p>📞 {job.branch.contactPhone}</p>}
          </div>
        )}
      </div>

      {isAuthenticated && isCandidate && (
        <div className="card" style={{ marginTop: '20px' }}>
          <h3>Apply for this Job</h3>

          {success && <div className="alert alert-success">{success}</div>}
          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleApply}>
            <div className="form-group">
              <label>Upload Resume (PDF) - Optional if already uploaded in profile</label>
              <input
                type="file"
                className="form-control"
                accept=".pdf"
                onChange={(e) => setResumeFile(e.target.files[0])}
              />
              <small style={{ color: '#6b7280' }}>If not uploaded here, we'll use your profile resume</small>
            </div>

            <button type="submit" className="btn btn-success" disabled={applying}>
              {applying ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>
      )}

      {!isAuthenticated && (
        <div className="card" style={{ marginTop: '20px', textAlign: 'center' }}>
          <p>Please <a href="/login">login</a> or <a href="/register">register</a> to apply for this job.</p>
        </div>
      )}
    </div>
  );
};

export default JobDetails;
