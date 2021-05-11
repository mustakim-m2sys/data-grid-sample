(function($) {
	$.fn.easymenu = function(options) {
		var default_options = {
			'hover_class' : 'hover',
			'main_item_class' : 'main-item',
			'sub_item_class' : 'sub-item',
			'separator_class' : 'separator',
			'has_child_class' : 'has-child'
		};
		options = $.extend(default_options, options);

		this.each(function(i, item) {
			$(item).children('li').addClass(options.main_item_class).find('li').addClass(options.sub_item_class);
			
			$(item)
			.find('li').each(function(j, li) {
				if ($(li).html() == '') $(li).removeClass().addClass(options.separator_class);
				if ($(li).children('ul').length > 0) $(li).addClass(options.has_child_class);
			})

			.hover(function() {
				if (!$(this).hasClass(options.separator_class)) $(this).addClass(options.hover_class);

				if ($(this).hasClass(options.has_child_class)) {
					var submenu = $(this).children('ul');
					var is_first_submenu = $(this).hasClass(options.main_item_class);
					var p_pos = $(this).position();
					var p_w = parseInt($(this).outerWidth());
					var p_h = parseInt($(this).outerHeight());
					var w = parseInt(submenu.outerWidth());
					var h = parseInt(submenu.outerHeight());

					var css = {};
					var p_offset = $(this).offset();
					if (is_first_submenu) {
						css.left = parseInt(p_pos.left);
						css.top = parseInt(p_pos.top) + p_h;
						if ((p_offset.left + w) > $(document).width()) css.left = css.left - w + p_w + 1;
					} else {
						css.left = parseInt(p_pos.left) + p_w - 1;
						css.top = parseInt(p_pos.top);
						if ((p_offset.left + p_w + w) > $(document).width()) css.left = css.left - w - p_w + 1;
					}

					submenu.css(css).show();
					// animate submenu to margin top 0
					submenu.animate({'margin-top': '0'}, 300);
				}
			}, function() {
				if (!$(this).hasClass(options.separator_class)) $(this).removeClass(options.hover_class);

				if ($(this).hasClass(options.has_child_class)) {
					var submenu = $(this).children('ul');
					submenu.hide();
					// animate submenu to margin top 10
					submenu.animate({'margin-top': '10px'}, 300);
				}
			});
		});
	}
})(jQuery);