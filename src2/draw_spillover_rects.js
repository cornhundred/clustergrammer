// const vectorizeText = require('vectorize-text')

module.exports = function draw_spillover_rects(regl, zoom_function){
  console.log('draw spillover_rects')

  // // max ~200 min ~20
  // var font_detail = 200;
  // var text_vect = vectorizeText('Spillover', {
  //   textAlign: 'center',
  //   textBaseline: 'middle',
  //   triangles:true,
  //   size:font_detail,
  //   font:'"Open Sans", verdana, arial, sans-serif'
  // });

  var args = {
    // In a draw call, we can pass the shader source code to regl
    frag: `
    precision mediump float;
    uniform vec4 color;
    void main () {
      gl_FragColor = color;
    }`,

    vert: `
    precision mediump float;
    attribute vec2 position;
    void main () {
      gl_Position = vec4(position, 0, 1);
    }`,

    attributes: {

    },

    uniforms: {
      color: [1, 0, 0, 1]
    },

    count: 3
  }

  args.attributes.position = [
        [-1, 1],
        [-0.5, -1],
        [-1, -1]
      ]

  draw_function = regl(args)


  return draw_function;

};