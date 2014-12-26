define([
	'frontside'
], function (Frontside) {
	Footer = Frontside.models.Module.extend({

	});
	FooterView = Frontside.views.ModuleView.extend({
		init:function(){
			this.changeEvents();
		},

		changeEvents: function(){
			var self = this;
			this.model.on('change:fullScreen', function(model){
				self.rerender();
			});
		}
	});

	Frontside.footer = new Footer();
	Frontside.footerView = new FooterView({model: Frontside.footer});
});(function(){dust.register("footer",body_0);function body_0(chk,ctx){return chk.write("<!-- Footer --><div id=\"footerWrapper\"><footer id=\"pageFooter\"><nav id=\"footerNav\">").section(ctx._get(false, ["navLists"]),ctx,{"block":body_1},null).write("</nav>").section(ctx._get(false, ["disclaimer"]),ctx,{"block":body_6},null).write("</footer></div><!--// Footer -->");}function body_1(chk,ctx){return chk.write("<div ").section(ctx._get(false, ["status"]),ctx,{"block":body_2},null).write("> <h2>").reference(ctx._get(false, ["listTitle"]),ctx,"h").write("</h2><ul>").section(ctx._get(false, ["links"]),ctx,{"block":body_3},null).write("</ul></div>");}function body_2(chk,ctx){return chk.write("class=\"").reference(ctx._get(false, ["status"]),ctx,"h").write("\"");}function body_3(chk,ctx){return chk.write("<li><a ").section(ctx._get(false, ["status"]),ctx,{"block":body_4},null).write(" href=\"").reference(ctx._get(false, ["href"]),ctx,"h").write("\" ").section(ctx._get(false, ["title"]),ctx,{"block":body_5},null).write(">").reference(ctx._get(false, ["label"]),ctx,"h",["s"]).write("</a></li>");}function body_4(chk,ctx){return chk.write("class=\"").reference(ctx._get(false, ["status"]),ctx,"h").write("\"");}function body_5(chk,ctx){return chk.write("title=\"").reference(ctx._get(false, ["title"]),ctx,"h").write("\"");}function body_6(chk,ctx){return chk.write("<section class=\"disclaimer\"><img alt=\"Elsevier logo\" src=\"static/images/logo-elsevier.png\" /><p><strong>").reference(ctx._get(false, ["textCopy"]),ctx,"h",["s"]).write("</strong></p><p>").reference(ctx._get(false, ["textLicense"]),ctx,"h",["s"]).write("</p></section>");}return body_0;})();