$(document).ready(function(){
	var _pastFirst = false;
	var _points = [];
	var _logo = chrome.extension.getURL('src/SUS.png');
	var _next = "<a href='#' class='next'>NEXT 5</a>";
	var _errorCode = "<p class='SUS-error'>You must answer every question!</p>"
	var _Check_1 = "<span class='left'>Strongly disagree</span><span class='right'>Strongly Agree</span><div class='clear'></div><div class='square grp1' data-value='0'></div><div data-value='1' class='square grp1'></div><div data-value='2' class='square grp1'></div><div data-value='3' class='square grp1'></div><div data-value='4' class='square grp1'></div>";
	var _questions = "<div class='first'><p>I think that I would like to use this system frequently.</p>"+_Check_1;
	_questions += "<p>I found the system unnecessarily complex.</p><span class='left'>Strongly disagree</span><span class='right'>Strongly Agree</span><div class='clear'></div><div data-value='4' class='square grp2'></div><div data-value='3' class='square grp2'></div><div data-value='2' class='square grp2'></div><div data-value='1' class='square grp2'></div><div data-value='0' class='square grp2'></div>";
	_questions += "<p>I thought the system was easy to use.</p><span class='left'>Strongly disagree</span><span class='right'>Strongly Agree</span><div class='clear'></div><div data-value='0' class='square grp3'></div><div data-value='1' class='square grp3'></div><div data-value='2' class='square grp3'></div><div data-value='3' class='square grp3'></div><div data-value='4' class='square grp3'></div>";
	_questions += "<p>I think that I would need the support of a technical person to be able to use this system.</p><span class='left'>Strongly disagree</span><span class='right'>Strongly Agree</span><div class='clear'></div><div data-value='4' class='square grp4'></div><div data-value='3' class='square grp4'></div><div data-value='2' class='square grp4'></div><div data-value='1' class='square grp4'></div><div data-value='0' class='square grp4'></div>";
	_questions += "<p>I found the various functions in this system were well integrated.</p><span class='left'>Strongly disagree</span><span class='right'>Strongly Agree</span><div class='clear'></div><div data-value='0' class='square grp5'></div><div data-value='1' class='square grp5'></div><div data-value='2' class='square grp5'></div><div data-value='3' class='square grp5'></div><div data-value='4' class='square grp5'></div></div>";
	_questions += "<div class='second'><p>I thought there was too much inconsistency in this system.</p><span class='left'>Strongly disagree</span><span class='right'>Strongly Agree</span><div class='clear'></div><div data-value='4' class='square grp6'></div><div data-value='3' class='square grp6'></div><div data-value='2' class='square grp6'></div><div data-value='1' class='square grp6'></div><div data-value='0' class='square grp6'></div>";
	_questions += "<p>I would imagine that most people would learn to use this system very quickly.</p><span class='left'>Strongly disagree</span><span class='right'>Strongly Agree</span><div class='clear'></div><div data-value='0' class='square grp7'></div><div data-value='1' class='square grp7'></div><div data-value='2' class='square grp7'></div><div data-value='3' class='square grp7'></div><div data-value='4' class='square grp7'></div>";
	_questions += "<p>I found the system very cumbersome to use.</p><span class='left'>Strongly disagree</span><span class='right'>Strongly Agree</span><div class='clear'></div><div data-value='4' class='square grp8'></div><div data-value='3' class='square grp8'></div><div data-value='2' class='square grp8'></div><div data-value='1' class='square grp8'></div><div data-value='0' class='square grp8'></div>";
	_questions += "<p>I felt very confident using the system.</p><span class='left'>Strongly disagree</span><span class='right'>Strongly Agree</span><div class='clear'></div><div data-value='0' class='square grp9'></div><div data-value='1' class='square grp9'></div><div data-value='2' class='square grp9'></div><div data-value='3' class='square grp9'></div><div data-value='4' class='square grp9'></div>";
	_questions += "<p>I needed to learn a lot of things before I could get going with this system.</p><span class='left'>Strongly disagree</span><span class='right'>Strongly Agree</span><div class='clear'></div><div data-value='4' class='square grp10'></div><div data-value='3' class='square grp10'></div><div data-value='2' class='square grp10'></div><div data-value='1' class='square grp10'></div><div data-value='0' class='square grp10'></div></div>";
	var _platform = "<div class='SUS_platform_ext'><img src='"+_logo+"' alt='system usability scale'>"+_questions+_next+_errorCode+"</div>";
	$('body').append(_platform);
	$('.SUS_platform_ext').on("click", '.next', function(e){
		e.preventDefault();
		if(!_pastFirst && _points[0] != undefined && _points[1] != undefined && _points[2] != undefined && _points[3] != undefined && _points[4] != undefined)
		{
			$('.next').text('SHOW RESULT');
			$('.first').addClass('firstUnactive');
			$('.second').addClass('secondActive');
			_pastFirst = true;
		}
		else if(_pastFirst && _points[5] != undefined && _points[6] != undefined && _points[7] != undefined && _points[8] != undefined && _points[9] != undefined)
		{
			$('.second').removeClass('secondActive');
			$('.next').remove();
			$('.SUS-error').remove();
			_pastFirst = false;
			FinalCount();
		}
		else{

			$('.SUS-error').addClass('SUS-visible');
			setTimeout(function(){
				$('.SUS-error').removeClass('SUS-visible');
			},2000);
		}
	});
	$('.SUS-reset').click(function(e){
		e.preventDefault();
		ResetAll();
	});
	$('.grp1').click(function(e){
		e.preventDefault();
		var a = e.currentTarget;
		$('.grp1').each(function(idx, obj){
				$(obj).removeClass('SUS_Active_N');
		});
		_points[0] = $(a).data('value');
		$(a).addClass('SUS_Active_N');
	});
	$('.grp2').click(function(e){
		e.preventDefault();
		var a = e.currentTarget;
		$('.grp2').each(function(idx, obj){
				$(obj).removeClass('SUS_Active_N');
		});
		_points[1] = $(a).data('value');
		$(a).addClass('SUS_Active_N');
	});
	$('.grp3').click(function(e){
		e.preventDefault();
		var a = e.currentTarget;
		$('.grp3').each(function(idx, obj){
				$(obj).removeClass('SUS_Active_N');
		});
		_points[2] = $(a).data('value');
		$(a).addClass('SUS_Active_N');
	});
	$('.grp4').click(function(e){
		e.preventDefault();
		var a = e.currentTarget;
		$('.grp4').each(function(idx, obj){
				$(obj).removeClass('SUS_Active_N');
		});
		_points[3] = $(a).data('value');
		$(a).addClass('SUS_Active_N');
	});
	$('.grp5').click(function(e){
		e.preventDefault();
		var a = e.currentTarget;
		$('.grp5').each(function(idx, obj){
				$(obj).removeClass('SUS_Active_N');
		});
		_points[4] = $(a).data('value');
		$(a).addClass('SUS_Active_N');
	});
	$('.grp6').click(function(e){
		e.preventDefault();
		var a = e.currentTarget;
		$('.grp6').each(function(idx, obj){
				$(obj).removeClass('SUS_Active_N');
		});
		_points[5] = $(a).data('value');
		$(a).addClass('SUS_Active_N');
	});
	$('.grp7').click(function(e){
		e.preventDefault();
		var a = e.currentTarget;
		$('.grp7').each(function(idx, obj){
				$(obj).removeClass('SUS_Active_N');
		});
		_points[6] = $(a).data('value');
		$(a).addClass('SUS_Active_N');
	});
	$('.grp8').click(function(e){
		e.preventDefault();
		var a = e.currentTarget;
		$('.grp8').each(function(idx, obj){
				$(obj).removeClass('SUS_Active_N');
		});
		_points[7] = $(a).data('value');
		$(a).addClass('SUS_Active_N');
	});
	$('.grp9').click(function(e){
		e.preventDefault();
		var a = e.currentTarget;
		$('.grp9').each(function(idx, obj){
				$(obj).removeClass('SUS_Active_N');
		});
		_points[8] = $(a).data('value');
		$(a).addClass('SUS_Active_N');
	});
	$('.grp10').click(function(e){
		e.preventDefault();
		var a = e.currentTarget;
		$('.grp10').each(function(idx, obj){
				$(obj).removeClass('SUS_Active_N');
		});
		_points[9] = $(a).data('value');
		$(a).addClass('SUS_Active_N');
	});
	function FinalCount(){
		var result = 0;
		var _string = '<div class="SUS-result"><h2>Evaluation result</h2>';
		$(_points).each(function(idx,obj){
			result += obj;
		});
		result = result * 2.5;
		if(result > 67)
		{
			_string += '<h1 class="sus-above-av">'+result+'</h1><h3 class="sus-above-av">Usability is above average!</h3>';
		}else{
			_string += '<h1 class="sus-below-av">'+result+'</h1><h3 class="sus-below-av">Usability is below average!</h3>';
		}
		_string += "<a href='#' class='SUS-reset'>START OVER</a></div>"
		$('.SUS_platform_ext').append(_string);
	}
	function ResetAll(){
		
		_points = [];
		$('.SUS-result').remove();
		$('.first').removeClass('firstUnactive');
		$('.square').each(function(idx,obj){
			$(obj).removeClass('SUS_Active_N')
		});
		$('.SUS_platform_ext').append(_next);
		$('.SUS_platform_ext').append(_errorCode);
	}
	$('.SUS_platform_ext').on("click", '.SUS-reset', function(e){
		e.preventDefault();
		ResetAll();
	});
});
