$(function() {
	//为添加按钮绑定事件
	$(".ptn_add").on('click',function() {
		var data;
		//调出模态框
		$('.pmtk_base').css("display","block");
		//将输入框清空
		$('input[name=name]').val("");
		$('input[name=categoryId]').val("");
		$('input[name=description]').val("");
		$('input[name=price]').val("");
	})
	//为模态框添加事件
	$('.pmtk_yes').on('click',function() {
		var name = $('input[name=name]').val();
		var categoryId = $('input[name=categoryId]').val();
		var description = $('input[name=description]').val();
		var price = $('input[name=price]').val();
		data = "name="+name+"&categoryId="+categoryId+"&description="+description+"&price="+price;
		var url = "http://134.175.154.93:6677/product/insertProduct";
		$.post(url,data,function(result) {
			if(result.status===200) {
				// alert("添加成功")；
				reloadData();
			}
			else {
				alert(result.message);
			}
		});
		$('.pmtk_base').css("display","none");
	});
	//为删除添加事件
	$('.pbd_cont').on("click",'span',function() {
		switch(this.innerText) {
			case "删除" :
			var id = $(this).parents('tr').children().first().children().val();
			var url = "http://134.175.154.93:6677/product/deleteProductById";
			var data = "id=" + id;
			$.post(url,data,function(result) {
				if(result.status===200) {
					reloadData();
				} else {
					alert(result.message);
				}
			});
			break;
		}
	})
	//重载数据
	function reloadData() {
		var url = "http://134.175.154.93:6677/product/findAllProduct";
		var tbody = $('.pbd_cont')[0];
		$.get(url,function(response) {
			Array.prototype.slice.call(tbody.children,0).forEach(function(item,index){
					if(index !== 0 ){
						tbody.removeChild(item)
					}
				})
			response.data.forEach(function(item){
				// 2.1 创建一个tr,然后将数据添加到tr中
				var newTr = tbody.firstElementChild.cloneNode(true);
				newTr.children[0].firstElementChild.value = item.id;
				newTr.children[1].innerText = item.name;
				newTr.children[2].innerText = item.categoryId;
				newTr.children[3].innerText = item.photo;
				newTr.children[4].innerText = item.description;
				newTr.children[5].innerText = item.price;
				newTr.setAttribute("class","");
				// 2.2 将tr追加到tbody中
				tbody.appendChild(newTr);
			})
		})
	}
	reloadData();
})
