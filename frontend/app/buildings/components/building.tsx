'use client';

import { useState, useEffect } from 'react';
import getImage from '../../shared/api/get-image';
import Image from 'next/image';
import { Building } from '../types/building';

export default function BuildingDisplay({ building }: { building: Building }) {
  const [imgUrl, setImgUrl] = useState<{ url: string } | null>(null);

  useEffect(() => {
    const getImgSrc = async () => {
      const url = await getImage(building.imageURL);
      setImgUrl(url);
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getImgSrc();
  }, [building.imageURL]);

  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-[5px] shadow-[0_4px_4px_rgba(0,0,0,0.15)]">
      {imgUrl && (
        <Image
          src={imgUrl.url}
          alt={building.title}
          fill
          className="object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full rounded-b-[5px] bg-black/50 px-4 py-3 text-white">
        <h3 className="font-[Merriweather] text-[20px] font-bold leading-[34px]">
          {building.title}
        </h3>
        <div className="mt-1 flex flex-wrap items-center gap-6 font-[Lato] text-[18px] font-bold leading-[22px]">
          <span>{building.price} Dhs</span>
          <span>Yield {building.yield}%</span>
          <span>Sold {building.sold}%</span>
        </div>
        <div className="mt-1 flex items-center gap-10 font-[Lato] text-[18px] font-bold leading-[22px]">
          <span>Ticket {building.tiket} Dhs</span>
          <span>Days left {building.daysLeft}</span>
        </div>
      </div>
    </div>
  );
}
