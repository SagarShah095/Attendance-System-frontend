import EmployeeSidebar from "../../components/Employee/EmployeeSidebar";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaBriefcase, FaBirthdayCake, FaUser, FaEdit } from "react-icons/fa";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const profileDetails = [
    { label: "Employee ID", value: user?.employeeId || "EMP-1024" },
    { label: "Role", value: user?.role || "Employee" },
    { label: "Department", value: user?.department || "Engineering" },
    { label: "Position", value: user?.position || "Software Engineer" },
  ];

  return (
    <div className="flex min-h-screen bg-background text-textPrimary">
      <EmployeeSidebar />

      <main className="flex-1 ml-72 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto space-y-6">
          <section className="bg-surface rounded-3xl border border-border shadow-soft overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-primaryHover p-8 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-2xl bg-white/10 flex items-center justify-center text-2xl font-bold">
                    {user?.name?.charAt(0) || "E"}
                  </div>
                  <div>
                    <p className="text-sm opacity-80">Profile</p>
                    <h1 className="text-3xl font-bold">{user?.name || "Employee Name"}</h1>
                    <p className="text-sm opacity-80">{user?.position || "Software Engineer"}</p>
                  </div>
                </div>
                <button className="rounded-xl bg-white/10 hover:bg-white/15 px-4 py-2.5 font-semibold flex items-center gap-2">
                  <FaEdit />
                  Edit Profile
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
              <div className="md:col-span-2 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {profileDetails.map((item) => (
                    <div key={item.label} className="bg-background rounded-2xl p-4 border border-border">
                      <p className="text-sm text-textSecondary">{item.label}</p>
                      <p className="font-semibold mt-1">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-background rounded-2xl p-5 border border-border">
                  <h3 className="font-semibold mb-3">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <FaEnvelope className="text-primary" />
                      <span>{user?.email || "employee@example.com"}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <FaPhone className="text-primary" />
                      <span>{user?.phoneNumber || "+91 98765 43210"}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <FaMapMarkerAlt className="text-primary" />
                      <span>{user?.address || "Bangalore, India"}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-background rounded-2xl p-5 border border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <FaUser className="text-primary" />
                    <h3 className="font-semibold">Personal Info</h3>
                  </div>
                  <div className="space-y-2 text-sm text-textSecondary">
                    <p><span className="font-medium text-textPrimary">Gender:</span> {user?.gender || "Male"}</p>
                    <p><span className="font-medium text-textPrimary">DOB:</span> {user?.dateOfBirth || "1998-06-18"}</p>
                  </div>
                </div>

                <div className="bg-background rounded-2xl p-5 border border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <FaBriefcase className="text-primary" />
                    <h3 className="font-semibold">Work Summary</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-textSecondary">Work Mode</p>
                    <p className="font-semibold">Onsite / Hybrid</p>
                  </div>
                </div>

                <div className="bg-background rounded-2xl p-5 border border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <FaBirthdayCake className="text-primary" />
                    <h3 className="font-semibold">Joining Date</h3>
                  </div>
                  <p className="text-sm text-textSecondary">01 Jan 2024</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Profile;
