define([
	'frontside'
], function (Frontside) {
	DateLimiter = Frontside.models.Module.extend({

	});

	DateLimiterView = Frontside.views.ModuleView.extend({
		init: function(){
			
		},

		events: {
			'click #years_all':'allYears'
		},

		allYears: function(e){
			var data = this.model.get('data');
			if($(e.currentTarget).is(':checked')){
				data.checkbox.checked = true;
				data.endYear.dropdown.status = 'disabled';
				data.startYear.dropdown.status = 'disabled';
				this.$el.find('select').addClass('disabled');
			} else{
				data.checkbox.checked = false;
				delete data.endYear.dropdown.status;
				delete data.startYear.dropdown.status;
				this.$el.find('select').removeClass('disabled');
			}
		},


		yearChange: function(){
			var self = this;
			$(this.el).on('change', "select",
				function(e){
					self.model.set(this.id, this.value);
					var start = self.model.get('startYear'),
						end = self.model.get('endYear');
					if(start > end){
						self.model.set({'startYear': this.value, 'endYear': this.value});
					}
				}
			);
			self.model.on('change', function(model, attrs){
				self.$el.find('#startYear').val(self.model.get('startYear'));
				self.$el.find('#endYear').val(self.model.get('endYear'));
			});
		}
	});

});