"use client";

import { useSelector } from "react-redux";
import Image from "next/image";
import { RootState } from "../store/store";
import { Building } from "../page";
import getImage from "../common/util/get-image";
import { useState, useEffect } from "react";

export default function Unauthenticated() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const [imgUrl, setImgUrl] = useState<{ url: string; } | null>(null);
    useEffect(()=>{
        const getImgSrc = async () => {
            const url = await getImage('root_unauth.png');
            setImgUrl(url);
        };
        getImgSrc();
    },[]);
  if (isAuthenticated) return null;

  return (
    <div>
        {imgUrl!==null && (<Image src={imgUrl.url} width={500} height = {800} alt='image not found'/>)}
        <h1>The chemical  negatively charged</h1>
        <p>
        Numerous calculations predict, and experiments confirm, that the force field reflects the beam, while the mass defect is not formed. The chemical compound is negatively charged. Twhile the mass defect is 
        </p>
        <button>Get Started</button>
    </div>
  );
}
