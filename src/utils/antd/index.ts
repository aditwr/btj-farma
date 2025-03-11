import { NotificationType } from "@/types/types";
import { NotificationInstance } from "antd/es/notification/interface";

export const openNotificationWithIcon = (
  api: NotificationInstance,
  type: NotificationType,
  message: string,
  description?: string
) => {
  api[type]({
    message: message,
    description: description ?? null,
  });
};
