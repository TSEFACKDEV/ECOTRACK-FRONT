import { useEffect, useState } from "react";
import { FiUsers, FiAlertCircle, FiCalendar } from "react-icons/fi";
import { MdLightbulbOutline } from "react-icons/md";
import { Link } from "react-router";
import api from "../../utils/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { LineChart, Line } from "recharts";

const Dashboard = () => {
  const [userCount, setUserCount] = useState<number>(0);
  const [reportCount, setReportCount] = useState<number>(0);
  const [planingCount, setPlaningCount] = useState<number>(0);
  const [tipCount, setTipCount] = useState<number>(0);
  const [reportFrequency, setReportFrequency] = useState<
    { _id: string; count: number }[]
  >([]);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      console.log("API response:", response.data);
      setUserCount(
        Array.isArray(response.data.data) ? response.data.data.length : 0
      );
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReports = async () => {
    try {
      const response = await api.get("/report");
      console.log("API response:", response.data);
      // Utilise le count retourné par le backend
      setReportCount(
        typeof response.data.data?.count === "number"
          ? response.data.data.count
          : Array.isArray(response.data.data?.reports)
          ? response.data.data.reports.length
          : 0
      );
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTips = async () => {
    try {
      const response = await api.get("/tip");
      console.log("API response:", response.data);
      setTipCount(
        Array.isArray(response.data.data) ? response.data.data.length : 0
      );
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPlannings = async () => {
    try {
      const response = await api.get("/planning");
      console.log("API response:", response.data);
      setPlaningCount(
        Array.isArray(response.data.data) ? response.data.data.length : 0
      );
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReportFrequency = async () => {
    try {
      const response = await api.get("/report/frequency");
      setReportFrequency(response.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchReports();
    fetchTips();
    fetchPlannings();
    fetchReportFrequency();
  }, []);

  const stats = [
    {
      title: "Utilisateurs",
      value: userCount.toLocaleString(),
      icon: <FiUsers size={24} />,
      link: "/dashboard/user",
    },
    {
      title: "Signalements",
      value: reportCount.toLocaleString(),
      icon: <FiAlertCircle size={24} />,
      link: "/dashboard/reports",
    },
    {
      title: "Plannings",
      value: planingCount.toLocaleString(),
      icon: <FiCalendar size={24} />,
      link: "/dashboard/planning",
    },
    {
      title: "Conseils",
      value: tipCount.toLocaleString(),
      icon: <MdLightbulbOutline size={24} />,
      link: "/dashboard/astuces",
    },
  ];

  const chartData = [
    { name: "Utilisateurs", value: userCount },
    { name: "Signalements", value: reportCount },
    { name: "Plannings", value: planingCount },
    { name: "Conseils", value: tipCount },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Tableau de bord</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {stats.map((stat, index) => (
          <Link
            to={stat.link}
            key={index}
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>
                <p className="text-2xl font-semibold text-gray-800 mt-1">
                  {stat.value}
                </p>
              </div>
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                {stat.icon}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Bar Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-xl transition-shadow">
          <h2 className="text-lg font-semibold mb-4 text-green-700 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-green-400 rounded-full"></span>
            Statistiques globales
          </h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={chartData} barCategoryGap={30}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 13, fill: "#6b7280" }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 13, fill: "#6b7280" }} />
              <Tooltip
                contentStyle={{ borderRadius: 12, background: "#f9fafb", border: "none", color: "#222" }}
                cursor={{ fill: "#e5e7eb" }}
              />
              <Bar dataKey="value" fill="#34d399" radius={[12, 12, 0, 0]}>
                {/* Optionnel: effet de survol */}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-xl transition-shadow">
          <h2 className="text-lg font-semibold mb-4 text-rose-700 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-rose-400 rounded-full"></span>
            Fréquence journalière des signalements
          </h2>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={reportFrequency}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="_id" tick={{ fontSize: 13, fill: "#6b7280" }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 13, fill: "#6b7280" }} />
              <Tooltip
                contentStyle={{ borderRadius: 12, background: "#f9fafb", border: "none", color: "#222" }}
                cursor={{ fill: "#f3f4f6" }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="count"
                name="Signalements"
                stroke="#f87171"
                strokeWidth={3}
                dot={{ r: 5, fill: "#f87171", stroke: "#fff", strokeWidth: 2 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
