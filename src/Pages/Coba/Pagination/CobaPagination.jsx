import React, { useState, useEffect } from 'react';
import JobList from './JobList';
import Pagination from '../../Tugas/Kanban/Pagination';

const CobaPagination = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

const fetchJobs = async (page) => {
    const response = await fetch(`https://dev-example.sanbercloud.com/api/job-vacancy?page=${page}`);
    const data = await response.json();
    setJobs(data.data);
    setTotalPages(data.last_page);
};

  useEffect(() => {
    fetchJobs(currentPage);
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="CobaPagination">
      <h1>Job Vacancies</h1>
      <JobList jobs={jobs} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default CobaPagination;
