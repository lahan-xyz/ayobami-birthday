import { Widget } from 'valen';

function Button() {
  return {
    template() {
      return (`
        <button
          class=[ class ]
          @click=[ click ]
        >[ label ]</button>
    `)
    },
    stylesheet: {
      'button': `
        width: 40%;
        padding: 15px 5px;
        border: none;
        border-radius: 40px;
        font-size: 1.2em;
        margin-inline: 3%;
      `,
      '.primary': `
        background: gold;
      `,
      '.secondary': `
        background: silver;
      `
    }
  }
}

export default Widget(Button);