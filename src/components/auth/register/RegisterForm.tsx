"use client";
import React, { useState } from "react";
import { signUpWithEmail } from "@/app/(auth)/auth/actions";
import { ServerRequestResponse } from "@/types/types";
import { Button, Form, Input, Tooltip, notification } from "antd";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  InfoCircleOutlined,
  KeyOutlined,
  LoadingOutlined,
  LoginOutlined,
} from "@ant-design/icons";

const schema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number (example : Password123)"
    ),
  companycode: z.string().nonempty("Company Code is required"),
});

interface RegisterFormInputs {
  email: string;
  password: string;
  companycode: string;
}

type NotificationType = "success" | "info" | "warning" | "error";

function RegisterForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const [api, contextHolder] = notification.useNotification();

  const [loading, setLoading] = useState(false);

  const openNotificationWithIcon = (
    type: NotificationType,
    message: string,
    description: string
  ) => {
    api[type]({
      message: message,
      description: description,
    });
  };

  const onSubmit = async (data: RegisterFormInputs) => {
    setLoading(true);
    const res: ServerRequestResponse = await signUpWithEmail({ ...data });
    if (!res?.success) {
      openNotificationWithIcon(
        "error",
        "Registration Failed!",
        res?.message || ""
      );
    }
    setLoading(false);
  };

  return (
    <div className="p-5 rounded-lg">
      {contextHolder}
      <div className="">
        <h1 className="text-2xl font-bold mb-4">Create a new account!</h1>
      </div>
      <Form
        layout="vertical"
        className="w-[300px]"
        onFinish={handleSubmit(onSubmit)}
        disabled={loading}
      >
        <Form.Item
          label="Email"
          validateStatus={errors.email ? "error" : ""}
          help={errors.email?.message}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input {...field} type="email" placeholder="Enter your email" />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Password"
          validateStatus={errors.password ? "error" : ""}
          help={errors.password?.message}
        >
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input.Password {...field} placeholder="Enter your password" />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Company Code"
          validateStatus={errors.companycode ? "error" : ""}
          help={errors.companycode?.message}
        >
          <Controller
            name="companycode"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter your company code"
                prefix={<KeyOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                suffix={
                  <Tooltip title="The Company Registration Code is used to ensure that only company members can register a new account.">
                    <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                  </Tooltip>
                }
              />
            )}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="flex gap-x-2">
            {!loading ? (
              <span>
                Register <LoginOutlined />
              </span>
            ) : (
              <span>
                Registering... <LoadingOutlined />
              </span>
            )}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default RegisterForm;
