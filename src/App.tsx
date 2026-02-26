import { ReactFlowProvider } from "@xyflow/react";
import "./App.css";
import FlowBuilder from "./components/FlowBuilder";

function App() {
  return (
    <>
      <ReactFlowProvider>
        <FlowBuilder />
      </ReactFlowProvider>
    </>
  );
}

export default App;
