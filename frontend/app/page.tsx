import getBuildings from "./common/util/get-Buildings";
import getMe from "./common/util/get-me";
import Unauthenticated from "./components/unlogged-root";
import Authenticated from "./components/logged-root";

export interface Building {
    id: number;
    title: string;
    price: number;
    tiket: number;
    yield: number;
    sold: number;
    daysLeft: number;
    imageURL: string;
}

export default function Home() {
  return (
    <>
      <Unauthenticated/>
      <Authenticated/>
    </>
  );
}
