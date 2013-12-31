'use strict';

define(['frontside', 'sinon'], function(Frontside){
	require(['components'], function() {
		describe("Vendor Scripts loaded", function() {
			it("jquery is intialized", function() {
			    expect($).not.toEqual(null);
			});
			it("Underscore is intialized", function() {
			    expect(_).not.toEqual(null);
			});
			it("dust is intialized", function() {
			    expect(dust).not.toEqual(null);
			});
			it("modernizr is intialized", function() {
			    expect(Modernizr).not.toEqual(null);
			});

			it("Frontside is intialized", function() {
			    expect(Frontside).not.toEqual(null);
			});
		})

		describe("Frontside functionalities", function() {
			it("Frontside models object is created", function() {
			    expect(Frontside.models).not.toEqual(null);
			});

			it("Frontside views object is created", function() {
			    expect(Frontside.views).not.toEqual(null);
			});

			it("Frontside extended model (Module, Form, FormDialog, Table) functionalities are added", function() {
			    expect(Frontside.Module).not.toEqual(null);
			    expect(Frontside.Dialog).not.toEqual(null);
			    expect(Frontside.FormDialog).not.toEqual(null);
			    expect(Frontside.Table).not.toEqual(null);
			});

			it("Frontside extended view (Module, Form, FormDialog, Table) functionalities are added", function() {
			    expect(Frontside.ModuleView).not.toEqual(null);
			    expect(Frontside.DialogView).not.toEqual(null);
			    expect(Frontside.FormDialogView).not.toEqual(null);
			    expect(Frontside.TableView).not.toEqual(null);
			});
		})
	})
});

