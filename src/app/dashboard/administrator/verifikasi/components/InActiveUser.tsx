"use client";
import { Button, Modal, Select, notification, Badge, Pagination } from "antd";
import { type User } from "@/types/database";
import { useState, useEffect } from "react";
import axios from "axios";
import { APIResponse, NotificationType } from "@/types/types";
import { openNotificationWithIcon } from "@/utils/antd";
import { LoadingTopLevel } from "@/components/ui/Loading";
import { EditOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUsers, updateUsers } from "../services";
import { Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableHeader, TableHeaderRow, TableRow } from "@/components/ui/AppTable";
import { formatDate } from "@/helpers";

interface APIResponseData {
  users: User[];
  pagination: {
    total: number
  }
}

export default function InActiveUser({
  roles,
}: {
  roles: { id: number; role: string }[] | undefined;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<{
    id?: string;
    id_role?: number;
    aktif?: boolean;
  }>({});
  const [api, contextHolder] = notification.useNotification();

  // pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 2;

  // query
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["users", "inactive", currentPage, itemsPerPage],
    queryFn: () =>
      getUsers({
        activeStatus: false,
        page: currentPage,
        itemsPerPage: itemsPerPage,
      }),
  });
  const APIResponse: APIResponse<APIResponseData | null> = query.data;

  // mutation
  const updateUser = useMutation({
    mutationFn: updateUsers,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users", "inactive", currentPage, itemsPerPage],
      });
      openNotificationWithIcon(api, "success", "Update account success!")
    }
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    const res = updateUser.mutate({
        id: formData.id,
        id_role: formData.id_role,
        aktif: formData.aktif,
      }
    )
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if(query.isLoading) return <LoadingTopLevel />
  if(query.isError) return <div>Internal Server Error</div>

  return (
    <div className="">
      {/* context for notification component */}
      {contextHolder}
      {updateUser.isPending && <LoadingTopLevel />}
      {query.isSuccess && query.data && APIResponse.data ? (
        <div className="">
          <h3 className="text-lg font-semibold mb-4">Inactive Users List</h3>
          <TableContainer>
            <Table>
              <TableHeader>
                <TableHeaderRow>
                  <TableHead>No</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Created at</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableHeaderRow>
              </TableHeader>
              <TableBody>
                {APIResponse.data.users.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {(currentPage - 1) * itemsPerPage + (index + 1)}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{formatDate(user.created_at)}</TableCell>
                    <TableCell>
                      {user?.id_role
                        ? roles?.find((role) => role.id === user.id_role)?.role
                        : "belum punya role"}
                    </TableCell>
                    <TableCell>
                      {user?.aktif === true ? (
                        <Badge status="success" text="Aktif" />
                      ) : (
                        <Badge status="default" text="Tidak Aktif" />
                      )}
                    </TableCell>
                    <TableCell>
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TableFooter>
              <Pagination
                current={currentPage}
                total={APIResponse.data.pagination.total}
                pageSize={itemsPerPage}
                onChange={(page, pageSize) => {
                  setCurrentPage(page);
                }}
              />
            </TableFooter>
          </TableContainer>
          <Modal
            title="Update User"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={handleCancel}>
                Cancel
              </Button>,
              <Button
                key="submit"
                type="primary"
                loading={updateUser.isPending}
                onClick={handleOk}
              >
                Save
              </Button>,
            ]}
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
                        roles?.find((role) => role.id === formData.id_role)
                          ?.role
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
      ) : (
        <div>No Data</div>
      )}
    </div>
  );
}
