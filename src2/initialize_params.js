var row_label_text = require('./row_label_text');

module.exports = function initialize_params(){

  console.log('** initialize_params')
  var params = {}


  // calculate the text_triangles for all rows
  params.text_triangles = row_label_text(network.row_nodes);

  return params;

};