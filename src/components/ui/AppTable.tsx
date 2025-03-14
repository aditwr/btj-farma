import { Pagination } from "antd";

export default function AppTable({ className }: { className?: string }) {
  return (
    <div
      className={`relative overflow-x-auto overflow-hidden rounded-md ${className}`}
    >
      <table className="w-full text-sm text-left">
        <thead className="text-xs bg-neutral-50 text-neutral-700">
          <tr>
            <th scope="col" className="px-6 py-3">
              No
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Created at
            </th>
            {/* <th scope="col" className="px-6 py-3">
              Role
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th> */}
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b border-neutral-200 hover:bg-neutral-50 ">
            <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
              1
            </td>
            <td>adit@gmail.com</td>
            <td>12 Jan 2024</td>
            {/* <td>ROle</td>
            <td>Aktif</td>
            <td></td> */}
          </tr>
        </tbody>
      </table>
      <div className="mt-4">
        <Pagination />
      </div>
    </div>
  );
}

export const TableContainer = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`relative overflow-x-auto overflow-hidden rounded-md ${className}`}
    >
      {children}
    </div>
  );
};

export const Table = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <table className={`w-full text-sm text-left ${className}`}>
      {children}
    </table>
  );
};

export const TableHeader = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <thead className={`text-xs bg-neutral-50 text-neutral-700 ${className}`}>
      {children}
    </thead>
  );
};

export const TableHeaderRow = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return <tr className={` ${className}`}>{children}</tr>;
};

export const TableHead = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <th scope="col" className={`px-6 py-3 ${className}`}>
      {children}
    </th>
  );
};

export const TableBody = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return <tbody className={` ${className}`}>{children}</tbody>;
};

export const TableRow = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <tr
      className={`bg-white border-b border-neutral-200 hover:bg-neutral-50 ${className}`}
    >
      {children}
    </tr>
  );
};

export const TableCell = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <td scope="row" className={`px-6 py-4 whitespace-nowrap ${className}`}>
      {children}
    </td>
  );
};

export const TableFooter = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return <div className={`mt-4 ${className}`}>{children}</div>;
};
