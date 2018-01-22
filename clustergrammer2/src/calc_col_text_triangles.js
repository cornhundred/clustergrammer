const vectorizeText = require('vectorize-text');

module.exports = function calc_col_text_triangles(params){

  var inst_nodes = params.network.col_nodes;
  var num_col = params.num_col;

  var col_height = 1/num_col;
  var y_offset_array = [];
  for (var i = 0; i < num_col; i++){
    y_offset_array[i] = 0.5 - col_height/2 - i * col_height;
  }

  var vect_text_attrs = {
    textAlign: 'left',
    textBaseline: 'middle',
    triangles: true,
    size: params.font_detail,
    font: '"Open Sans", verdana, arial, sans-serif'
  };

  // draw matrix cells
  /////////////////////////////////////////
  // set up offset array for buffer
  var offset = {};
  offset.x = 0.5;
  offset.y = 0.5;

  var y_arr = Array(num_col).fill()
    .map(function(_, i){
      // return -i/num_col + offset.y - 1/num_col;
      return -i/num_col + offset.y - 0.5/num_col;
    });

  // generating array with col text triangles and y-offsets
  var col_text_triangles = [];

  var inst_order = 'clust';

  _.each(inst_nodes, function(inst_node, col_id){

    var inst_name = inst_node.name.split(': ')[1];
    var tmp_text_vect = vectorizeText(inst_name, vect_text_attrs);
    var col_order_id = params.network.col_nodes[col_id][inst_order];

    var y = y_arr[ col_order_id ];
    tmp_text_vect.offset = [ 0, y];

    col_text_triangles.push(tmp_text_vect);

  });

  return col_text_triangles;

};