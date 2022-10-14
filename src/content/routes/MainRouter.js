import { Box } from "@mui/system";
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Discover from "../componenets/Discover/Discover";
import NetHeader from "../componenets/Header/NetHeader";
import Home from "../componenets/Home/Home";
import SearchListScreen from "../componenets/ListScreen/SearchListScreen";

export default function MainRouter() {
  let location = useLocation();
  return (
    <Box>
      {location.pathname === "/" ? null : <NetHeader />}
      <Routes>
        <Route index element={<Home />} />
        <Route path="/browse" element={<SearchListScreen />} />
        <Route path="/browse/:query/*" element={<SearchListScreen />} />
        <Route path="/discover/*" element={<Discover />} />
      </Routes>
    </Box>
  );
}
