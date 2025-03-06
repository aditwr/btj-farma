"use client";
import React, { useState } from "react";
import { loginWithEmailPassword } from "@/app/(auth)/auth/actions";
import { ServerRequestResponse } from "@/types/types";
import { Button, Form, Input, notification } from "antd";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LoadingOutlined, LoginOutlined } from "@ant-design/icons";

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
});
interface LoginFormInputs {
  email: string;
  password: string;
}

type NotificationType = "success" | "info" | "warning" | "error";

function LoginForm() {
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

  const onSubmit = async (data: LoginFormInputs) => {
    setLoading(true);
    const res: ServerRequestResponse = await loginWithEmailPassword({
      email: data.email,
      password: data.password,
    });
    if (!res?.success) {
      openNotificationWithIcon("error", "Login Failed!", res?.message || "");
    }
    setLoading(false);
  };

  return (
    <div className="p-5 rounded-lg">
      {contextHolder}
      <div className="">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
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
        <Form.Item>
          <Button type="primary" htmlType="submit" className="flex gap-x-2">
            {!loading ? (
              <span>
                Login <LoginOutlined />
              </span>
            ) : (
              <span>
                Logging In... <LoadingOutlined />
              </span>
            )}
          </Button>
        </Form.Item>
      </Form>
      {/* register page link */}
      <div className="">
        <p className="text-sm">
          Don&apos;t have an account?{" "}
          <a href="/register" className="text-blue-500">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
