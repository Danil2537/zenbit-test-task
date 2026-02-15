"use client";

import { useSelector } from "react-redux";
import Image from "next/image";
import { RootState } from "../store/store";
import getImage from "../common/util/get-image";
import { useState, useEffect } from "react";

export default function Unauthenticated() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const [imgUrl, setImgUrl] = useState<{ url: string } | null>(null);

  useEffect(() => {
    const getImgSrc = async () => {
      const url = await getImage("root_unauth.png");
      setImgUrl(url);
    };
    getImgSrc();
  }, []);

//   if (isAuthenticated) return null;

  return (
    <section className="relative w-full min-h-[1024px]">
      {imgUrl && (
        <Image
          src={imgUrl.url}
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
  );
}
