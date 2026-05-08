import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const CandidateDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
    fetchInterviews();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data } = await api.get('/applications/my-applications');
      setApplications(data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to load applications');
      setLoading(false);
    }
  };

  const fetchInterviews = async () => {
    try {
      const { data } = await api.get('/interviews');
      setInterviews(data);
    } catch (err) {
      console.error('Failed to load interviews');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      'Submitted': 'badge-info',
      'Under Review': 'badge-warning',
      'Shortlisted': 'badge-success',
      'Interview Scheduled': 'badge-success',
      'Rejected': 'badge-danger',
      'Selected': 'badge-success',
    };
    return badges[status] || 'badge-info';
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <h1 style={{ marginBottom: '30px' }}>My Dashboard</h1>

      <div className="card" style={{ marginBottom: '30px' }}>
        <h2>Application Statistics</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px', marginTop: '20px' }}>
          <div style={{ textAlign: 'center', padding: '20px', background: '#f0f9ff', borderRadius: '8px' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#2563eb' }}>{applications.length}</div>
            <div style={{ color: '#6b7280', marginTop: '5px' }}>Total Applications</div>
          </div>
          <div style={{ textAlign: 'center', padding: '20px', background: '#f0fdf4', borderRadius: '8px' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981' }}>
              {applications.filter(a => a.status === 'Shortlisted' || a.status === 'Interview Scheduled').length}
            </div>
            <div style={{ color: '#6b7280', marginTop: '5px' }}>Shortlisted</div>
          </div>
          <div style={{ textAlign: 'center', padding: '20px', background: '#fef3c7', borderRadius: '8px' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f59e0b' }}>
              {applications.filter(a => a.status === 'Under Review').length}
            </div>
            <div style={{ color: '#6b7280', marginTop: '5px' }}>Under Review</div>
          </div>
        </div>
      </div>

      {interviews.length > 0 && (
        <div className="card" style={{ marginBottom: '30px' }}>
          <h2>Upcoming Interviews</h2>
          <div style={{ marginTop: '20px' }}>
            {interviews.map((interview) => (
              <div key={interview._id} style={{ padding: '15px', background: '#f0fdf4', borderRadius: '8px', marginBottom: '15px' }}>
                <h3 style={{ color: '#10b981', marginBottom: '10px' }}>{interview.job?.title}</h3>
                <p><strong>Date:</strong> {new Date(interview.scheduledDate).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {interview.scheduledTime}</p>
                <p><strong>Mode:</strong> {interview.mode}</p>
                {interview.location && <p><strong>Location:</strong> {interview.location}</p>}
                {interview.meetingLink && (
                  <p><strong>Meeting Link:</strong> <a href={interview.meetingLink} target="_blank" rel="noopener noreferrer">Join Meeting</a></p>
                )}
                {interview.message && (
                  <div style={{ marginTop: '10px', padding: '10px', background: 'white', borderRadius: '6px' }}>
                    <strong>Message:</strong> {interview.message}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card">
        <h2>My Applications</h2>
        {applications.length === 0 ? (
          <p style={{ marginTop: '20px', color: '#6b7280' }}>You haven't applied to any jobs yet.</p>
        ) : (
          <table className="table" style={{ marginTop: '20px' }}>
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Department</th>
                <th>Branch</th>
                <th>Applied Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app._id}>
                  <td>{app.job?.title}</td>
                  <td>{app.job?.department}</td>
                  <td>{app.job?.branch?.name}</td>
                  <td>{new Date(app.appliedDate).toLocaleDateString()}</td>
                  <td>
                    <span className={`badge ${getStatusBadge(app.status)}`}>
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CandidateDashboard;
