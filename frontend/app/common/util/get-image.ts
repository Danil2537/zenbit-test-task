"use server";

import { get } from "./fetch";

export default async function getImage(
  key: string
): Promise<{ url: string } | null> {
  const { data } = await get<{ url: string }>(`bucket/${key}`);
  return data;
}
