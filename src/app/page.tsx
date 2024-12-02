import { DashboardGrid } from "./manualComponents/dashboardGrid/DashbordGrid";
import { DataTable } from "./manualComponents/features/DataTable";
import { KPICard } from "./manualComponents/features/KPICard";
import { LineChart } from "./manualComponents/features/LineChart";

export default function Home() {
  const tableData = [
    { id: 1, name: "Award A", value: 1000 },
    { id: 2, name: "Award B", value: 2000 },
    { id: 3, name: "Award C", value: 3000 },
  ];
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <DashboardGrid>
        <KPICard
          title="Awards trouvés"
          value="1,415"
          change={12}
          isPositive={true}
        />
        <KPICard title="-5%" value="3400" change={8} isPositive={true} />
        <KPICard title="-15%" value="2550" change={-3} isPositive={false} />
        <div className="col-span-2">
          <LineChart />
        </div>
        {/* <div className="row-span-2">
          <img
            src="https://picsum.photos/400/600"
            alt="Dashboard visual"
            width={400}
            height={600}
            className="rounded-lg object-cover w-full h-full"
          />
        </div> */}
        <div className="col-span-2">
          <DataTable data={tableData} />
        </div>
      </DashboardGrid>
    </div>
  );
}
