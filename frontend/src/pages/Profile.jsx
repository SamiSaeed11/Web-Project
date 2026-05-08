import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    experience: '',
    education: '',
    skills: '',
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await api.get('/auth/profile');
      setProfile(data);
      setFormData({
        name: data.name || '',
        phone: data.phone || '',
        experience: data.experience || '',
        education: data.education || '',
        skills: data.skills?.join(', ') || '',
      });
    } catch (err) {
      console.error('Failed to load profile');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const skillsArray = formData.skills
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s);

      await api.put('/auth/profile', {
        ...formData,
        skills: skillsArray,
      });

      setMessage('Profile updated successfully!');
      setEditing(false);
      fetchProfile();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to update profile');
    }
  };

  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append(type, file);

    try {
      await api.post(`/auth/upload-${type}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage(`${type} uploaded successfully!`);
      fetchProfile();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage(`Failed to upload ${type}`);
    }
    setUploading(false);
  };

  if (!profile) return <div className="loading">Loading...</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '30px' }}>My Profile</h1>

      {message && (
        <div className="alert alert-success" style={{ marginBottom: '20px' }}>
          {message}
        </div>
      )}

      <div className="card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>Personal Information</h2>
          <button
            className="btn btn-primary"
            onClick={() => setEditing(!editing)}
          >
            {editing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {editing ? (
          <form onSubmit={handleUpdate}>
            <div className="form-group">
              <label>Name</label>
              <input
                className="form-control"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                className="form-control"
                value={profile.email}
                disabled
                style={{ background: '#f3f4f6' }}
              />
              <small style={{ color: '#6b7280' }}>Email cannot be changed</small>
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                className="form-control"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            {user.role === 'candidate' && (
              <>
                <div className="form-group">
                  <label>Experience</label>
                  <textarea
                    className="form-control"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="e.g., 2 years in software development..."
                  />
                </div>
                <div className="form-group">
                  <label>Education</label>
                  <textarea
                    className="form-control"
                    value={formData.education}
                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                    placeholder="e.g., BS Computer Science from..."
                  />
                </div>
                <div className="form-group">
                  <label>Skills (comma separated)</label>
                  <input
                    className="form-control"
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    placeholder="e.g., JavaScript, React, Node.js"
                  />
                </div>
              </>
            )}
            <button type="submit" className="btn btn-success">
              Save Changes
            </button>
          </form>
        ) : (
          <div>
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Phone:</strong> {profile.phone || 'Not provided'}</p>
            <p><strong>Role:</strong> <span style={{ textTransform: 'capitalize' }}>{profile.role}</span></p>
            {user.role === 'candidate' && (
              <>
                <p><strong>Experience:</strong> {profile.experience || 'Not provided'}</p>
                <p><strong>Education:</strong> {profile.education || 'Not provided'}</p>
                <p><strong>Skills:</strong> {profile.skills?.join(', ') || 'Not provided'}</p>
              </>
            )}
          </div>
        )}
      </div>

      {user.role === 'candidate' && (
        <div className="card">
          <h2>Documents</h2>

          <div style={{ marginTop: '20px' }}>
            <h3>Resume</h3>
            {profile.resumeUrl ? (
              <div style={{ marginTop: '10px' }}>
                <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  View Resume
                </a>
              </div>
            ) : (
              <p style={{ color: '#6b7280', marginTop: '10px' }}>No resume uploaded</p>
            )}
            <div className="form-group" style={{ marginTop: '15px' }}>
              <label>Upload New Resume (PDF only)</label>
              <input
                type="file"
                className="form-control"
                accept=".pdf"
                onChange={(e) => handleFileUpload(e, 'resume')}
                disabled={uploading}
              />
            </div>
          </div>

          <div style={{ marginTop: '30px' }}>
            <h3>Cover Letter</h3>
            {profile.coverLetterUrl ? (
              <div style={{ marginTop: '10px' }}>
                <a href={profile.coverLetterUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  View Cover Letter
                </a>
              </div>
            ) : (
              <p style={{ color: '#6b7280', marginTop: '10px' }}>No cover letter uploaded</p>
            )}
            <div className="form-group" style={{ marginTop: '15px' }}>
              <label>Upload Cover Letter (PDF/DOCX)</label>
              <input
                type="file"
                className="form-control"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileUpload(e, 'cover-letter')}
                disabled={uploading}
              />
            </div>
          </div>

          {uploading && <p style={{ marginTop: '15px', color: '#2563eb' }}>Uploading...</p>}
        </div>
      )}
    </div>
  );
};

export default Profile;
