import { App } from 'valen'
import Main from './components/Main.js'

const Birthday = new App('#app', {
  template: () => `
    <Main/>
    `,
  stylesheet: {
    "html": `
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    `,
    "*": `margin: 0; padding: 0; box-sizing: border-box; `,
    "body": `
      height: 100vh;
      background: linear-gradient(135deg, #12121A, #313131);
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: 'Segoe UI', sans-serif;
      overflow: hidden;
      cursor: pointer;`,
    "body, *": "font-family: 'Inter'",
    
    "@font-face": `
      font-family: 'Inter';
      font-style: normal;
      font-weight: normal;
      font-display: swap;
      src: url('/src/assets/Inter-Bold.otf');
   `
  },
});


Birthday.render();