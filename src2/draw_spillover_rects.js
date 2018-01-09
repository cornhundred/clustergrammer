// const vectorizeText = require('vectorize-text')

module.exports = function draw_spillover_rects(regl, zoom_function){
  console.log('draw spillover_rects')

  // Spillover triangles
  ///////////////////////////////

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
      position: regl.prop('pos')
    },

    uniforms: {
      color: [1, 0, 0, 1],
      // offset: regl.prop('pos')
    },

    count: 3,
  }

  // args.attributes.position = [[-1, 1], [-0.5, -1], [-1, -1]];

  // // instancing example
  // //////////////////////////////
  // var N = 10 // N triangles on the width, N triangles on the height.

  // offset_array = Array(N * N).fill().map((_, i) => {
  //           var x = Math.floor(i / N) / N - 0.5 + 0.1;
  //           var y = 0;
  //           return [x, y]
  //         })

  // pos_array = Array(N * N).fill().map((_, i) => {
  //           var v1 = [ 0.00, -0.05];
  //           var v2 = [-0.05,  0.0];
  //           var v3 = [ 0.05,  0.05];
  //           return [v1, v2, v3]
  //         })

  // args = {
  //   vert: `
  //   precision mediump float;
  //   attribute vec2 position;
  //   attribute vec2 pos_buffer;

  //   // These three are instanced attributes.
  //   attribute vec3 color;
  //   attribute vec2 offset_buffer;


  //   void main() {
  //     gl_Position = vec4(
  //          position.x + offset_buffer.x + offset_buffer.x,
  //         -position.y + offset_buffer.y,
  //          0, 1);
  //   }`,

  //   frag: `
  //   precision mediump float;

  //   void main() {
  //     gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  //   }`,

  //   attributes: {
  //     position: [[0.0, -0.05], [-0.05, 0.0], [0.05, 0.05]],

  //     offset_buffer: {
  //       buffer: regl.buffer(offset_array),
  //       divisor: 1 // one separate offset for every triangle.
  //     },

  //     pos_buffer: {
  //       buffer: regl.buffer(pos_array),
  //       divisor: 1
  //     }

  //   },

  //   depth: {
  //     enable: false
  //   },

  //   // Every triangle is just three vertices.
  //   // However, each triangle is drawn N * N times,
  //   // through instancing?
  //   count: 3,
  //   instances: N * N
  // }


  draw_function = regl(args)

  return draw_function;

};