import React, { useState } from 'react';
import TextInput from './components/TextInput';
import DiagramSelector from './components/DiagramSelector';
import DiagramRenderer from './components/DiagramRenderer';
import { Button } from './components/ui/button';
import D3Graph from './components/D3Graph'; // optional for advanced graphs



const sampleNodes = [
  { id: "A" },
  { id: "B" },
  { id: "C" },
];

const sampleLinks = [
  { source: "A", target: "B" },
  { source: "B", target: "C" },
];
export default function App() {
  const [inputText, setInputText] = useState('');
  const [diagramType, setDiagramType] = useState('Data Flow Diagram');
  const [diagramCode, setDiagramCode] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [convertedCode, setConvertedCode] = useState('');

  // Function to call Express API for AI analysis
  const analyzeCode = async () => {
    try {
      const response = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: inputText }),
      });
      const data = await response.json();
      setAnalysis(data.analysis);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Function to call Express API for Bytecode Conversion
  const convertBytecode = async () => {
    try {
      const response = await fetch('http://localhost:5000/convert_bytecode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bytecode: inputText }),
      });
      const data = await response.json();
      setConvertedCode(data.converted_code);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Function to generate a basic diagram (using Mermaid)
  const generateDiagram = () => {
    let generatedCode = '';
    if (diagramType === 'Data Flow Diagram') {
      generatedCode = `graph TD; Input-->Processing; Processing-->Output;`;
    } else if (diagramType === 'High-Level View') {
      generatedCode = `graph TD; User-->System; System-->Database;`;
    } else if (diagramType === 'Low-Level View') {
      generatedCode = `graph TD; CPU-->RAM; RAM-->Storage;`;
    }
    setDiagramCode(generatedCode);
  };

  // Example data for D3 Graph (optional)
  const sampleNodes = [{ id: 'A' }, { id: 'B' }, { id: 'C' }];
  const sampleLinks = [{ source: 'A', target: 'B' }, { source: 'B', target: 'C' }];

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Text to Diagram Converter</h1>
      <TextInput inputText={inputText} setInputText={setInputText} />
      <DiagramSelector diagramType={diagramType} setDiagramType={setDiagramType} />

      <div className="flex gap-4 mt-4">
        <Button onClick={generateDiagram}>Generate Diagram</Button>
        <Button onClick={analyzeCode}>AI Analysis</Button>
        <Button onClick={convertBytecode}>Convert Bytecode</Button>
      </div>

      {analysis && (
        <div className="mt-4 p-3 bg-gray-100">
          <h3>AI Analysis:</h3>
          <p>{analysis}</p>
        </div>
      )}
      {convertedCode && (
        <div className="mt-4 p-3 bg-gray-100">
          <h3>Converted Bytecode:</h3>
          <p>{convertedCode}</p>
        </div>
      )}

      <DiagramRenderer diagramCode={diagramCode} />

      {/* Optional: D3 Graph */}
      <h2 className="mt-8 text-xl font-bold">Advanced Visualization (D3)</h2>
      <D3Graph nodes={sampleNodes} links={sampleLinks} />
    </div>
  );
}