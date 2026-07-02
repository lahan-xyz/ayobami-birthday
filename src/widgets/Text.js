import { Widget } from 'valen';

function Text() {
  return {
    template(props) {
      // 1. We combine both translateY and scale into a single transform attribute.
      // 2. We calculate the scale by dividing the incoming size by the base size (20).
      const withCursor = props.withCursor
      return (`
        <span
          ${props.noAnim ? '' : 'class="anim"'}
          font-size="[ sz || 20 ]px"
          ${props.noAnim ? '' : `color="[ color || 'gold' ]"`}
          text-align="[ align || 'center' ]"
          transform="translateY([ y || 0 ]px) scale([ size || 1 ])"
          opacity="[ opacity || 1 ]"
        >[ txt ]${ withCursor ? '<span class="cursor"></span>' : '' }</span>
    `)
    },
    stylesheet: {
      'span:not(.cursor)': `
        font-weight: 600;
        display: block;
        transform-origin: center top; 
        transition: transform 0.7s ease, opacity 0.7s ease;
        will-change: transform, opacity;
      `,
      '.anim': `
        position: absolute;   /* Takes the text out of normal flow */
        width: 90%;          /* Forces it to span the container */
        left: 5%;              
        top: 0;               /* Anchors spans to the exact same starting line */
  `,
  '.cursor': `
    width: 6px;
    height: 35px;
    display: inline-block;
    background: #524D41;
    transform: translate(7px, 10px);
    animation: blink .0s linear infinite;
    animation-duration: .35s;
  `,
      "@keyframes blink": `
        0% { opacity: 0; }
        100% { opacity: 1; }
  `
    }
  }
}

export default Widget(Text);