import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const HRDashboard = () => {
  const [activeTab, setActiveTab] = useState('jobs');
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [branches, setBranches] = useState([]);
  const [showJobForm, setShowJobForm] = useState(false);
  const [showInterviewForm, setShowInterviewForm] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const [jobForm, setJobForm] = useState({
    title: '',
    department: '',
    description: '',
    requirements: '',
    responsibilities: '',
    branch: '',
    availableSeats: 1,
    experienceRequired: '',
    salaryRange: '',
    jobType: 'Full-time',
  });

  const [interviewForm, setInterviewForm] = useState({
    scheduledDate: '',
    scheduledTime: '',
    mode: 'In-person',
    location: '',
    meetingLink: '',
    message: '',
  });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      const [jobsRes, appsRes, branchesRes] = await Promise.all([
        api.get('/jobs?status=open'),
        api.get('/applications'),
        api.get('/branches'),
      ]);
      setJobs(jobsRes.data);
      setApplications(appsRes.data);
      setBranches(branchesRes.data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to load data');
      setLoading(false);
    }
  };

  const handleJobSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/jobs', jobForm);
      setMessage('Job posted successfully!');
      setShowJobForm(false);
      fetchData();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to post job');
    }
  };

  const handleDeleteJob = async (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await api.delete(`/jobs/${id}`);
        setMessage('Job deleted successfully');
        fetchData();
        setTimeout(() => setMessage(''), 3000);
      } catch (err) {
        setMessage('Failed to delete job');
      }
    }
  };

  const handleStatusChange = async (appId, status) => {
    try {
      await api.put(`/applications/${appId}/status`, { status });
      setMessage(`Application ${status.toLowerCase()} successfully!`);
      fetchData();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to update status');
    }
  };

  const handleScheduleInterview = async (e) => {
    e.preventDefault();
    try {
      await api.post('/interviews', {
        ...interviewForm,
        applicationId: selectedApp._id,
      });
      setMessage('Interview scheduled successfully!');
      setShowInterviewForm(false);
      setSelectedApp(null);
      fetchData();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to schedule interview');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <h1 style={{ marginBottom: '30px' }}>HR Dashboard</h1>

      {message && (
        <div className="alert alert-success" style={{ marginBottom: '20px' }}>
          {message}
        </div>
      )}

      <div style={{ marginBottom: '30px' }}>
        <button
          className={`btn ${activeTab === 'jobs' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('jobs')}
          style={{ marginRight: '10px' }}
        >
          Manage Jobs
        </button>
        <button
          className={`btn ${activeTab === 'applications' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('applications')}
        >
          Manage Applications
        </button>
      </div>

      {activeTab === 'jobs' && (
        <div>
          <div style={{ marginBottom: '20px' }}>
            <button className="btn btn-success" onClick={() => setShowJobForm(!showJobForm)}>
              {showJobForm ? 'Cancel' : '+ Post New Job'}
            </button>
          </div>

          {showJobForm && (
            <div className="card" style={{ marginBottom: '30px' }}>
              <h3>Post New Job</h3>
              <form onSubmit={handleJobSubmit}>
                <div className="form-group">
                  <label>Job Title</label>
                  <input
                    className="form-control"
                    value={jobForm.title}
                    onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Department</label>
                  <input
                    className="form-control"
                    value={jobForm.department}
                    onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    className="form-control"
                    value={jobForm.description}
                    onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Requirements</label>
                  <textarea
                    className="form-control"
                    value={jobForm.requirements}
                    onChange={(e) => setJobForm({ ...jobForm, requirements: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Branch</label>
                  <select
                    className="form-control"
                    value={jobForm.branch}
                    onChange={(e) => setJobForm({ ...jobForm, branch: e.target.value })}
                    required
                  >
                    <option value="">Select Branch</option>
                    {branches.map((b) => (
                      <option key={b._id} value={b._id}>{b.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Available Seats</label>
                  <input
                    type="number"
                    className="form-control"
                    value={jobForm.availableSeats}
                    onChange={(e) => setJobForm({ ...jobForm, availableSeats: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Salary Range (Optional)</label>
                  <input
                    className="form-control"
                    value={jobForm.salaryRange}
                    onChange={(e) => setJobForm({ ...jobForm, salaryRange: e.target.value })}
                    placeholder="e.g. 50,000 - 80,000 PKR"
                  />
                </div>
                <button type="submit" className="btn btn-primary">Post Job</button>
              </form>
            </div>
          )}

          <div className="card">
            <h3>All Jobs</h3>
            <table className="table" style={{ marginTop: '20px' }}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Department</th>
                  <th>Branch</th>
                  <th>Seats</th>
                  <th>Posted</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job._id}>
                    <td>{job.title}</td>
                    <td>{job.department}</td>
                    <td>{job.branch?.name}</td>
                    <td>{job.availableSeats}</td>
                    <td>{new Date(job.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        style={{ padding: '5px 10px', fontSize: '13px' }}
                        onClick={() => handleDeleteJob(job._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'applications' && (
        <div>
          <div className="card">
            <h3>All Applications</h3>
            <table className="table" style={{ marginTop: '20px' }}>
              <thead>
                <tr>
                  <th>Candidate</th>
                  <th>Job</th>
                  <th>Applied Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app._id}>
                    <td>
                      {app.candidate?.name}
                      <br />
                      <small style={{ color: '#6b7280' }}>{app.candidate?.email}</small>
                    </td>
                    <td>{app.job?.title}</td>
                    <td>{new Date(app.appliedDate).toLocaleDateString()}</td>
                    <td>
                      <select
                        value={app.status}
                        onChange={(e) => handleStatusChange(app._id, e.target.value)}
                        style={{ padding: '5px', borderRadius: '4px' }}
                      >
                        <option>Submitted</option>
                        <option>Under Review</option>
                        <option>Shortlisted</option>
                        <option>Interview Scheduled</option>
                        <option>Rejected</option>
                        <option>Selected</option>
                      </select>
                    </td>
                    <td>
                      <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '5px 10px', fontSize: '13px', marginRight: '5px' }}>
                        View Resume
                      </a>
                      <button
                        className="btn btn-success"
                        style={{ padding: '5px 10px', fontSize: '13px' }}
                        onClick={() => {
                          setSelectedApp(app);
                          setShowInterviewForm(true);
                        }}
                      >
                        Schedule Interview
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {showInterviewForm && selectedApp && (
            <div className="card" style={{ marginTop: '30px' }}>
              <h3>Schedule Interview for {selectedApp.candidate?.name}</h3>
              <form onSubmit={handleScheduleInterview}>
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={interviewForm.scheduledDate}
                    onChange={(e) => setInterviewForm({ ...interviewForm, scheduledDate: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Time</label>
                  <input
                    type="time"
                    className="form-control"
                    value={interviewForm.scheduledTime}
                    onChange={(e) => setInterviewForm({ ...interviewForm, scheduledTime: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Mode</label>
                  <select
                    className="form-control"
                    value={interviewForm.mode}
                    onChange={(e) => setInterviewForm({ ...interviewForm, mode: e.target.value })}
                  >
                    <option>In-person</option>
                    <option>Online</option>
                    <option>Phone</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Location (optional)</label>
                  <input
                    className="form-control"
                    value={interviewForm.location}
                    onChange={(e) => setInterviewForm({ ...interviewForm, location: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Meeting Link (optional)</label>
                  <input
                    className="form-control"
                    value={interviewForm.meetingLink}
                    onChange={(e) => setInterviewForm({ ...interviewForm, meetingLink: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Message (optional)</label>
                  <textarea
                    className="form-control"
                    value={interviewForm.message}
                    onChange={(e) => setInterviewForm({ ...interviewForm, message: e.target.value })}
                  />
                </div>
                <button type="submit" className="btn btn-success">Schedule Interview</button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ marginLeft: '10px' }}
                  onClick={() => {
                    setShowInterviewForm(false);
                    setSelectedApp(null);
                  }}
                >
                  Cancel
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HRDashboard;
