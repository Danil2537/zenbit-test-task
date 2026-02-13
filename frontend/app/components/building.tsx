"use client";
import { useState, useEffect } from "react";
import getImage from "../common/util/get-image";
import { Building } from "../page";
import Image from "next/image";

export default function BuildingDisplay({building}:{building: Building}) {
     const [imgUrl, setImgUrl] = useState<{ url: string; } | null>(null);
        useEffect(()=>{
            const getImgSrc = async () => {
                const url = await getImage(building.imageURL);
                setImgUrl(url);
            };
            getImgSrc();
        },[building.imageURL]);
    return (
        <div>
              <h3>{building.title}</h3>
              <span>Price: {building.price} Dhs</span>
              <span>Yield: {building.yield}%</span>
              <span>Sold: {building.sold}%</span>
              <span>Tiket: {building.tiket} Dhs</span>
              <span>Days Left: {building.daysLeft}</span>
              {imgUrl!==null && (<Image
                src={imgUrl.url}
                width={100}
                height={250}
                alt="image not found"
              />)}
            </div>
    );
}