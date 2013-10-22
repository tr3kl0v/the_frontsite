var Frontside = {
	version: 0.6,

	models: {},
	views: {},

	callDialog: function(dialog){
		if(Frontside[dialog] === undefined){
			require(["static/js/modules/" + dialog], function(){
				var model = Frontside[dialog],
					view = Frontside[dialog + 'View'];
				
				model.id = dialog;
				model.show = true;
				view.setElement("#pop-ups");
				model.serverCheck();
			});
		} else {
			Frontside[dialog + 'View'].called();
		}
	},

	getModule: function(module, position){
		require(["static/js/modules/" + module], function(){
			var model = Frontside[module],
				view = Frontside[module + 'View'];

			model.id = module;
//			console.log (view);
			view.setElement(position);
			model.serverCheck();
		});
	},

	init: function(){
		var self = this,
			url = window.location.pathname.slice(window.location.pathname.indexOf('/'));
			
		require(["static/js/components", "static/data/config" + url], function(){
			for(var i=0; modules.length>i;i++){
				var module = modules[i];
				self.getModule(module.moduleName, module.position);
			}
		});
	}
};

Frontside.models.Module = Backbone.Model.extend({
	jsonFetch: function(){
		var self = this;
		if(window.sessionStorage){
			if(sessionStorage.getItem('language')){
				this.urlRoot = '/module/' + sessionStorage.getItem('language');
			} else {
				this.urlRoot = '/module/en';
			}
		} else {
			this.urlRoot = '/module/en';
		}
		
		self.fetch({
			success: function(model, res)  {
				Frontside[self.id + 'View'].render();
			}
		});
	},

	listenToNewMessages: function() {
		//First get current Messages
		var view = Frontside[this.id + 'View'];
		if(view.$el.find('.messageWrapper').length){
			view.messageEl = $(view.el).find('.messageWrapper');
		}
		if(this.get('message') !== undefined){
			if(view.messageEl){
				//Already rendered in the correct place
			} else {
				var modelMessage = this.get('message');
				modelMessage.model = this.id;
				var filteredList = _.filter(message.get('message'), function(messageItem){
					return messageItem.model != this.id;
				});
				filteredList.push(modelMessage);
				message.set('message', filteredList);
			}
		}

		//Then listen for new ones
		this.on('change:message', function(model){
			if(view.messageEl){
				view.renderMessage();
			} else {
				var modelMessage = model.get('message');
				modelMessage.model = model.id;
				var filteredList = _.filter(message.get('message'), function(messageItem){
					return messageItem.model != model.id;
				});
				filteredList.push(modelMessage);
				message.set('message', filteredList);
			}
		});
	},

	serverCheck: function(){
		var self = this;
		if($('html').hasClass('server')){
			Frontside.views[self.id + 'View'].load();
		} else {
			self.jsonFetch();
		}
	}
});

Frontside.views.ModuleView = Backbone.View.extend({
	load: function(){
		this.model.listenToNewMessages(this.model);
		try{
			this.init();
		} catch(err){
			//No Init Function guess no javascript functions here
		}
		try{
			this.model.init();
		} catch(err){
			//No Init Function guess no javascript functions here
		}
	},

	render: function(){
		var self = this;
		dust.render(self.model.id, self.model.attributes, function(err, out){
			self.$el.append(out);
			self.load();
		});
	},

	renderMessage: function(){
		var self = this;
		dust.render('message', this.model.attributes, function(err, out){
			if(self.messageEl){
				self.messageEl.html(out);
			} else {
				$('#messageWrapper').html(out);
			}
		});
	},

	rerender:function(){
		var self = this;
		dust.render(self.model.id, self.model.attributes, function(err, out){
			if(!err){
				self.$el.html(out);
			}
			else {
				console.log(err);
			}
		});
	},

	replaceRender:function(t, data, e){
		var self = this;
		dust.render(t, data, function(err, out){
			if(!err){
				$(e).replaceWith(out);
			} else {
				console.log(err);
			}
		});
	}
});


/*******************************
*********** Dialogs ************
********************************/
Frontside.models.Dialog = Frontside.models.Module.extend({});

Frontside.views.DialogView = Frontside.views.ModuleView.extend({
	events: {
		"click .closeButton": "closeWindow",
		"click .cancel": "closeWindow"
	},

	called: function(){
		$("#overlay, #pop-ups").fadeIn();
		$("#" + this.model.id).fadeIn();
        this.overlay();
	},

	closeWindow: function(){
        $("#overlay, #pop-ups").fadeOut();
        $("#overlay, #pop-ups").children().fadeOut();
    },

	load: function(){
		this.model.listenToNewMessages(this.model);
		try{
			this.init();
		} catch(err){
			//No Init Function guess no javascript functions here
		}
		try{
			this.model.init();
		} catch(err){
			//No Init Function guess no javascript functions here
		}

		if(this.model.show){
			this.called();
			this.model.show = false;
		}
	},

	overlay: function(){
		var self = this;
		$("#overlay").on('click',
			function(e){
				self.closeWindow();
			}
		);
	}
});


/*******************************
******* Forms in Dialog ********
********************************/
Frontside.models.FormDialog = Frontside.models.Dialog.extend({

});

Frontside.views.FormDialogView = Frontside.views.DialogView.extend({
	load: function(){
		this.model.listenToNewMessages(this.model);
		if(!Modernizr.input.required){
			$(self.el).find('form').h5Validate();
		}
		try{
			this.init();
		} catch(err){
			//No Init Function guess no javascript functions here
		}
		try{
			this.model.init();
		} catch(err){
			//No Init Function guess no javascript functions here
		}

		if(this.model.show){
			this.called();
			this.model.show = false;
		}
	}
});


/*******************************
************ Tables ************
********************************/
Frontside.models.Table = Frontside.models.Module.extend({
	checkSelected: function(){
		if(this.get('selectedList').length <= 0){
			var message = {'class': 'info', 'text': 'Please select at least 1 entry from the list.'};
			this.set('message', message);
			return true;
		} else {
			return false;
		}
	},

	deselectAllRows: function(){
		var toolbar = this.get('toolbar'),
			results = this.get('tableList').rows,
			selectedList = this.get('selectedList');
		
		for(var i =0; i < results.length; i++){
			results[i].checked = false;
		}
		selectedList.splice(0, selectedList.length);
		this.set('selectAll', false);
	},

	selectAllRows: function(){
		var toolbar = this.get('toolbar'),
			results = this.get('tableList').rows;

		var selectedList = this.get('selectedList');

		for(var i =0; i < results.length; i++){
			selectedList.push(results[i]);
			results[i].checked = true;
		}
		this.set('selectAll', true);
	},

	selectRow: function(val){
		var objectNumber = parseInt(val, 10),
			currentObject = this.get('tableList').rows[objectNumber];
		currentObject.checked = true;
		this.get('selectedList').push(currentObject);
		window[this.id + 'View'].rerender();
	},

	deselectRow: function(val){
		var objectNumber = parseInt(val, 10),
			currentObject = this.get('tableList').rows[objectNumber],
			selectedList = this.get('selectedList');
		currentObject.checked = false;
		var newList = _.filter(selectedList, function(obj, num){
			return obj.title != currentObject.title;
		});
		this.set('selectedList', newList);
		window[this.id + 'View'].rerender();
	},

	removeRow: function(){
		var self = this,
			selectedList = this.get('selectedList'),
			empty = this.checkSelected();
		if(!empty){
			$.ajax({
				url: self.get('deleteUrl'),
				contentType: 'application/json',
				data: JSON.stringify(selectedList),
				method:'DELETE',
				success: function(res){
					if(res.valid){
						var message = {'class': 'info', 'text': res.text};
						self.set('message',message);
						self.get('tableList').rows = res.tableList;
						selectedList.splice(0, selectedList.length);
						window[self.id + 'View'].rerender();
					}
				}
			});
		}
	}
});

Frontside.views.TableView = Frontside.views.ModuleView.extend({});

Frontside.smartFilters = {
	version: 0.1,

	barChart: function(object){
		var data = object.items,
			surface ="#"+object.id + " .filterList",
			surfaceWidth = $(surface).width(),
			surfaceHeight = data.length * 40,
			maxCount = _.max(data, function(item){ return item.count; }),
			pxPerResult = surfaceWidth / maxCount.count;

		$(surface).html('');

		var right_margin = 70;

		var x = d3.scale.linear()
			.domain([0, maxCount.count])
			.range([0, surfaceWidth - right_margin  ]),
			y = d3.scale.ordinal()
			.domain(d3.range(data.length))
			.rangeBands([0, surfaceHeight], 0.5);

		var vis = d3.select(surface)
			.append("svg:svg")
				.attr("width", surfaceWidth)
				.attr("height", surfaceHeight)
				.attr("class", "barChart");

		var bars = vis.selectAll("a")
				.data(data)
			.enter().append("a")
				.attr("class", "link")
				.attr("href", "#")
				.append("svg:g")
					.attr("class", "bar")
					.attr("transform", function(d, i) { 
							return "translate(0, " + y(i) + ")"; });

		bars.append("svg:rect")
			.attr("x", right_margin)
			.attr("width", function(d) {
					return (x(d.count));
					})
			.attr("height", y.rangeBand())
			.attr("fill", '#0660ad');

		//Labels
		var labels = vis.selectAll("g.bar")
			.append("svg:text")
				.attr("class", "label")
				.attr("x", 0)
				.attr("text-anchor", "left")
				.text(function(d) {
						return d.label;
						});
	 
		var bbox = labels.node().getBBox();
		vis.selectAll(".label")
			.attr("transform", function(d) {
					return "translate(0, " + (y.rangeBand()/2 + bbox.height/4) + ")";
					})
			.attr("font-size", "10");
	 
	 
		labels = vis.selectAll("g.bar")
			.append("svg:text")
			.attr("class", "value")
			.attr("x", function(d)
					{
					return right_margin + 10;
					})
			.attr("text-anchor", "left")
			.text(function(d)
			{
			return "" + d.count;
			});
	 
		bbox = labels.node().getBBox();
		vis.selectAll(".value")
			.attr("transform", function(d)
			{
				return "translate(0, " + (y.rangeBand()/2 + bbox.height/4) + ")";
			});
	},

	slider: function(object){
		var self = this,
			data = object.items,
			graphStartYear = _.min(data, function(item){ return item.label; }),
			graphEndYear = _.max(data, function(item){ return item.label; }),
			counts = [],
			selectedStartYear,
			selectedEndYear,
			hintText = $("#" + object.id + " #slider-range" ).closest('.filterList').siblings('.hintText');

		_.map(object.items, function(item, num){
			counts.push(item.count);
		});
		counts.reverse();

		if(object.selectedStartYear !== undefined){
			selectedStartYear = object.selectedStartYear;
		} else {
			selectedStartYear = graphStartYear.label;
		}
		if(object.selectedEndYear !== undefined){
			selectedEndYear = object.selectedEndYear;
		} else {
			selectedEndYear = graphEndYear.label;
		}

		$("#" + object.id + " #dynamicsparkline").sparkline(counts, {type: 'line',width: '100%',height: '86px',spotRadius: '0',lineColor: '#0055a4',fillColor: '#d6e0f3'});
		$("#" + object.id + " #slider-range" ).slider({
			range: true, 
			min: graphStartYear.label,
			max: graphEndYear.label,
			values: [ selectedStartYear, selectedEndYear ],
			slide: function( event, ui ) {
				if(ui.values[ 0 ] != graphStartYear.label || ui.values[ 1 ] != graphEndYear.label){
					hintText.removeClass('hidden');
					object.graphChanged = true;
				} else {
					hintText.addClass('hidden');
					object.graphChanged = false;
				}
				$("#" + object.id + "#amount" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
			},
			stop: function( event, ui ) {
				object.selectedStartYear = ui.values[ 0 ];
				object.selectedEndYear = ui.values[ 1 ];
				Frontside.filters.graphChange();
				Frontside.filters.set('yearRange', ui.values[ 0 ] + '+-+' + ui.values[ 1 ]);
			}
		});
		$("#" + object.id + " #amount" ).val( $("#" + object.id + " #slider-range" ).slider( "values", 0 ) + " - " + $( "#" + object.id + " #slider-range" ).slider( "values", 1 ) );
	}
};