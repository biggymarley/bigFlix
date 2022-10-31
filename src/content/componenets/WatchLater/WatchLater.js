import React from "react";
import { useCookies } from "react-cookie";
export default function WatchLater() {
  const [cookies] = useCookies(["watch-later"]);
  console.log(cookies);

  return <div>WatchLater</div>;
}
