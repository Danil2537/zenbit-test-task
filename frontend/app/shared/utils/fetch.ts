import { cookies } from "next/headers";
import { API_URL } from "../constants/api";
import { getErrorMessage } from "./errors";

type FetchResult<T = any> = {
  response: Response;
  data: T | null;
  error: string | null;
};

const getHeaders = async () => {
    const cookieStore = cookies();
    const cookieHeader = (await cookieStore).getAll().map(c => `${c.name}=${c.value}`).join("; ");
    return {
      Cookie: cookieHeader,
    };
  };

const parseResponse = async <T>(res: Response): Promise<FetchResult<T>> => {
  let data: T | null = null;
  let error: string | null = null;

  try {
    data = await res.json();
  } catch {
    // ignore JSON parse errors (e.g. empty body)
  }

  if (!res.ok) {
    error = getErrorMessage(data);
  }

  return { response: res, data, error };
};

export const post = async <T = any>(
  path: string,
  body?: unknown
): Promise<FetchResult<T>> => {
  const res = await fetch(`${API_URL}/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(await getHeaders()),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  return parseResponse<T>(res);
};

export const get = async <T = any>(
  path: string
): Promise<FetchResult<T>> => {
  const res = await fetch(`${API_URL}/${path}`, {
    headers: { ...(await getHeaders()) },
  });

  return parseResponse<T>(res);
};
