import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateJobMutation } from "../../redux/slices/api/recruiterApi";
import { z } from "zod";
import {
  BtnBold,
  BtnItalic,
  BtnUnderline,
  BtnStrikeThrough,
  Editor,
  EditorProvider,
  Toolbar,
} from "react-simple-wysiwyg";
import { AppWrapper } from "../../components/AppWrapper";
import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../ApplicantDashboard/components/Sidebar";
import { ArrowRightIcon } from "lucide-react";
import { Footer } from "../ApplicantDashboard/components/Footer";
import { useSelector } from "react-redux";

// Zod schema for form validation
const postJobSchema = z.object({
  jobTitle: z.string().min(1, "Job title is required"),
  tags: z.string().min(1, "At least one tag is required"),
  jobRole: z.string().min(1, "Job role is required"),
  minSalary: z.string().min(1, "Minimum salary is required"),
  maxSalary: z.string().min(1, "Maximum salary is required"),
  education: z.string().min(1, "Education is required"),
  experience: z.string().min(1, "Experience is required"),
  jobType: z.string().min(1, "Job type is required"),
  vacancies: z.string().min(1, "Number of vacancies is required"),
  expirationDate: z.string().min(1, "Expiration date is required"),
  jobLevel: z.string().min(1, "Job level is required"),
  applyMethod: z.enum(["jobpilot", "email"]),
  description: z.string().min(1, "Job description is required"),
  responsibilities: z.string().min(1, "Job responsibilities are required"),
});


export const PostJob = () => {

    const { user } = useSelector((state) => state.auth);
  
    const loggedInUserId = user?.userId 
    
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postJobSchema),
    defaultValues: {
      applyMethod: "jobpilot",
      jobRole: "",

    },
  });
  const [createJob, { isLoading, isSuccess, isError, error }] = useCreateJobMutation();

  const onSubmit = async (data) => {
    try {
      const userId = loggedInUserId;
      data.userId = userId;
      console.log("Submitting job data:", data);
      await createJob({ userId, data }).unwrap();
      console.log("Job created:", data);
      alert("Job created successfully!");
    } catch (err) {
      console.error("Failed to create job:", err);
      alert("Failed to create job. Please try again.");
    }
  };

  const description = watch("description");
  const responsibilities = watch("responsibilities");

  const applyMethodSelected = watch("applyMethod");

  return (
    
    <>
      <div className="flex ">
        
        <div className="flex-1 p-8 h-[80vh] overflow-scroll">
          <h1 className="text-2xl font-semibold text-gray-900 mb-8">
            Post a job
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title
                </label>
                <input
                  type="text"
                  {...register("jobTitle")}
                  placeholder="Add job title, role, vacancies etc"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.jobTitle && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.jobTitle.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tags
                  </label>
                  <input
                    type="text"
                    {...register("tags")}
                    placeholder="Job keyword, tags etc..."
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.tags && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.tags.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Role
                  </label>
                  <select
                    {...register("jobRole")}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select...</option>
                    <option value="frontend">Frontend Developer</option>
                    <option value="backend">Backend Developer</option>
                    <option value="fullstack">Fullstack Developer</option>
                  </select>
                  {errors.jobRole && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.jobRole.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Salary Range - Fixed USD position */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Salary</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Min Salary
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      {...register("minSalary")}
                      placeholder="Minimum salary..."
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                      USD
                    </div>
                  </div>
                  {errors.minSalary && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.minSalary.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Salary
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      {...register("maxSalary")}
                      placeholder="Maximum salary..."
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                      USD
                    </div>
                  </div>
                  {errors.maxSalary && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.maxSalary.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Advanced Information */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Advance Information
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Education
                  </label>
                  <select
                    {...register("education")}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select...</option>
                    <option value="high_school">High School</option>
                    <option value="bachelors">Bachelor&apos;s Degree</option>
                    <option value="masters">Master&apos;s Degree</option>
                  </select>
                  {errors.education && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.education.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Experience
                  </label>
                  <select
                    {...register("experience")}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select...</option>
                    <option value="fresher">Fresher</option>
                    <option value="1-3">1-3 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5+">5+ years</option>
                  </select>
                  {errors.experience && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.experience.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Type
                  </label>
                  <select
                    {...register("jobType")}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select...</option>
                    <option value="full_time">Full Time</option>
                    <option value="part_time">Part Time</option>
                    <option value="contract">Contract</option>
                  </select>
                  {errors.jobType && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.jobType.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vacancies
                  </label>
                  <select
                    {...register("vacancies")}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select...</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5+</option>
                  </select>
                  {errors.vacancies && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.vacancies.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiration Date
                  </label>
                  <input
                    type="date"
                    {...register("expirationDate")}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.expirationDate && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.expirationDate.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Level
                  </label>
                  <select
                    {...register("jobLevel")}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select...</option>
                    <option value="entry">Entry Level</option>
                    <option value="mid">Mid Level</option>
                    <option value="senior">Senior Level</option>
                  </select>
                  {errors.jobLevel && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.jobLevel.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Apply Job Section */}
            <div className="bg-gray-100 p-6 rounded-lg">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Apply Job on:
              </h2>
              <div className="flex gap-4">
                <label
                  className={`flex-1 flex items-center gap-3 p-4  rounded-lg  cursor-pointer ${
                    applyMethodSelected === "jobpilot" ? "bg-white" : ""
                  }`}
                >
                  <input
                    type="radio"
                    {...register("applyMethod")}
                    value="jobpilot"
                    className="w-4 h-4 text-blue-600"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">On Jobpilot</h3>
                    <p className="text-sm text-gray-500">
                      Candidate will apply job using jobpilot & all application
                      will show on your dashboard.
                    </p>
                  </div>
                </label>

                <label
                  className={`flex-1 flex items-center gap-3 p-4  rounded-lg  cursor-pointer ${
                    applyMethodSelected === "email" ? "bg-white" : ""
                  }`}
                >
                  <input
                    type="radio"
                    {...register("applyMethod")}
                    value="email"
                    className="w-4 h-4 text-blue-600"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">On Your Email</h3>
                    <p className="text-sm text-gray-500">
                      Candidate apply job on your email address, and all
                      application in your email.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Description & Responsibility */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Description & Responsibility
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <div className="border rounded-lg overflow-hidden bg-white">
                    <EditorProvider>
                      <Editor
                        value={description}
                        onChange={(e) =>
                          setValue("description", e.target.value)
                        }
                        containerProps={{
                          className: "min-h-[200px] rsw-editor",
                        }}
                      >
                        <Toolbar>
                          <BtnBold />
                          <BtnItalic />
                          <BtnUnderline />
                          <BtnStrikeThrough />
                        </Toolbar>
                      </Editor>
                    </EditorProvider>
                  </div>
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Responsibilities
                  </label>
                  <div className="border rounded-lg overflow-hidden bg-white">
                    <EditorProvider>
                      <Editor
                        value={responsibilities}
                        onChange={(e) =>
                          setValue("responsibilities", e.target.value)
                        }
                        containerProps={{
                          className: "min-h-[200px] rsw-editor",
                        }}
                      >
                        <Toolbar>
                          <BtnBold />
                          <BtnItalic />
                          <BtnUnderline />
                          <BtnStrikeThrough />
                        </Toolbar>
                      </Editor>
                    </EditorProvider>
                  </div>
                  {errors.responsibilities && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.responsibilities.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="px-6 cursor-pointer py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none "
              >
                <div className="flex items-center gap-2">
                  Post Job <ArrowRightIcon className="w-5 h-5" />
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
      </>
  );
};

export default PostJob; // Ensure this default export