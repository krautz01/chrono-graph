import React from "react";
import SearchInput from "../components/SearchInput";
/* import Scientist from "../components/Scientist";
import ScienceDiscovery from "../components/ScienceDiscovery"; */
import type { CSSProperties } from "react";
import GraphView from "../components/GraphView";
import { mockData } from "../data/mockData";

const style: CSSProperties = {
  width: "100%",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-around",
  

};

const MainPage: React.FC = () => {
  return (
    <div style={style}>
      <header>
        <h1 style={{ textAlign: "center" }}>Science Discovery Graph</h1>
        <p style={{ textAlign: "center" }}>
          Explore the connections between scientists and their discoveries.
        </p>
      </header>
      <main
        style={style}
      >
        <SearchInput />
        {/*         <Scientist />
        <ScienceDiscovery /> */}
        <GraphView elements={mockData} />
      </main>
    </div>
  );
};

export default MainPage;
