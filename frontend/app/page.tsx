"use client";
import { useEffect } from "react";
import Image from "next/image";
import BuildingDisplay from "./buildings/components/building";
import AuthGuard from "./auth/components/authGuard";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { fetchCityImage, fetchBuildings } from "./store/reducers/rootPageSlice";


export default function Home() {
    const dispatch = useAppDispatch();

    const { cityImgUrl, buildings } = useAppSelector((s) => s.rootPage);
  
    useEffect(() => {
      dispatch(fetchCityImage());
      dispatch(fetchBuildings());
    }, [dispatch]);
  return (
    <>
          <section className="relative w-full min-h-[1024px]">
            {cityImgUrl && (
              <Image
                src={cityImgUrl.url}
                alt="hero background"
                fill
                priority
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-[#0f1a2b]/70" />
            <div className="relative mx-auto flex h-[1024px] max-w-[1440px] items-center justify-center">
              <div className="flex h-[270px] w-[1085px] flex-col items-center justify-between gap-[10px] text-center px-4">
                <div className="flex flex-col items-center gap-[10px]">
                  <h1 className="w-full font-[Merriweather] text-[64px] font-bold leading-[80px] text-white">
                    The chemical negatively charged
                  </h1>
                  <p className="max-w-[822px] font-[Lato] text-[24px] leading-[32px] tracking-[-0.02em] text-white">
                    Numerous calculations predict, and experiments confirm, that the
                    force field reflects the beam, while the mass defect is not
                    formed. The chemical compound is negatively charged. Twhile the
                    mass defect is
                  </p>
                </div>
                <button className="flex h-[54px] w-[160px] items-center justify-center rounded-[8px] border border-white px-[24px] py-[10px] font-[Merriweather] text-[20px] font-bold leading-[34px] text-white transition hover:bg-white hover:text-[#172234]">
                  Get Started
                </button>
              </div>
            </div>
          </section>
          <AuthGuard>
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
          </AuthGuard>
    </>
  );
}
