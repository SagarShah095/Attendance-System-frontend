import EmployeeSidebar from "../../components/Employee/EmployeeSidebar";
import { FaMoneyBillWave, FaDownload, FaChartLine } from "react-icons/fa";

const salaryHistory = [
  { month: "June 2026", basic: 50000, allowance: 8000, deductions: 1200, net: 57800 },
  { month: "May 2026", basic: 50000, allowance: 8000, deductions: 1100, net: 57900 },
  { month: "April 2026", basic: 50000, allowance: 8000, deductions: 1000, net: 58000 },
];

const Salary = () => {
  return (
    <div className="flex min-h-screen bg-background text-textPrimary">
      <EmployeeSidebar />

      <main className="flex-1 ml-72 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          <section className="bg-surface rounded-3xl border border-border shadow-soft p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-sm text-textSecondary">Current Salary</p>
                <h2 className="text-3xl font-bold">₹57,800</h2>
              </div>
              <button className="rounded-xl bg-primary hover:bg-primaryHover text-white px-4 py-2.5 font-semibold flex items-center gap-2">
                <FaDownload />
                Download Payslip
              </button>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-surface rounded-2xl border border-border p-5 shadow-soft">
              <p className="text-sm text-textSecondary">Basic</p>
              <h3 className="text-2xl font-bold mt-1">₹50,000</h3>
            </div>
            <div className="bg-surface rounded-2xl border border-border p-5 shadow-soft">
              <p className="text-sm text-textSecondary">Allowance</p>
              <h3 className="text-2xl font-bold mt-1">₹8,000</h3>
            </div>
            <div className="bg-surface rounded-2xl border border-border p-5 shadow-soft">
              <p className="text-sm text-textSecondary">Deductions</p>
              <h3 className="text-2xl font-bold mt-1">₹1,200</h3>
            </div>
          </section>

          <section className="bg-surface rounded-3xl border border-border shadow-soft p-6">
            <div className="flex items-center gap-2 mb-4">
              <FaChartLine className="text-primary" />
              <h2 className="text-2xl font-bold">Salary History</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-xs uppercase text-textSecondary">
                    <th className="pb-3">Month</th>
                    <th className="pb-3">Basic</th>
                    <th className="pb-3">Allowance</th>
                    <th className="pb-3">Deductions</th>
                    <th className="pb-3">Net Pay</th>
                  </tr>
                </thead>
                <tbody>
                  {salaryHistory.map((item) => (
                    <tr key={item.month} className="border-t border-border">
                      <td className="py-3 font-medium">{item.month}</td>
                      <td>₹{item.basic}</td>
                      <td>₹{item.allowance}</td>
                      <td>₹{item.deductions}</td>
                      <td className="font-semibold">₹{item.net}</td>
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

export default Salary;
