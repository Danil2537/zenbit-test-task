"use server";

import { Building } from "@/app/page";
import { get } from "./fetch";

// export default async function getBuildings() {
//   const { data } = await get("building");
//   return data;
// }

export default async function getBuildings(): Promise<Building[] | null> {
    const { data } = await get<Building[]>(`building`);
    return data;
  }