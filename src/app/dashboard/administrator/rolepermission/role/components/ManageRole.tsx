"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getRoles } from "../services/roleService";
import { LoadingTopLevel } from "@/components/ui/Loading";
import { Button, Table, Modal } from "antd";
import { convertRolesToDataSource } from "../services/helpers";
import React, { useState } from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Role } from "@/types/data";

const { confirm } = Modal;

export default function ManageRole() {
  const queryClient = useQueryClient();
  const roles = useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
  });

  if (roles.isLoading) return <LoadingTopLevel />;
  if (roles.isError) {
    console.log(
      "/dashboard/admininistrator/rolepermission/role error: ",
      roles.error
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

const columns = [
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
        <Table
          dataSource={dataSource}
          columns={columns}
          size="small"
          pagination={false}
        />
      </div>
    </div>
  );
}
