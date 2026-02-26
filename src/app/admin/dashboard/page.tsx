import { getTasks } from "@/lib/demo-data";
import { AdminDashboardClient } from "@/components/admin-dashboard-client";

export default function AdminDashboardPage() {
  const tasks = getTasks();
  return <AdminDashboardClient tasks={tasks} />;
}
