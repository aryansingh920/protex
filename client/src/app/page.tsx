"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Paper,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
  Alert,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAlertCircle, IconLogin } from "@tabler/icons-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { login } from "@/store/authSlice";
import { saveSession } from "@/store/session";

const REGIONS = [
  { value: "us-east", label: "US East" },
  { value: "us-west", label: "US West" },
  { value: "eu-central", label: "EU Central" },
  { value: "ap-south", label: "AP South" },
  { value: "ap-southeast", label: "AP Southeast" },
];

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, router]);

  const form = useForm({
    initialValues: { username: "", userId: "", region: "" },
    validate: {
      username: (v) =>
        v.trim().length < 2 ? "Username must be at least 2 characters" : null,
      userId: (v) =>
        v.trim().length < 3 ? "User ID must be at least 3 characters" : null,
      region: (v) => (!v ? "Please select a region" : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    setError("");
    try {
      // Simulate a brief auth delay
      await new Promise((r) => setTimeout(r, 600));

      const user = {
        username: values.username.trim(),
        userId: values.userId.trim(),
        region: values.region,
      };

      // Save to Redux store + sessionStorage
      dispatch(login(user));
      saveSession(user);

      router.push("/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 50%, #f0f9ff 100%)",
        padding: "1rem",
      }}
    >
      <Paper
        shadow="xl"
        radius="lg"
        p="xl"
        style={{ width: "100%", maxWidth: 420 }}
        withBorder
      >
        <Stack gap="lg">
          {/* Header */}
          <Stack gap={4} align="center">
            <Box
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: "var(--mantine-color-indigo-6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 4,
              }}
            >
              <IconLogin size={26} color="white" />
            </Box>
            <Title
              order={2}
              ta="center"
              style={{ color: "var(--mantine-color-indigo-8)" }}
            >
              Welcome back
            </Title>
            <Text c="dimmed" size="sm" ta="center">
              Sign in to access your dashboard
            </Text>
          </Stack>

          {error && (
            <Alert
              icon={<IconAlertCircle size={16} />}
              color="red"
              variant="light"
            >
              {error}
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md">
              <TextInput
                label="Username"
                placeholder="e.g. john_doe"
                required
                {...form.getInputProps("username")}
              />
              <TextInput
                label="User ID"
                placeholder="e.g. USR-00123"
                required
                {...form.getInputProps("userId")}
              />
              <Select
                label="Region"
                placeholder="Select your region"
                data={REGIONS}
                required
                {...form.getInputProps("region")}
              />
              <Button
                type="submit"
                fullWidth
                size="md"
                mt="xs"
                loading={loading}
                color="indigo"
              >
                Sign In
              </Button>
            </Stack>
          </form>

          <Text size="xs" c="dimmed" ta="center">
            Your session is stored locally and expires when you close the
            browser.
          </Text>
        </Stack>
      </Paper>
    </Box>
  );
}
