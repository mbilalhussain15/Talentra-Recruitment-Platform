export const fetchAllJobs = async () => {
    return [
      { id: 1, title: "Software Engineer", applicants: 5 },
      { id: 2, title: "Product Designer", applicants: 2 },
    ];
  };
  
  export const fetchJobApplications = async (jobId) => {
    return [
      { id: 1, name: "John Doe", resume: "resume1.pdf" },
      { id: 2, name: "Jane Smith", resume: "resume2.pdf" },
    ];
  };
  