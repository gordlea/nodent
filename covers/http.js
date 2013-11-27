
/**
 * Create an instance of noDent friendly http with the API:
 * 		res <<== nodent.http.get(opts) ;
 * 			... set up some stuff with res...
 * 		undefined <<= res.wait('end') ;
 */

module.exports = function(nodent) {
	nodent.require('events') ;
	var http = require('http') ;
	var cover = Object.create(http) ;

	cover.request = function(opts){
		return function($return,$error){
			var request = http.request(opts,function(){}) ;
			request.on('error',$error) ;
			$return(request) ;
		}
	};
	
	cover.get = function(opts){
		return function($return,$error){
			http.get(opts,$return).on('error',$error) ;
		}
	};
	return cover ;
};