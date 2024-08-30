import { ExpenseByCategorySummary, useGetDashboardMetricsQuery } from "@/state/api";
import { PieChart, ResponsiveContainer } from "recharts";

type ExpenseSums = {
    [category: string]: number;
}

// adding the colors behore hand so it doesnt have to load everytime, nothing fancy
const colors = ["#00C49F", "#0088FE", "#FFBB28"];

const CardExpenseSummary = () => {
    const {data: dashboardMetrics, isLoading} = useGetDashboardMetricsQuery();

    const expenseByCategorySummary = dashboardMetrics?.expenseByCategorySummary || [];
    
    const expenseSums = expenseByCategorySummary.reduce(
        (acc: ExpenseSums, item: ExpenseByCategorySummary) => {
            const category = item.category + " Expenses";
            const amount = parseInt(item.amount, 10);
            if (!acc[category]) acc[category] = 0;
            acc[category] += amount;
            return acc;
        },
        {}
    );

  return (
    <div className="row-span-3 bg-white shodow-md rounded-2xl flex flex-col justify-between">
        {isLoading ? (
        <div className="m-5">Loading...</div> 
      ) : (
        <>
        {/* HEADER */}
        <div>
            <h2 className="text-lg font-semibold mb-2 px-7 pt-5">
              Expense Summary
            </h2>
            <hr />
          </div>
          {/* BODY */}
          <div className="xl:flex justify-between pr-7">
            {/* CHART */}
            <div className="relative basis-3/5">
                <ResponsiveContainer width="100%" height={140}>
                    <PieChart>
                        {/* <Pie data={expenseCategories} innerRadius={50} outRadius={60} fill="#88884d8" dataKey="value" nameKey="name" cx="50%" cy="50%">

                        </Pie>  */}
                    </PieChart>
                </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CardExpenseSummary