'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import BuildingDisplay from './buildings/components/building';
import AuthGuard from './auth/components/authGuard';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { fetchCityImage, fetchBuildings } from './store/reducers/rootPageSlice';

export default function Home() {
  const dispatch = useAppDispatch();

  const { cityImgUrl, buildings } = useAppSelector((s) => s.rootPage);

  useEffect(() => {
    const runDispatch = async () => {
      await dispatch(fetchCityImage());
      await dispatch(fetchBuildings());
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    runDispatch();
  }, [dispatch]);
  return (
    <>
      <section className="relative w-full min-h-screen">
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
        <div className="relative mx-auto flex min-h-screen max-w-8xl items-center justify-center px-4">
          <div className="flex max-w-3xl flex-col items-center gap-4 text-center">
            <div className="flex flex-col items-center gap-[10px]">
              <h1 className="font-bold text-white text-3xl sm:text-4xl md:text-6xl">
                The chemical negatively charged
              </h1>
              <p className="text-white text-base sm:text-lg md:text-xl">
                Numerous calculations predict, and experiments confirm, that the
                force field reflects the beam, while the mass defect is not
                formed. The chemical compound is negatively charged. Twhile the
                mass defect is
              </p>
            </div>
            <button className="mt-4 rounded-lg border-2 border-white px-6 py-3 text-white hover:bg-white hover:text-[#172234] transition">
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
