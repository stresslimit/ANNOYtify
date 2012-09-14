	// ANNOYtify

(function( $ ){

	// var parentBottom = 0;
	var options, methods = {
		init:function(settings){
			options = $.extend({
				// lower: 'footer',	// our default
				// container: $('#notify'),	==> this
				parent: 'body',
				toggle: '#notify-tab .toggle',
				bubble: '#notify-bubble',
				steps: '#notify-steps li',
				stepWidth: '48px',												// default step width
				stepExpanded: '370px',
				minimized: false

			}, settings || {});

			// parentBottom = $(opt.parent).offset().top + this.parent.height() + 110;		// +110 because we just added this much padding
			if ( $(this).length < 1 || $(options.parent).length < 1 ) return;			// check that we get our elements

			return this.each(function(){

				$(parent).css({ 'padding-bottom': '110px', 'overflow': 'hidden' }); 		// make some room for this to dock; overflow is needed when showing / hiding the mission bar

				// $(window).bind('scroll', $.proxy(methods.viewportScrolled, this));		// only if annoytify is within another parent div (ie. not body)
				$(options.toggle).bind('click', $.proxy(methods.toggleShow, this));
        		$(options.steps).bind('click', $.proxy(methods.viewStep, this ));

			});
		},
		viewportScrolled:function(){
        	if (parentBottom < ($(window).scrollTop() + $(window).height())) { $(this).removeClass('floating'); }
        	else { $(this).addClass('floating'); }
		},
	    toggleShow: function() {
	        var active = $(options.steps).filter('.active');
	        if (active.hasClass('current')) methods.toggleBubble(options.minimized);
	        $(this).animate({ 'margin-bottom': (options.minimized) ? '16px' : '-109px' }, function() {
	            $(options.toggle).css('backgroundPosition', (options.minimized) ? '0 -12px' : '0 0');
	        });
	        options.minimized = !options.minimized;
	    },
	    viewStep: function(evt) {
			var step = evt.currentTarget;
		
	        if ($(step).hasClass('active')) return;
	        methods.toggleBubble( $(step).hasClass('current') );
	        $(options.steps).animate({ 'width': options.stepWidth }).removeClass('active');
	        $(step).animate({ 'width': options.stepExpanded }).addClass('active');
	    },
	    toggleBubble: function(show) {
	        if (show) {
	            $(options.bubble)
					.animate({ 'top': '-96px' }, function () { $(this).css('z-index', 9999) })
					.animate({ 'top': '-85px' }, 250).addClass('showing');
	        } else {
	            if ( $(options.bubble).hasClass('showing')) {
	                $(options.bubble)
						.animate({ 'top': '-96px' }, 250, function () { $(this).css('z-index', 9996) })
						.animate({ 'top': '1px' }).removeClass('showing');
	            }
	        }
	    },
		// destroy:function(){
		// 	this.lower.animate({'margin-top':'-3px'},1000);
		// 	this.element.slideUp('slow',function(){
		// 		$(window).unbind('scroll');
		// 		$(this).remove();
		// 	});
		// }
	}

	$.fn.annoytify = function(method){
		if ( method && methods[method] ) {
			return methods[ method ].apply( this, [].slice.call( arguments, 1 ));
		}
		else if ( typeof method === 'object' || ! method ) { 
			return methods.init.apply( this, [].slice.call( arguments, 0 ) );
		};
		$.error( 'Method ' +  method + ' does not exist on ANNOYTIFY' );
		return this;
	}

})(jQuery);

