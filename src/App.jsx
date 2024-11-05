import React, { useState, useEffect } from "react";
import './App.css';

const App = () => {
  const [showBubble, setShowBubble] = useState(true);
  const [lastSectionBlasted, setLastSectionBlasted] = useState(false);
  const [bubbleSize, setBubbleSize] = useState(300);
  const [burstEffect, setBurstEffect] = useState(false);

  const handleScroll = () => {
    const lastSection = document.querySelector(".section:last-child");
    const { top } = lastSection.getBoundingClientRect();

    if (top < window.innerHeight && !lastSectionBlasted) {
      setShowBubble(true); 
      setLastSectionBlasted(true);
    } else if (lastSectionBlasted && top >= window.innerHeight) {
      setShowBubble(true);
      setLastSectionBlasted(false);
    }

    const newSize = Math.min(window.innerHeight, 300 + window.scrollY / 10); 
    setBubbleSize(newSize);
  };

  const handleBubbleClick = () => {
    triggerBurstEffect();
  };

  const handleBubbleHover = () => {
    triggerBurstEffect();
  };

  const triggerBurstEffect = () => {
    setBurstEffect(true);
    setTimeout(() => setBurstEffect(false), 600);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastSectionBlasted]);

  return (
    <div className="App">
      <h1 className="header">Welcome to the Bubble Effect Demo! 
        <br />
        - By Vaibhav Shinde</h1> {/* Added Header */}
      <div className="bubble-container">
        {showBubble && (
          <div
            className={`bubble ${lastSectionBlasted || burstEffect ? 'burst' : ''}`}
            style={{ width: bubbleSize, height: bubbleSize }} 
            onClick={handleBubbleClick}
            onMouseEnter={handleBubbleHover}
            onMouseLeave={() => setBurstEffect(false)} 
          />
        )}
        {lastSectionBlasted && (
          <div className="blast-text">End of the Page.....!</div>
        )}
      </div>
        
      <div className="content">
        <div className="section sky-blue"></div>
        <div className="section light-green"></div>
        <div className="section coral"></div>
        <div className="section lavender"></div>
        <div className="section peach"></div>
        <div className="section light-yellow"></div>
        <div className="section lightpink"></div>
        <div className="section beige"></div>
      </div>
    </div>
  );
};

export default App;
