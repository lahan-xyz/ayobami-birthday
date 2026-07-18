import { Component } from 'valen';
import Text from '../widgets/Text.js';

const primaryMessages = [
  "Guess what day it is...",
  "A day of joy, laughter, and lots of cake!",
  "And now for the big reveal..."
];

const secondaryMessages = [
  "Someone special is celebrating their birthday!",
  "But I still expect a slice of cake though..."
];

const data = {
  primaryLine: {
    msg: "",
    size: 1,
    y: 0,
    opacity: 1
  },
  secondaryLine: {
    msg: "",
    size: 0.5,
    y: 45,
    opacity: 0
  }
};

function SlidingText() {
  let animateText, start;
  let charIndex = 0,
    isPrimaryActive = true,
    indices = { primary: 0, secondary: 0 },
    click;
  
  return {
    state: data,
    template() {
      return `
        <div id="st-container">
          <Text {
            txt: "[primaryLine.msg]",
            size: "[primaryLine.size]",
            y: "[primaryLine.y]",
            opacity: "[primaryLine.opacity]",
            withCursor: true
          } />
          
          <Text {
            txt: "[secondaryLine.msg]",
            size: "[secondaryLine.size]",
            y: "[secondaryLine.y]",
            opacity: "[secondaryLine.opacity]",
            withCursor: true
          } />
        </div>
      `;
    },
    
    created(state) {
      const typeText = () => {
        const messages = isPrimaryActive ? primaryMessages : secondaryMessages;
        const index = isPrimaryActive ? indices.primary : indices.secondary;
        const text = messages[index];
        const entryKey = isPrimaryActive ? "primaryLine" : "secondaryLine";
        const isEnd = charIndex === text.length + 1;
        
        if (isEnd) {
          charIndex = 0;
          if (isPrimaryActive) {
            indices.primary++;
          } else {
            indices.secondary++;
          }
          isPrimaryActive = !isPrimaryActive;
          setTimeout(animateText, 1000);
          return;
        }
        
        setTimeout(() => {
          state[entryKey].msg = text.slice(0, charIndex);
          charIndex++;
          typeText();
        }, 60);
      };
      
      animateText = function() {
        const currentKey = isPrimaryActive ? "primaryLine" : "secondaryLine";
        const backgroundKey = isPrimaryActive ? "secondaryLine" : "primaryLine";
        const isFinished = indices.primary === primaryMessages.length;
        
        if (!isFinished) {
          state[currentKey].size = 1;
          state[currentKey].y = 0;
          state[currentKey].opacity = 1;
          
          state[backgroundKey].size = 0.5;
          state[backgroundKey].y = -45;
          state[backgroundKey].opacity = 0;
          
          setTimeout(() => {
            state[backgroundKey].y = 45;
          }, 550);
          
          typeText();
        } else {
          setTimeout(() => {
            state[backgroundKey].size = 0.5;
            state[backgroundKey].y = -55;
            state[backgroundKey].opacity = 0;
          }, 550)
        }
      };
    },
    
    run() {
      setTimeout(animateText, 1000);
    },
    
    stylesheet: {
      "#st-container": `
        z-index: 1;
        position: relative;
        height: auto;
        width: 100vw;
      `
    }
  };
}

export default Component(SlidingText);