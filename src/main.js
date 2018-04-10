/*

  Version 0.1.4

 */

// var filename = 'data/mult_view.json';

// const
var run_viz = require('./run_viz');

// global variables
// d3 = require('d3');

function Clustergrammer2(args){

  console.log('################################')
  console.log('version 0.1.5')
  console.log('################################')

  var network = args.network;
  var container = args.container;

  run_viz(container, network);

}

// necessary for exporting function
module.exports = Clustergrammer2;