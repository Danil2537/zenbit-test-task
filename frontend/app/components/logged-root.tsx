// "use client";
// import { useSelector } from "react-redux";
// import { RootState } from "../store/store";
// import { Building } from "../page";
// import { useState, useEffect } from "react";
// import BuildingDisplay from "./building";
// import getBuildings from "../common/util/get-Buildings";

// export default function Authenticated() {
//   const [buildings, setBuildings] = useState<Building[]|null>([]);
//   useEffect(()=>{
//           const getBuilds = async () => {
//               const builds:Building[]|null = await getBuildings();
//               setBuildings(builds);
//           };
//           getBuilds();
//       },[]);
//   const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
//   if (!isAuthenticated) return null;

//   return (
//     <div>
//         <h1>Open Deals</h1>
//       <ul>
//         {buildings?.map((building) => (
//         <li key={building.id}>
//           <BuildingDisplay building={building}/>
//         </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
"use client";

import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Building } from "../page";
import { useState, useEffect } from "react";
import BuildingDisplay from "./building";
import getBuildings from "../common/util/get-Buildings";

export default function Authenticated() {
  const [buildings, setBuildings] = useState<Building[] | null>([]);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    const getBuilds = async () => {
      const builds: Building[] | null = await getBuildings();
      setBuildings(builds);
    };
    getBuilds();
  }, []);

  if (!isAuthenticated) return null;

  return (
    <section className="mx-auto max-w-[1280px] px-6 py-10">
      <h2 className="mb-6 font-[Merriweather] text-[28px] font-bold leading-[34px] text-[#B29F7E]">
        Open Deals
      </h2>
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {buildings?.map((building) => (
          <li key={building.id}>
            <BuildingDisplay building={building} />
          </li>
        ))}
      </ul>
    </section>
  );
}
