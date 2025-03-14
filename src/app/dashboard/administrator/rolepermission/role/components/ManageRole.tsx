"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getRoles } from "../services/roleService";
import { LoadingTopLevel } from "@/components/ui/Loading";
import { Button, Table, Modal, TableColumnsType } from "antd";
import { convertRolesToDataSource } from "../services/helpers";
import React, { useState } from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Role } from "@/types/data";

const { confirm } = Modal;

interface DataType {
  key: string;
  no: string;
  role: string;
  created_at: string;
}

type APIRes = {
  success?: boolean;
  message?: string;
  data?: any;
  countRecord?: number;
  [key: string]: any;
};

export default function ManageRole() {
  const [currentPage, setCurrentPage] = useState(1); // page number
  const pageSize = 3; // items per page

  const queryClient = useQueryClient();
  const res: APIRes = useQuery({
    queryKey: ["roles", currentPage, pageSize],
    queryFn: () => getRoles(currentPage, pageSize),
  });

  const roles = res.data;
  const countRecord = res.countRecord;

  if (res.isLoading) return <LoadingTopLevel />;
  if (res.isError) {
    console.log(
      "/dashboard/admininistrator/rolepermission/role error: ",
      res.error
    );
    return <div>Internal Server Error</div>;
  }

  const dataSource = convertRolesToDataSource(roles.data);

  const showDeleteConfirm = (role: Role) => {
    confirm({
      title: "Yakin ingin menghapus Role?",
      icon: <ExclamationCircleFilled />,
      content: (
        <p>
          Apakah anda yakin ingin menghapus Role <strong>{role.role}</strong>?
        </p>
      ),
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Created at",
      dataIndex: "created_at",
      key: "created_at",
      sorter: true,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (role: Role, record: any) => (
        <Button onClick={() => showDeleteConfirm(role)} danger>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div className="">
      <div className="w-1/2">
        <Table<DataType>
          dataSource={dataSource}
          columns={columns}
          onChange={(pagination, filters, sorter) => {
            console.log(sorter);
            if (pagination.current) {
              setCurrentPage(pagination.current);
            }
          }}
          size="small"
          pagination={{
            pageSize: pageSize,
            total: roles?.countRecord,
            current: currentPage,
          }}
        />
      </div>
    </div>
  );
}
