import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
const links = [
  { name: "Dashboard", path: "/applicant/dashboard" },
  { name: "Find Job", path: "/applicant/jobs" },
  { name: "Applied Jobs", path: "/applicant/applied-jobs" },
];
const countries = [
  { code: "de", name: "Germany", flag: "https://flagcdn.com/w20/de.png" },
  { code: "in", name: "India", flag: "https://flagcdn.com/w20/in.png" },
  { code: "us", name: "United States", flag: "https://flagcdn.com/w20/us.png" },
  {
    code: "uk",
    name: "United Kingdom",
    flag: "https://flagcdn.com/w20/gb.png",
  },
  { code: "ca", name: "Canada", flag: "https://flagcdn.com/w20/ca.png" },
];

export const AppWrapper = ({ children }) => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  return (
    <>
      <div className="bg-gray-100 px-[10%]">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex items-center justify-between h-12">
            {/* Left Nav Links */}
            <div className="flex items-center gap-8">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-[15px] font-medium h-12 flex items-center
                ${
                  pathname === link.path
                    ? "border-b-2 text-blue-600  border-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Language Selector */}
            <div className="relative flex items-center gap-2">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center cursor-pointer gap-2 py-1.5 px-3 rounded-full transition-colors"
              >
                <img
                  src={selectedCountry.flag}
                  alt={selectedCountry.name}
                  className="w-5 h-3.5 object-cover"
                />
                <span className="text-sm text-gray-700">
                  {selectedCountry.name}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-500 stroke-[1.5px]" />
              </button>

              {isOpen && (
                <div className="z-50 absolute top-full right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1">
                  {countries.map((country) => (
                    <button
                      key={country.code}
                      className="w-full cursor-pointer flex items-center gap-2 px-3 py-2 text-[15px] text-gray-700 hover:bg-gray-50"
                      onClick={() => {
                        setSelectedCountry(country);
                        setIsOpen(false);
                      }}
                    >
                      <img
                        src={country.flag}
                        alt={country.name}
                        className="w-5 h-3.5 object-cover"
                      />
                      {country.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="px-[10%] bg-white">{children}</div>
    </>
  );
};