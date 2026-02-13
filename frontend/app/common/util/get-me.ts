"use server";

import { get } from "./fetch";

export default async function getMe() {
  const { data } = await get("user/me");
  return data;
}
