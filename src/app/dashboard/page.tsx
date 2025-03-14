"use client";

import AppTable, {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableHeaderRow,
  TableRow,
} from "@/components/ui/AppTable";

const DashboardPage = () => {
  return (
    <div>
      <div className="">This is Dashboard</div>
      <AppTable />

      <div className="">
        <h1>My Table Component</h1>
        <div className="mt-3">
          <TableContainer>
            <Table>
              <TableHeader>
                <TableHeaderRow>
                  <TableHead>No</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Nama</TableHead>
                </TableHeaderRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>aditya@gmail.com</TableCell>
                  <TableCell>Aditya Wahyu Ramadhan</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
