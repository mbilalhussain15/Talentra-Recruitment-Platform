export const fetchJobs = async () => {
    return [
      { id: 1, title: "Software Engineer", skills: "React, Node.js", salary: "$50K-$80K", type: "Full-Time" },
      { id: 2, title: "Product Designer", skills: "UI/UX", salary: "$35K-$50K", type: "Part-Time" },
    ];
  };
  
  export const fetchApplications = async () => {
    return [
      { id: 1, title: "Software Engineer", status: "Applied" },
      { id: 2, title: "Product Designer", status: "Shortlisted" },
    ];
  };
  