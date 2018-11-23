$(document).ready(function()
        {
	        $('.close-btn').click(function(){
		        $('.popbox').fadeOut(function(){ $('#screen').hide(); });
		        return false;});
	        $('.popbox-link').click(function()
	        {
		        var h = $(document).height();
		        $('#screen').css({ 'height': h });	
		        $('#screen').show();
		        $('.popbox').center();
		        $('.popbox').fadeIn();
		        return false;
	        });	
	        $('.close-btn').click(function(){
		        $('.popboxw').fadeOut(function(){ $('#screen').hide(); });
		        return false;
	        });
	        $('.popboxw-link').click(function()
	        {
		        var h = $(document).height();
		        $('#screen').css({ 'height': h });	
		        $('#screen').show();
		        $('.popboxw').center();
		        $('.popboxw').fadeIn();
		        return false;
	        });		
	        $('.close-btn').click(function(){
		        $('.popboxval').fadeOut(function(){ $('#screen').hide(); });
		        return false;
	        });
	        $('.popboxval-link').click(function()
	        {
	            var name = $(this).attr("myvalue");		
		        document.getElementById('Text1').value =name;
		        var h = $(document).height();
		        $('#screen').css({ 'height': h });	
		        $('#screen').show();
		        $('.popboxval').center();
		        $('.popboxval').fadeIn();
		        return false;
	        });
	        $('.close-btn').click(function(){
		        $('.popboxly').fadeOut(function(){ $('#screen').hide(); });
		        return false;
	        });
	        $('.popboxly-link').click(function()
	        {
	            var name = $(this).attr("myvaluely");		
		        document.getElementById('Text2').value =name;
		        var h = $(document).height();
		        $('#screen').css({ 'height': h });	
		        $('#screen').show();
		        $('.popboxly').center();
		        $('.popboxly').fadeIn();
		        return false;
	        });
        });
        jQuery.fn.center = function(loaded) 
        {
	        var obj = this;
	        body_width = parseInt($(window).width());
	        body_height = parseInt($(window).height());
	        block_width = parseInt(obj.width());
	        block_height = parseInt(obj.height());	
	        left_position = parseInt((body_width/2) - (block_width/2)  + $(window).scrollLeft());
	        if (body_width<block_width) { left_position = 0 + $(window).scrollLeft(); };	
	        top_position = parseInt((body_height/2) - (block_height/2) + $(window).scrollTop());
	        if (body_height<block_height) { top_position = 0 + $(window).scrollTop(); };	
	        if(!loaded) 
	        {		
		        obj.css({'position': 'absolute'});
		        obj.css({ 'top': top_position, 'left': left_position });
		        $(window).bind('resize', function()
		        { 
			        obj.center(!loaded);
		        });
		        $(window).bind('scroll', function() 
		        { 
			        obj.center(!loaded);
		        });
	        }
	        else 
	        {
		        obj.stop();
		        obj.css({'position': 'absolute'});
		        obj.animate({ 'top': top_position }, 200, 'linear');
	        }
        }