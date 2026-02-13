"use client";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Building } from "../page";
import { useState, useEffect } from "react";
import BuildingDisplay from "./building";
import getBuildings from "../common/util/get-Buildings";

export default function Authenticated() {
  const [buildings, setBuildings] = useState<Building[]|null>([]);
  useEffect(()=>{
          const getBuilds = async () => {
              const builds:Building[]|null = await getBuildings();
              setBuildings(builds);
          };
          getBuilds();
      },[]);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  if (!isAuthenticated) return null;

  return (
    <div>
      <ul>
        {buildings?.map((building) => (
        <li key={building.id}>
          <BuildingDisplay building={building}/>
        </li>
        ))}
      </ul>
    </div>
  );
}
