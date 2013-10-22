define([
	'frontside'
], function (Frontside) {
	DatePicker = Frontside.models.Module.extend({
		id: 'datePicker',
		defaults: {
			months: ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"],
			daysInMonth: [31,28,31,30,31,30,31,31,30,31,30,31]
		},

		initialize: function(){
			this.setToday();
		},

		setToday: function(){
			var date = new Date();
			this.set({'currentDate': date});
			this.set({'day': date.getDate(), 'currentDay': date.getDate()});
			this.set({'month': date.getMonth(), 'currentMonth': date.getMonth()});
			this.set({'year': date.getFullYear(), 'currentYear': date.getFullYear()});
		}
	});

	DatePickerView = Frontside.views.ModuleView.extend({
		init: function(){
			this.changedDate();
			this.createDateTable();
			this.inputField();
			this.operateTable();
		},

		events: {
			'click .dateCell a': 'selectDate',
			'click .calendarIcon': 'icon',
			'keyup .calendarInput': 'typing'
		},

		appendRows: function(tableBody, numberOfWeeks){
			$(tableBody).html('');
			for(var i = 0; i < numberOfWeeks; i++){
				$('<tr>', {
					html: '<td></td>'+'<td></td>'+'<td></td>'+'<td></td>'+'<td></td>'+'<td></td>'+'<td></td>'
				}).appendTo($(tableBody));
			}
		},

		changedDate: function(){
			this.model.on('change:day', function(){});
		},

		checkDate:function(){
			var day = this.model.get('day'),
				month = this.model.get('month'),
				year = this.model.get('year');

			var selectedDate = new Date(year, month, day);

			return false;
		},

		createDateTable: function(){
			var tableBody = this.$el.find('tbody');
		
			//Set dropdowns to correct values
			this.$el.find(".calendarPopup").find(".select").eq(1).val(this.model.get('year'));
			this.$el.find(".calendarPopup").find(".select").eq(0).val(this.model.get('months')[this.model.get('month')]);

			//Get data of month to show
			var monthStart = new Date(this.model.get('year'), this.model.get('month'), 1),
				numberOfDaysInMonth = this.model.get('daysInMonth')[this.model.get('month')];
				firstDayOfMonth = monthStart.getDay()-1;

			//Workaround to make sure calendar starts with monday and not sunday (Javascript standard)
			if(firstDayOfMonth === -1){
				firstDayOfMonth = 6;
			}

			//Determine how many weeks this month has and append them
			var numberOfWeeks = Math.ceil(((monthStart.getDay()) + numberOfDaysInMonth)/7);
			this.appendRows(tableBody, numberOfWeeks);
			for(var i = 0; i < numberOfDaysInMonth; i++){
				var num = i+1,
					currentCell = $(tableBody).find('td').eq(firstDayOfMonth + i);
				$(currentCell).html('<a href="#">' + num + '</a>');
				$(currentCell).addClass('dateCell');
			}
		},

		closeCalendar: function(calendar){
			if(calendar === undefined){
				calendar = this.$el;
			}
			calendar.removeClass('open').find('.calendarPopup').fadeOut();
		},

		inputField: function(){
			var self = this;
			this.$el.on('focus', '.calendarInput',
				function(e){
					if($(this).val().length <= 0){
						$(this).val('__/__/____');
						this.setSelectionRange(0,0);
					}
				}
			);
			this.$el.on('blur', '.calendarInput',
				function(e){
					if($(this).val() == '__/__/____'){
						$(this).val('');
					}
				}
			);
		},

		icon: function(e){
			if(this.$el.hasClass('open')){
				this.closeCalendar();
			} else {
				var otherCal = this.$el.siblings('.calendar');
				var input = this.$el.find('.calendarInput').focus();
				this.$el.addClass('open').find('.calendarPopup').fadeIn();
				if(otherCal.hasClass('open')){
					this.closeCalendar(otherCal);
				}
			}
		},

		operateTable: function(){
			var self = this;
			this.$el.on('click', ".calendarPopup .prevButton",
				function(e){
					e.preventDefault();
					var month = self.model.get('month'),
						year = self.model.get('year');
					if(month === 0){
						month = 11;
						self.model.set('month', month);
						self.model.set('year', year - 1);
					} else {
						self.model.set('month', month - 1);
					}
					self.createDateTable();
				}
			);	
			this.$el.on('click', ".calendarPopup .nextButton",
				function(e){
					e.preventDefault();
					var month = self.model.get('month'),
						year = self.model.get('year');
					if(month == 11){
						month = 0;
						self.model.set('month', month);
						self.model.set('year', year + 1);
					} else {
						self.model.set('month', month + 1);
					}
					self.createDateTable();
				}
			);
			this.$el.on('change', ".calendarPopup .dropdown:eq(0) select",
				function(e){
					e.preventDefault();
					var month = self.model.get('months').indexOf($(this).val());
					self.model.set('month', month);
					self.createDateTable();
				}
			);
			this.$el.on('change', ".calendarPopup .dropdown:eq(1) select",
				function(e){
					e.preventDefault();
					self.model.set('year', $(this).val());
					self.createDateTable();
				}
			);
		},

		selectDate: function(e){
			e.preventDefault();
			var clicked = e.target;
			$(clicked).parent().addClass('selected').siblings().removeClass('selected');
			var selectedDay = parseInt($(clicked).html(), 10),
				month = this.model.get('month')+1,
				year = this.model.get('year');
			this.model.set('day', selectedDay);
			if(selectedDay < 10){
				selectedDay = '0' + selectedDay;
			}
			if(month < 10){
				month = '0' + month;
			}
			var dateString = selectedDay +'/' + month + '/' + year;
			this.$el.children('input').attr('value', dateString);
			this.closeCalendar();
		},

		typing: function(e){
			var numbers = {48:'0',49:'1',50:'2',51:'3',52:'4',53:'5',54:'6',55:'7',56:'8',57:'9',96:'0',97:'1',98:'2',99:'3',100:'4',101:'5',102:'6',103:'7',104:'8',105:'9'};
			if((e.keyCode > 47 && e.keyCode < 58) || (e.keyCode > 95 && e.keyCode < 106)){
				
			}
		}
	});
});