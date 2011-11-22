var id = 'ui/Dropdown',
	Abstract = require( 'ui/Abstract' ),
	Callout;

Dropdown = Abstract.extend( function ( element, settings ){
	var Dropdown = this,
		defaults = {};

	settings = _.extend( defaults, settings );

	element.data( id, this );

} );

// EXPORT TO ATHENA FRAMEWORK
Athena.exports(module, Dropdown);