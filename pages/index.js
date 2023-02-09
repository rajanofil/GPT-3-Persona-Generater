import Head from 'next/head';
import Image from 'next/image';
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
              <option value="lawyer">lawyer</option>
              <option value="Postal Worker">Postal Worker</option>
              <option value="Product Manager">Product manager</option>
              <option value="Architect">Architect</option>
              
            </select>
          </div>
          <div className="dropdown-container">
            <label htmlFor="select-age">Select Age:</label>
            <select id="select-age" onChange={onAgeSelected}>
              <option value="">Please choose age</option>
              <option value="below 18">below 18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
              <option value="24">24</option>
              <option value="25">25</option>
              <option value="26">26</option>
              <option value="27">27</option>
              <option value="28">28</option>
              <option value="29">29</option>
              <option value="30">30</option>
              <option value="above 30">above 30</option>
              
              
            </select>
          </div>
          <div className="prompt-buttons">
            <a
              className={isGenerating ? 'generate-button loading' : 'generate-button'}
                onClick={callGenerateEndpoint}
            >
              <div className="generate">
              {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
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