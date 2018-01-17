var row_label_text = require('./row_label_text');

module.exports = function initialize_params(mat_data){

  var zoom_function = function(context){
    return context.view;
  }

  console.log('** initialize_params')
  var params = {}

  var num_row = mat_data.length;
  var num_col = mat_data[0].length;


  // calculate the text_triangles for all rows
  params.text_triangles = row_label_text(network.row_nodes);

  params.draw_labels = {};
  params.draw_labels['row'] = require('./draw_mat_labels')(regl, num_row, 'row');
  params.draw_labels['col'] = require('./draw_mat_labels')(regl, num_col, 'col');

  params.draw_dendro = {};
  params.draw_dendro['row'] = require('./draw_dendro')(regl, num_row, 'row');
  params.draw_dendro['col'] = require('./draw_dendro')(regl, num_col, 'col');

  params.draw_text_triangles = require('./draw_text_triangles')
                                     (regl, zoom_function);

  var draw_spillover_rects = {};

  // inst_depth is passed to spillover rects
  draw_spillover_rects.mat = require('./draw_spillover_rects')
                                    (regl, zoom_function, 0.5);

  draw_spillover_rects.corners = require('./draw_spillover_rects')
                                        (regl, zoom_function, 0.4);


  params.draw_spillover_rects = draw_spillover_rects;



  return params;

};