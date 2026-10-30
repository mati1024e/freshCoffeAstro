import { userSchema } from "@/types/auth.schema";
import { guestCredentials } from "./dal";

export const loginUser = async () => {
  const res = await fetch(`${import.meta.env.AUTH_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(guestCredentials),
  });
  const json = await res.json();
  return json;
};
export const verifyUser = async (token: string) => {
  const res = await fetch(`${import.meta.env.API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await res.json();
  const user = userSchema.safeParse(json);

  if (!user.success) return { user: null };

  return {
    user: user.data,
  };
};

export const loginUserWithParams = async (data: {
  username: string;
  password: string;
}) => {
  const res = await fetch(`${import.meta.env.AUTH_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  
  return json;
};
