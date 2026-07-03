import { useMemo, useState } from "react";
import EmployeeSidebar from "../../components/Employee/EmployeeSidebar";
import {
  FaClock,
  FaCalendarCheck,
  FaFileAlt,
  FaLock,
  FaCoffee,
  FaSignOutAlt,
} from "react-icons/fa";

const attendanceActions = [
  {
    key: "punchIn",
    label: "Punch In",
    icon: <FaClock />,
    color: "from-emerald-500 to-teal-500",
    description: "Start your workday",
  },
  {
    key: "lunchIn",
    label: "Lunch In",
    icon: <FaCoffee />,
    color: "from-amber-500 to-orange-500",
    description: "Take your lunch break",
  },
  {
    key: "lunchOut",
    label: "Lunch Out",
    icon: <FaCoffee />,
    color: "from-yellow-500 to-amber-500",
    description: "Resume after lunch",
  },
  {
    key: "punchOut",
    label: "Punch Out",
    icon: <FaSignOutAlt />,
    color: "from-rose-500 to-red-500",
    description: "End your workday",
  },
];

const Emp_dashboard = () => {
  const [status, setStatus] = useState("punchIn");
  const [leaveForm, setLeaveForm] = useState({
    type: "Sick Leave",
    fromDate: "",
    toDate: "",
    reason: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const currentUser = useMemo(
    () => JSON.parse(localStorage.getItem("user") || "{}"),
    []
  );

  const attendanceStats = [
    { label: "Present Days", value: "22", detail: "This month" },
    { label: "Attendance %", value: "91%", detail: "Workday accuracy" },
    { label: "Late Entries", value: "1", detail: "This month" },
    { label: "Leave Balance", value: "5", detail: "Days remaining" },
  ];

  const handleAttendance = (actionKey) => {
    setStatus(actionKey);
  };

  const handleLeaveSubmit = (e) => {
    e.preventDefault();
    console.log("Leave request submitted", leaveForm);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    console.log("Password change submitted", passwordForm);
  };

  return (
    <div className="flex min-h-screen bg-background text-textPrimary">
      <EmployeeSidebar />

      <main className="flex-1 ml-72 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          <section className="rounded-3xl bg-gradient-to-r from-primary to-primaryHover p-6 text-white shadow-soft">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-sm opacity-80">Welcome back</p>
                <h1 className="text-3xl font-bold mt-1">
                  {currentUser?.name || "Employee"}
                </h1>
              </div>
              <div className="bg-white/10 rounded-2xl px-4 py-3 text-sm backdrop-blur-sm">
                <p className="opacity-80">Today</p>
                <p className="font-semibold">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {attendanceActions.map((action) => (
              <button
                key={action.key}
                onClick={() => handleAttendance(action.key)}
                className={`group rounded-2xl p-5 text-left border transition-all duration-300 ${
                  status === action.key
                    ? "bg-primary text-white border-primary shadow-lg"
                    : "bg-surface border-border hover:border-primary hover:-translate-y-0.5"
                }`}
              >
                <div className={`inline-flex rounded-xl bg-gradient-to-r ${action.color} p-3 text-white shadow-md`}>
                  {action.icon}
                </div>
                <h3 className="mt-3 font-semibold">{action.label}</h3>
                <p className={`text-sm mt-1 ${status === action.key ? "text-white/80" : "text-textSecondary"}`}>
                  {action.description}
                </p>
              </button>
            ))}
          </section>

          <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {attendanceStats.map((item) => (
              <div key={item.label} className="bg-surface rounded-2xl p-5 border border-border shadow-soft">
                <p className="text-sm text-textSecondary">{item.label}</p>
                <h2 className="text-3xl font-bold mt-1">{item.value}</h2>
                <p className="text-xs text-textSecondary mt-1">{item.detail}</p>
              </div>
            ))}
          </section>

          <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 bg-surface rounded-3xl border border-border shadow-soft p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-textSecondary">Attendance Overview</p>
                  <h2 className="text-xl font-bold">Today’s Timeline</h2>
                </div>
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                  {status.replace(/([A-Z])/g, " $1")}
                </span>
              </div>

              <div className="space-y-3">
                {[
                  { time: "09:00 AM", label: "Punch In", done: true },
                  { time: "01:00 PM", label: "Lunch In", done: true },
                  { time: "02:00 PM", label: "Lunch Out", done: false },
                  { time: "06:00 PM", label: "Punch Out", done: false },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between rounded-2xl bg-background p-4">
                    <div>
                      <p className="font-medium">{item.label}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-textSecondary">{item.time}</span>
                      <span className={`px-2.5 py-1 text-xs rounded-full font-semibold ${item.done ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"}`}>
                        {item.done ? "Completed" : "Pending"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-surface rounded-3xl border border-border shadow-soft p-6">
              <div className="flex items-center gap-2 mb-4">
                <FaFileAlt className="text-primary" />
                <h2 className="text-xl font-bold">Ask for Leave</h2>
              </div>
              <form onSubmit={handleLeaveSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Leave Type</label>
                  <select
                    value={leaveForm.type}
                    onChange={(e) => setLeaveForm({ ...leaveForm, type: e.target.value })}
                    className="w-full mt-1 rounded-xl border border-border bg-background px-4 py-2.5 outline-none focus:border-primary"
                  >
                    <option>Sick Leave</option>
                    <option>Casual Leave</option>
                    <option>Annual Leave</option>
                    <option>Personal Leave</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium">From</label>
                    <input
                      type="date"
                      value={leaveForm.fromDate}
                      onChange={(e) => setLeaveForm({ ...leaveForm, fromDate: e.target.value })}
                      className="w-full mt-1 rounded-xl border border-border bg-background px-4 py-2.5 outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">To</label>
                    <input
                      type="date"
                      value={leaveForm.toDate}
                      onChange={(e) => setLeaveForm({ ...leaveForm, toDate: e.target.value })}
                      className="w-full mt-1 rounded-xl border border-border bg-background px-4 py-2.5 outline-none focus:border-primary"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Reason</label>
                  <textarea
                    rows="4"
                    value={leaveForm.reason}
                    onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
                    placeholder="Write your reason here..."
                    className="w-full mt-1 rounded-xl border border-border bg-background px-4 py-2.5 outline-none focus:border-primary resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-primary hover:bg-primaryHover text-white font-semibold py-3 transition-all"
                >
                  Submit Leave Request
                </button>
              </form>
            </div>
          </section>

          <section className="bg-surface rounded-3xl border border-border shadow-soft p-6">
            <div className="flex items-center gap-2 mb-4">
              <FaLock className="text-primary" />
              <h2 className="text-xl font-bold">Change Password</h2>
            </div>
            <form onSubmit={handlePasswordSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="password"
                placeholder="Current Password"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                className="rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
              />
              <input
                type="password"
                placeholder="New Password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                className="rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="rounded-xl bg-primary hover:bg-primaryHover text-white font-semibold py-3 transition-all"
              >
                Update Password
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Emp_dashboard;