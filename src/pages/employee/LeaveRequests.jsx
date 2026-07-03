import { useState } from "react";
import EmployeeSidebar from "../../components/Employee/EmployeeSidebar";
import { FaFileAlt, FaPlus } from "react-icons/fa";

const leaveRequests = [
  { id: 1, type: "Sick Leave", from: "2026-06-10", to: "2026-06-11", reason: "Fever", status: "Approved" },
  { id: 2, type: "Casual Leave", from: "2026-06-20", to: "2026-06-21", reason: "Family function", status: "Pending" },
  { id: 3, type: "Annual Leave", from: "2026-05-01", to: "2026-05-03", reason: "Vacation", status: "Rejected" },
];

const LeaveRequests = () => {
  const [form, setForm] = useState({
    type: "Sick Leave",
    fromDate: "",
    toDate: "",
    reason: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Leave request submitted", form);
  };

  return (
    <div className="flex min-h-screen bg-background text-textPrimary">
      <EmployeeSidebar />

      <main className="flex-1 ml-72 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          <section className="bg-surface rounded-3xl border border-border shadow-soft p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-textSecondary">Leave Management</p>
                <h2 className="text-2xl font-bold">Leave Requests</h2>
              </div>
              <button className="rounded-xl bg-primary hover:bg-primaryHover text-white px-4 py-2.5 font-semibold flex items-center gap-2">
                <FaPlus />
                New Request
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Leave Type</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full mt-1 rounded-xl border border-border bg-background px-4 py-2.5 outline-none focus:border-primary"
                >
                  <option>Sick Leave</option>
                  <option>Casual Leave</option>
                  <option>Annual Leave</option>
                  <option>Personal Leave</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Reason</label>
                <input
                  type="text"
                  value={form.reason}
                  onChange={(e) => setForm({ ...form, reason: e.target.value })}
                  placeholder="Reason for leave"
                  className="w-full mt-1 rounded-xl border border-border bg-background px-4 py-2.5 outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="text-sm font-medium">From</label>
                <input
                  type="date"
                  value={form.fromDate}
                  onChange={(e) => setForm({ ...form, fromDate: e.target.value })}
                  className="w-full mt-1 rounded-xl border border-border bg-background px-4 py-2.5 outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="text-sm font-medium">To</label>
                <input
                  type="date"
                  value={form.toDate}
                  onChange={(e) => setForm({ ...form, toDate: e.target.value })}
                  className="w-full mt-1 rounded-xl border border-border bg-background px-4 py-2.5 outline-none focus:border-primary"
                />
              </div>
              <div className="md:col-span-2">
                <button type="submit" className="w-full rounded-xl bg-primary hover:bg-primaryHover text-white font-semibold py-3 transition-all">
                  Submit Request
                </button>
              </div>
            </form>
          </section>

          <section className="bg-surface rounded-3xl border border-border shadow-soft p-6">
            <div className="flex items-center gap-2 mb-4">
              <FaFileAlt className="text-primary" />
              <h2 className="text-2xl font-bold">Request History</h2>
            </div>

            <div className="space-y-3">
              {leaveRequests.map((request) => (
                <div key={request.id} className="flex flex-col md:flex-row md:items-center md:justify-between rounded-2xl bg-background p-4 border border-border">
                  <div>
                    <h3 className="font-semibold">{request.type}</h3>
                    <p className="text-sm text-textSecondary">{request.from} to {request.to}</p>
                    <p className="text-sm text-textSecondary">Reason: {request.reason}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${request.status === "Approved" ? "bg-emerald-100 text-emerald-700" : request.status === "Pending" ? "bg-amber-100 text-amber-700" : "bg-rose-100 text-rose-700"}`}>
                    {request.status}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LeaveRequests;
