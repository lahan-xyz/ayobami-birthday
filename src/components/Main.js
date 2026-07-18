import { Component } from 'valen';
import Text from '../widgets/Text.js';
import Button from '../widgets/Button.js'
import { Confetti, animateConfetti } from './Confetti.js'
import SlidingText from './SlidingText.js'


function Main() {
  let birthdaySong;
  return {
    state: {
      actionClass: "",
      hbdClass: ""
    },
    template() {
      return (`
        <SlidingText />
        
        <div class="hbd [hbdClass]" animation="[hbdClass] 1.5s alternate infinite">
          <Text {
            txt: "Happy Birthday Ayobami",
            sz: 43,
            noAnim: true
          } />
        </div>
        
        <Confetti />
        
        <div class="slider [actionClass]">
          <Text {
            txt: "Do you want to proceed?",
            size: 1.3,
            y: -80,
            withCursor: true
          } />
          <div class="btns">
            <Button {
              class: "primary",
              label: "Proceed",
              click: "this.animateConfetti()"
            } />
          
            <Button {
              class: "secondary",
              label: "Close",
              click: "this.alt()"
            } />
          </div>
        </div>
    `)
    },
    
    created(state) {
      birthdaySong = new Audio("./src/assets/hbd_song.mp3")
      
      birthdaySong.loop = true
      
      this.animateConfetti = () => {
        state.actionClass = 'out'
        state.hbdClass = 'bounce'
        animateConfetti()
        birthdaySong.play()
      }
      
      this.alt = () => {
        state.actionClass = 'out',
          alert("Thought you could escape?")
        state.hbdClass = 'bounce'
        animateConfetti()
        birthdaySong.play()
      }
      
    },
    
    run(state) {
      setTimeout(() => state.actionClass = 'showBtns', 18900)
    },
    
    stylesheet: {
      '.hbd': `
        width: 100vw;
        height: auto;
        padding-inline: 5%;
        transform: translateY(-5vh) scale(0);
        transition: .3s;
      `,
      
      '@keyframes bounce': `
        0% { transform: translateY(0vh); }
        100% { transform: translateY(-5vh); }
    `,
      
      '.hbd span': `
        background-image: linear-gradient(90deg, #ffcc00, #FFBC25, #AE830D);
        background-size: 300% 100%;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        animation: shimmer 3s linear infinite;
      `,
      '@keyframes shimmer': `
      0% { background-position: 0% 50%; }
      100% { background-position: 300% 50%; }
    `,
      
      '.bounce': `
        transform: scale(1);
      `,
      '.slider': `
        width: auto;
        height: auto;
        text-align: center;
        transform: translateY(50vh);
        transition: 1.3s;
        opacity: 0;
      `,
      '.btns': `
       width: 100vw;
       height: auto;
       display: flex;
       justify-content: center;
      `,
      '.showBtns': `
        transform: translateY(-10vh) scale(1);
        opacity: 1;
      `,
      '.out': `
        transform: translateY(50vh) scale(.5);
        opacity: 0;
      `
    }
  }
}

export default Component(Main);