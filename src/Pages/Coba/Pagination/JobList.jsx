import React from 'react';

const JobList = ({ jobs }) => {
  return (
    <ul>
      {jobs.map(job => (
        <li key={job.id}>
          <h3>{job.title}</h3>
          <p>{job.job_description}</p>
          {/* Tampilkan informasi pekerjaan lainnya sesuai kebutuhan */}
        </li>
      ))}
    </ul>
  );
};

export default JobList;
