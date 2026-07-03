import EmployeeSidebar from "../../components/Employee/EmployeeSidebar";
import { FaCalendarCheck, FaClock } from "react-icons/fa";

const attendanceRecords = [
  { date: "2026-06-18", punchIn: "09:00 AM", lunchIn: "01:00 PM", lunchOut: "02:00 PM", punchOut: "06:00 PM", status: "Present" },
  { date: "2026-06-17", punchIn: "09:15 AM", lunchIn: "01:10 PM", lunchOut: "02:00 PM", punchOut: "06:10 PM", status: "Present" },
  { date: "2026-06-16", punchIn: "09:05 AM", lunchIn: "01:00 PM", lunchOut: "02:00 PM", punchOut: "06:05 PM", status: "Present" },
  { date: "2026-06-15", punchIn: "08:50 AM", lunchIn: "01:00 PM", lunchOut: "02:00 PM", punchOut: "05:50 PM", status: "Present" },
  { date: "2026-06-14", punchIn: "--", lunchIn: "--", lunchOut: "--", punchOut: "--", status: "Leave" },
];

const Attendance = () => {
  return (
    <div className="flex min-h-screen bg-background text-textPrimary">
      <EmployeeSidebar />

      <main className="flex-1 ml-72 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-surface rounded-2xl border border-border p-5 shadow-soft">
              <p className="text-sm text-textSecondary">This Month</p>
              <h2 className="text-3xl font-bold mt-1">22 Days</h2>
            </div>
            <div className="bg-surface rounded-2xl border border-border p-5 shadow-soft">
              <p className="text-sm text-textSecondary">Present</p>
              <h2 className="text-3xl font-bold mt-1">20</h2>
            </div>
            <div className="bg-surface rounded-2xl border border-border p-5 shadow-soft">
              <p className="text-sm text-textSecondary">Late Entries</p>
              <h2 className="text-3xl font-bold mt-1">1</h2>
            </div>
          </section>

          <section className="bg-surface rounded-3xl border border-border shadow-soft p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-textSecondary">Attendance Log</p>
                <h2 className="text-2xl font-bold">Recent Records</h2>
              </div>
              <button className="rounded-xl bg-primary hover:bg-primaryHover text-white px-4 py-2.5 font-semibold flex items-center gap-2">
                <FaCalendarCheck />
                Export
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-xs uppercase text-textSecondary">
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Punch In</th>
                    <th className="pb-3">Lunch In</th>
                    <th className="pb-3">Lunch Out</th>
                    <th className="pb-3">Punch Out</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceRecords.map((item) => (
                    <tr key={item.date} className="border-t border-border">
                      <td className="py-3 font-medium">{item.date}</td>
                      <td>{item.punchIn}</td>
                      <td>{item.lunchIn}</td>
                      <td>{item.lunchOut}</td>
                      <td>{item.punchOut}</td>
                      <td>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.status === "Present" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Attendance;
