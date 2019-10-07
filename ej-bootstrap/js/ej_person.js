$("ul").on("click","li",function(){
	$("li").removeClass("bg-secondary")
	$(this).addClass("bg-secondary")
	var url = $(this).attr("url");
	$(".loaduse").load(url)
})
$("li:first-child").trigger("click");
