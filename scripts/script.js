$.ajax({  
	url: 'https://api.vk.com/method/photos.get?owner_id=-5880263&album_id=204376129&access_token=171062ab171062ab171062ab98175ef93711710171062ab4b747c497a208287e3f065a3&v=5.0',    
	dataType: "jsonp",  
	success:function(e){ 
		var $div = $(".pictures");					
		var $height = 200;		
		var $width;
		$.each(e.response, function(i, val) {						
			$width = 200 / (val.height / val.width);
			console.log("height: " + val.height + "width: " + val.width + "imgwidth: " + $width);
			var img = $('<img width='+$width+' height='+$height+'>'); 
			img.attr('src', val.src_big);
			var fullsizePictureLink = val.src_xxbig || val.src_xbig || val.src_big;
			var a = $('<a class=a href=' + fullsizePictureLink + '>');
			a.html(img);
			$('.clear').before(a);
		});
		$('.pictures').gpGallery('img');
		$('#thumbs a').touchTouch();	
		/*$(window).resize(function(){
			$('.pictures').empty();
			$('.pictures').append($('<div class="separator">'));
			$('.pictures').append($('<div class="clear">'));
			$.each(e.response, function(i, val) {						
				$width = 200 / (val.height / val.width);
				console.log("height: " + val.height + "width: " + val.width + "imgwidth: " + $width);
				var img = $('<img width='+$width+' height='+$height+'>'); 
				img.attr('src', val.src_big);
				var fullsizePictureLink = !val.src_xxbig ? val.src_xbig : val.src_xxbig;
				var a = $('<a class=a href=' + fullsizePictureLink + '>');
				a.html(img);
				$('.clear').before(a);
				//$('.pictures').gpGallery('img');
			});
		});	*/				
		//$(window).resize(function(){location.reload();});
	}  
}); 
