export const login = async (email, password) => {
    // Simulated login with dummy data
    return { success: true, role: email === "applicant@test.com" ? "applicant" : "recruiter" };
  };
  
  export const signup = async (data) => {
    // Simulated signup
    return { success: true, message: "User registered successfully!" };
  };
  