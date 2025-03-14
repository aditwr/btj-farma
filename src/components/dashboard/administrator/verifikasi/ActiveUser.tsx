"use client";
import { Button, Modal, Select, notification, Badge } from "antd";
import { type User } from "./VerificationTable";
import { formatTimestamp } from "@/utils";
import { useState, useEffect } from "react";
import axios from "axios";
import { NotificationType } from "@/types/types";
import { openNotificationWithIcon } from "@/utils/antd";
import { LoadingTopLevel } from "@/components/ui/Loading";
import { EditOutlined } from "@ant-design/icons";

export default function ActiveUser({
  activeUsers,
  roles,
  setRefresh,
}: {
  activeUsers: User[];
  roles: { id: number; role: string }[] | undefined;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<{
    id?: string;
    id_role?: number;
    aktif?: boolean;
  }>({});
  const [api, contextHolder] = notification.useNotification();
  const [SelectedUserRole, setSelectedUserRole] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  console.log(activeUsers);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    setLoading(true);
    try {
      const response = await axios.put(
        `/api/dashboard/administrator/verifikasi`,
        formData
      );
      console.log("form : ", formData);
      console.log(response.data);
      if (response.data?.success) {
        openNotificationWithIcon(
          api,
          "success",
          "Success",
          "Akun berhasil diupdate"
        );
        setRefresh((prev) => !prev);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="">
      {contextHolder}
      {loading && <LoadingTopLevel />}
      <div className="">
        <h3 className="text-lg font-semibold mb-2">Active Users List</h3>
        <div className="relative overflow-x-auto overflow-hidden rounded-md">
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
                <th scope="col" className="px-6 py-3">
                  Role
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {activeUsers.map((user, index) => (
                <tr
                  key={index}
                  className="bg-white border-b  border-gray-200 hover:bg-gray-50 "
                >
                  <td
                    scope="row"
                    className="px-6 py-3 font-medium whitespace-nowrap"
                  >
                    {index + 1}
                  </td>
                  <td>{user.email}</td>
                  <td>{formatTimestamp(user.created_at)}</td>
                  <td>
                    {user?.id_role
                      ? roles?.find((role) => role.id === user.id_role)?.role
                      : "belum punya role"}
                  </td>
                  <td>
                    {user?.aktif === true ? (
                      <Badge status="success" text="Aktif" />
                    ) : (
                      <Badge status="default" text="Tidak Aktif" />
                    )}
                  </td>
                  <td>
                    <Button
                      type="primary"
                      onClick={() => {
                        showModal();
                        setSelectedUser(user);
                        setFormData({
                          id: user.id,
                          id_role: user.id_role,
                          aktif: user.aktif,
                        });
                      }}
                    >
                      <EditOutlined />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Modal
          title="Update User"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          {selectedUser && (
            <div>
              <p className="mb-3">User: {selectedUser.email}</p>
              <form action="">
                <div className="flex flex-col mb-3 space-y-1">
                  <label htmlFor="role">Role :</label>
                  <Select
                    value={
                      formData?.id_role &&
                      roles?.find((role) => role.id === formData.id_role)?.role
                    }
                    style={{ width: 240 }}
                    onChange={(value: any) =>
                      setFormData({ ...formData, id_role: Number(value) })
                    }
                    options={
                      roles &&
                      roles.map((role) => ({
                        value: role?.id,
                        label: role?.role,
                      }))
                    }
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="role">Status Keaktifan User :</label>
                  <Select
                    value={formData?.aktif ? "Aktif" : "Non Aktif"}
                    style={{ width: 240 }}
                    onChange={(value: any) =>
                      setFormData({ ...formData, aktif: value })
                    }
                    options={[
                      {
                        value: true,
                        label: "Aktif",
                      },
                      {
                        value: false,
                        label: "Non Aktif",
                      },
                    ]}
                  />
                </div>
              </form>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}
