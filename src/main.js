/*

  Version 0.1.2

 */

// var filename = 'data/mult_view.json';

// const
var run_viz = require('./run_viz');

// global variables
// d3 = require('d3');

function Clustergrammer2(args){

  var network = args.network;
  var container = args.container;

  run_viz(container, network);

}

// necessary for exporting function
module.exports = Clustergrammer2;