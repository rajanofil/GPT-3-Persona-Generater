import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import React, { useState } from 'react';


const Home = () => {
  const [selectedProfession, setSelectedProfession] = useState('');
  const [selectedAge, setSelectedAge] = useState('');
  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI...");
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({selectedProfession, selectedAge}),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text);

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  };

  const onProfessionSelected = (event) => {
    setSelectedProfession(event.target.value);
    console.log(event.target.value);
  };

  const onAgeSelected = (event) => {
    setSelectedAge(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Persona AI</h1>
          </div>
          <div className="header-subtitle">
            <h2>AI Generated User Personas in just once click!</h2>
          </div>
        </div>

        <div className="prompt-container">
          <div className="dropdown-container">
            <label htmlFor="select-profession">Select Profession:</label>
            <select id="select-profession" onChange={onProfessionSelected}>
              <option value="">Please choose a profession</option>
              <option value="Software Developer">Software Developer</option>
              <option value="UI/UX designer">UI/UX designer</option>
              <option value="Labour">Labour</option>
              <option value="carpenter">carpenter</option>
              <option value="lawye">lawyer</option>
              <option value="Postal Worker">Postal Worker</option>
              
            </select>
          </div>
          <div className="dropdown-container">
            <label htmlFor="select-age">Select Age:</label>
            <select id="select-age" onChange={onAgeSelected}>
              <option value="">Please choose an age</option>
              <option value="13">13</option>
              <option value="25-34">25-34</option>
              <option value="35+">35+</option>
            </select>
          </div>
        <div className="prompt-buttons">
          <a className="generate-button" onClick={callGenerateEndpoint}>
            <div className="generate">
              <p>Generate</p>
            </div>
          </a>
        </div>
        </div>
        {apiOutput && (
  <div className="output">
    <div className="output-header-container">
      <div className="output-header">
        <h3>Output</h3>
      </div>
    </div>
    <div className="output-content">
      <p>{apiOutput}</p>
    </div>
  </div>
)}
    </div>
      
      <div className="badge-container grow">
        <a
          href="hr"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            
            <p>Copyright © {new Date().getFullYear()} persona.ai</p>

          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;