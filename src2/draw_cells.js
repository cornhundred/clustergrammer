// var blend_info = require('./blend_info');

module.exports = function(regl, network, mat_data){

  num_row = mat_data.length;
  num_col = mat_data[0].length;

  console.log('num_row: ' + String(num_row))
  console.log('num_col: ' + String(num_col))

  // Generate opacity array
  //////////////////////////
  opacity_arr = [].concat.apply([], mat_data)

  abs_max_val = _.max(opacity_arr, function(d){
    return Math.abs(d);
  })

  var zoom_function = function(context){
    return context.view;
  }

  opacity_scale = d3.scale.linear();

  opacity_domain = abs_max_val /1.5;
  opacity_range = 0.80;

  opacity_scale
    .domain([-opacity_domain, opacity_domain])
    .range([-opacity_range, opacity_range])
    .clamp(true);

  opacity_arr = opacity_arr.map(function(x) {
    return opacity_scale(x)
  });

  var blend_info = {
      enable: true,
      func: {
        srcRGB: 'src alpha',
        srcAlpha: 'src color',
        dstRGB: 'one',
        dstAlpha: 'one',
        // src: 'one',
        // dst: 'one'
      },
      equation: 'add',
      color: [0, 0, 0, 0]
    };

  // draw matrix cells
  /////////////////////////////////////////
  // set up offset array for buffer
  var offset = {};
  offset.x = 0.5;
  offset.y = 0.5;

  // generate x position array
  x_arr = Array(num_col).fill()
    .map(function(_, i){
      return i/num_col - offset.x
    });

  y_arr = Array(num_row).fill()
    .map(function(_, i){
      return -i/num_row + offset.y - 1/num_row
    });

  // pass along row and col node information
  row_nodes = network.row_nodes;
  col_nodes = network.col_nodes;

  // generate x and y positions
  ////////////////////////////////
  function position_function(_, i){

    // looking up x and y position
    var col_id = i % num_col;
    var row_id = Math.floor(i / num_col);

    row_order_id = num_row - 1 - row_nodes[row_id].clust;
    col_order_id = num_col - 1 - col_nodes[col_id].clust;

    var x = x_arr[ col_order_id ];
    var y = y_arr[ row_order_id ];

    return [x, y];
  };

  position_arr = Array(num_row * num_col)
            .fill()
            .map(position_function);

  // // Filter for visible vertices only
  // ///////////////////////////////////
  // pixel_to_webgl = d3.scale.linear()

  // pixel_to_webgl
  //   .domain([0, 500])
  //   .range([-0.5, 0.5])
  //   .clamp(true);

  // for (i = 0; i < position_arr.length; i ++){
  //   inst_pos = position_arr[i]
  //   // console.log(inst_pos)
  // }

  // Generate Buffers
  ///////////////////////////
  console.log('generate buffers')
  num_instances = position_arr.length;
  // try slicing arrays
  position_arr = position_arr.slice(0, num_instances);
  opacity_arr = opacity_arr.slice(0, num_instances);

  position_buffer = regl.buffer(position_arr);

  const opacity_buffer = regl.buffer({
    // length: opacity_arr.length,
    type: 'float',
    usage: 'dynamic'
  });

  opacity_buffer(opacity_arr);

  // bottom half
  var bottom_half = [
    [1/num_col, 0.0],
    [0.0,       0.0],
    [0.0,       1/num_row]
  ];

  // top half
  var top_half = [
    [1/num_col, 0.0 ],
    [1/num_col, 1/num_row],
    [0.0,       1/num_row]
    ];

  var vert_string = `
    precision highp float;

    attribute vec2 position;

    // These three are instanced attributes.
    attribute vec2 pos_att;
    attribute float opacity_att;
    uniform mat4 zoom;

    // pass varying variables to fragment from vector
    varying float var_opacity;

    void main() {

      gl_Position = zoom *
                    vec4( position.x + pos_att.x,
                          position.y + pos_att.y,
                          0,
                          1
                        );

      // pass attribute (in vert) to varying in frag
      var_opacity = opacity_att;

    }`;

  var frag_string = `
    precision highp float;
    varying float var_opacity;
    uniform vec3 inst_color;
    varying vec3 tmp_color;
    void main() {

      // tmp_color = vec3(0, 0, 1);

      // manually tweaking opacity range, will improve to match old version

      if (var_opacity > 0.0){
        gl_FragColor = vec4(1, 0, 0, abs(var_opacity) + 0.15);
      } else {
        gl_FragColor = vec4(0, 0, 1, abs(var_opacity) + 0.15);
      }

    }`;

  regl_props = {
    vert: vert_string,
    frag: frag_string,
    attributes: {
      position: '',
      pos_att: {
        buffer: position_buffer,
        divisor: 1
      },
      opacity_att: {
        buffer: opacity_buffer,
        divisor: 1
        }
    },
    depth: {
      enable: false
    },
    blend: blend_info,
    count: 3,
    uniforms: {
      zoom: zoom_function,
      inst_color: [0,0,1],
    },
    instances: num_instances,
  };

  // draw top and bottom of matrix cells
  //////////////////////////////////////
  var draw_cells = {};

  bot_props = regl_props;
  bot_props.attributes.position = bottom_half;
  draw_cells.bot = regl(bot_props)

  top_props = regl_props;
  top_props.attributes.position = top_half;
  draw_cells.top = regl(top_props);

  return draw_cells;

};