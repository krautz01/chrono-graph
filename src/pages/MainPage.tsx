import React from "react";
import SearchInput from "../components/SearchInput";
/* import Scientist from "../components/Scientist";
import ScienceDiscovery from "../components/ScienceDiscovery"; */
import type { CSSProperties } from "react";
import GraphView from "../components/GraphView";

const style: CSSProperties = {
  width: "100%",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const testElements = {
  nodes: [
    {
      data: {
        id: "einstein",
        label: "Albert Einstein",
        discipline: "physics",
        variety: "scientist",
      },
    },
    {
      data: {
        id: "relativity",
        label: "Relativity",
        discipline: "physics",
        variety: "discovery",
      },
    },
    {
      data: {
        id: "newton",
        label: "Isaac Newton",
        discipline: "physics",
        variety: "scientist",
      },
    },
    {
      data: {
        id: "gravity",
        label: "Gravity",
        discipline: "physics",
        variety: "discovery",
      },
    },
    {
      data: {
        id: "radioactivity",
        label: "Radioactivity",
        discipline: "chemistry",
        variety: "discovery",
      },
    },
    {
      data: {
        id: "marie curie",
        label: "Marie Curie",
        discipline: "chemistry",
        variety: "scientist",
      },
    },
  ],
  edges: [
    { data: { source: "einstein", target: "relativity" } },
    { data: { source: "newton", target: "gravity" } },
    { data: { source: "newton", target: "einstein" } },
    { data: { source: "marie curie", target: "radioactivity" } },
  ],
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
        style={{
          width: "100%",
        }}
      >
        <SearchInput />
        {/*         <Scientist />
        <ScienceDiscovery /> */}
        <GraphView elements={testElements} />
      </main>
    </div>
  );
};

export default MainPage;
