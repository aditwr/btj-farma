'use client'
import ReportSalesHome from "@/components/dashboard/report/sales/ReportSalesHome";
import React from "react";


function DashboardReportSales() {
  // const supabaseAtAMPersada: SupabaseClient | null = useSupabaseAtAMPersada();

  // useEffect(() => {
  //   async function fetchData() {
  //     if (supabaseAtAMPersada) {
  //       const { data, error } = await supabaseAtAMPersada
  //         .from("pg_penjualan_btj_view")
  //         .select("*");
  //       if (error) {
  //         console.error("Error fetching data:", error);
  //       } else {
  //         // console.log(data);
  //       }
  //     }
  //   }

  //   fetchData();
  // }, [supabaseAtAMPersada]);

  return <div className="py-4">
    <div className="">
      <ReportSalesHome />
    </div>
  </div>;
}

export default DashboardReportSales;
