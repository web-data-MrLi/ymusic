$(function(){
		var audio=$("#audio")[0]
		var play=$(".play")
		var push=$(".push")
		var ft=$(".foot3")
		var cen=$(".cen1")
		var ft1=$(".star-2")
		var star=$(".star-t")
		var end=$(".end-t")
		var yuan=$(".star-c")
		var stars=$(".star")
		var jing=$(".jing")
		var yin=$(".yin")
		var lc=$(".yin-c")
		var show=1;
		var now=0;
		
		var currentIndex=0;
		
		var musics=[
		{
			name:"刚刚好",
			author:"薛之谦",
			src:"music/薛之谦 - 刚刚好.mp3"
		},
		{
			name:"演员",
			author:"薛之谦",
			src:"music/薛之谦 - 演员.mp3"
		},
		{
			name:"丑八怪",
			author:"薛之谦",
			src:"music/薛之谦 - 丑八怪.mp3"
		},
		{
			name:"你还要我怎么样",
			author:"薛之谦",
			src:"music/薛之谦 - 你还要我怎样.mp3"
		}]
		play.on("click",function(){
			if(audio.paused){	
				audio.play();
			}
			else{
				audio.pause();
			}
		})
		$(audio).on("play",function(){
			play.addClass("play1")
		})
		$(audio).on("pause",function(){	
			play.removeClass("play1")
		})
		function time(v){
			var p=Math.floor(v/60)
			var u=Math.floor(v) % 60
			u=(u<10)?('0'+u):u
			return p+'：'+u 
		}
		$(audio).on("canplay",function(){
			end.html(time(audio.duration));
		})
		
		lc.on("click",false);



function next(){
		now=now+1;
		if(now>=musics.length){
			now=0;
		}
		audio.src=musics[now].src;
		render(musics,songlist);
	}
	function prev(){
		now=now-1;
		if(now<0){
			now=musics.length-1;
		}
		audio.src=musics[now].src;
		render(musics,songlist);
	}
	function render(obj,obj2){				//  主函数为了加载页面
		obj2.empty();
		for(var i=0;i<obj.length;i++){
			if(i==now){
				audio.src=obj[i].src;
				audio.play()
				c="active"
			}else{
				c=""
			}
			$("<li class='"+c+"'><p class='author1'>"+musics[i].author+"</p><span class='delete'></span></li>").
			appendTo(obj2)
		}
	}
	
	
	   //进度条点击
	
       
	   //进度条点击
	ft.on("touchend",function(e){						
		show=0;
	    left=e.originalEvent.changedTouches[0].clientX-ft.offset().left;
		audio.currentTime=audio.duration* left/ft.width();
		return false;
	})

	//进度条拖进
	yuan.on("touchstar",function(e){							
		ox=e.originalEvent.changedTouches[0].clientX-yuan.offset().left;
		var star=yuan.width()/2-ox;
		$(document).on("touchmove",function(e){
			var left1=e.originalEvent.changedTouches[0].clientX-(ft.offset().left+star);
			
				if(left1>=ft.width()||left1<=0){
					return;	
				}
			audio.currentTime=left1/ft.width()*audio.duration;
		})
		return false;
	})
	yuan.on("click",false)
	yuan.on("touchend",function(){
		$(document).off("touchmove")
		return false;
	})
	
	

	
	
	
	
		$(audio).on("timeupdate",function(){
			star.html(time(audio.currentTime))
			var width=stars.width();
			var left=(stars.width()*audio.currentTime/audio.duration)-yuan.width()/2;
			yuan.css("left",left)
		})
		
		
		
		yin.on("click",function(e){
			audio.volume=e.offsetX/yin.width();
			jing.removeAttr('s-v');
			
		})
		
		
		
		jing.on("click",function(e){
			if($(this).attr("s-v")){
				audio.volume=$(this).attr("s-v")
				$(this).removeAttr('s-v')
			}else{
				$(this).attr("s-v",audio.volume)
				audio.volume=0
			}
			
		})
		
		$(audio).on("volumechange",function(e){
//		    lc.style.left=yin.offsetWidth*audio.volume-lc.offsetWidth/2+"px";
            lc.css("left",yin.width()*audio.volume-lc.width()/2);
         })
		
		
		
		//进度
		yuan.on("mousedown",function(e){
			var r=yuan.width()/2;
			var star=r-e.offsetX;
			$(document).on("mousemove",function(e){
				var left=e.clientX-stars.position().left+star;
				console.log(stars.position().left)
				var c=left/stars.width()*audio.duration;
				if (c>=audio.duration||c<=0){
					return;
				}
				audio.currentTime=c;
			})
		})
//		yuan.on("mousedown",function(e){
//			
//			var r=yuan.width()/2;
//			var star=r-e.OffsetX;
//			$(document).on("mousemove",function(){
//				var left=e.clientX
//				console.log(left)
//			})
//		})
		//声音
		lc.on("mousedown",function(e){
			var r=lc.width()/ 2;
			var star=r-e.offsetX;
			$(document).on("mousemove",function(e){
				var left=e.clientX-yin.position().left+star;
				var v=left/yin.width();
				if(v>1 || v<0){
					return;
				}

				audio.volume=v;
			})
		})
		$(document).on("mouseup",function(){
			$(document).off("mousemove");
		})
		
		
		
		

		
		var ul=$("ul");
		function render(){
			ul.empty();
			$.each(musics,function(index,val){
				var c=(index==currentIndex)? "active":"";
				$("<li class='"+c+"'><span>"+musics[index].name+"</span><span>"+musics[index].author+"</span></li>").appendTo(ul);
				$(".head3 a").html(musics[index].name);
				$(".head5 span").html(musics[index].author);
			})
		}  
		
		
		render();
		ul.on("click","li",function(){
			$("li").removeClass("active");
			$(this).addClass("active");
			currentIndex=$(this).index();
            
			audio.src=musics[currentIndex].src;
			audio.play();
		})

          // 下一首
			var next=$(".xia");
				next.on("click",function(){
					currentIndex++;
						if (currentIndex>musics.length-1) {
							currentIndex=0;
						}
						$("li").removeClass("active");
						$("li").eq(currentIndex).addClass("active");
						audio.src=musics[currentIndex].src;
						$(".head3 a").html(musics[currentIndex].name);
						$(".head5 span").html(musics[currentIndex].author);
						audio.play();
			})	
		   // 上一首
		   var pre=$(".shang");
			   pre.on("click",function(){
			   		currentIndex--;
			   		if (currentIndex<=0) {
				   		currentIndex=musics.length-1;
				   	}
				   	$("li").removeClass("active");
				   	$("li").eq(currentIndex).addClass("active");
				   	audio.src=musics[currentIndex].src;
				   	$(".head3 a").html(musics[currentIndex].name);
				   	$(".head5 span").html(musics[currentIndex].author);
				   	audio.play();
		   })	
		   
		   
		   $(".head2").on("click",function(){
		   	   $(".one").css("display","block");
		   })
           $(".head4").on("click",function(){
		   	   $(".one").css("display","none");
		   })
           
           $(".b1").on("click",function(){
           	   $(".b1").css("background","url(images/xh1.png) no-repeat").css("background-size","1rem 1rem"
              ).css("background-position","0.2rem 0.2rem");
           })
           $(".b2").on("click",function(){
           	    $(".b2").css("background","url(images/lp1.png) no-repeat").css("background-size","1rem 1rem"
              ).css("background-position","0.2rem 0.2rem");
               $("#audio").css("loop");
           })
           
           
           
           
   	///////////////////////////////////////////////////播放列表
	//////////////////////////////////		第一页
	  //////播放列表显示
	 var songlist=$(".songlist") 
	var ones=$(".ones")
	var ss=$(".ss");
	var tx=$(".tc1");
	var th=tx.height();
	var set=$(".set");
	var playlis=$(".playlist")
	tx.css("bottom",-th);
	var now1;
	var next1=$("#next")
	var delete1=$("#delete")
	var list=$(".list")
	var num=$("#num")
	var playlist=$("#playlist")
	var top;
	var clear=$("#clear")
	var kk=$(".kk")
	render(musics,songlist);
	render1(musics,playlist)
	
	////////////////////////////////////////////
	function xiaoshi(){
		ss.animate({"opacity":0},200,"linear",function(){
			ss.css("display","none")
		})
		tx.animate({"bottom":-th},200,"linear",function(){
			tx.css("display","none")
		})
	}
	
	function deletesong(){
		if(now1==now){
			musics.splice(now1,1)
			localStorage.musics=JSON.stringify(musics);
			render(musics,songlist);
			render1(musics,playlist);
		}
		if(now1<now){
			now--;
			musics.splice(now1,1)
			localStorage.musics=JSON.stringify(musics);
			render(musics,songlist);
			render1(musics,playlist);
		}
		if(now1>now){
			musics.splice(now1,1)
			localStorage.musics=JSON.stringify(musics);
			render(musics,songlist);
			render1(musics,playlist);
		}
	}
	
	function render1(obj,obj2){				//  主函数为了加载页面
		obj2.empty();
		num=$("#num")
		num.html(musics.length);
		for(var i=0;i<obj.length;i++){
			if(i==now){
				d="active"
			}else{
				d=""
			}
			$("<li class='"+d+"'><span>"+musics[i].name+"</span><span>"+musics[i].author+"</span><span class='delete'></span></li>").appendTo(playlist)
		}
	}
	
	songlist.on("touchend","li",function(){			//////播放列表按动
		var index=$(this).index();
		if(index==now){
			if(audio.paused){
				audio.play();
			}
			else{
				audio.pause()
			}
			return;
		}
		now=index;
		show=0;
		render(musics,songlist);
		return false;
	})
	
	ones.on("touchend",function(){				  /////播放列表添加
		
		var index=$(this).index();
		var music=JSON.parse($(this).attr("data-role"))
		musics.push(music)
		localStorage.musics=JSON.stringify(musics);
		render(musics,songlist);
		return false;
	})											
	
	songlist.on("touchend",".set",function(){		/////通过playlist播放列表删除
		ss.css("display","block").animate({"opacity":1},200,"linear")
		tx.css("display","block").animate({"bottom":0},200,"linear")
		var lis=$(this).closest("li")
		now1=lis.index();
		return false;
	})
	
	ss.on("touchend",function(){
		xiaoshi();
		playlis.animate({"bottom":-top},200,function(){
			playlis.css("display","none")
			return false;
		})
		return false;
	})
	tx.on("touchend",function(){
		xiaoshi();
		return false;
	})
	delete1.on("touchend",function(){
		deletesong();
		return false;
	})
	
	next1.on("touchend",function(){
		show=audio.paused;
		next();
		xiaoshi()
		return false;
	})
	
	list.on("touchend",function(){///////通过playlist第二种删除
		render1(musics,playlist)
		top=playlis.height();
		playlis.css({"bottom":-top,"display":"block"})
		playlis.animate({"bottom":0},200,"linear")
		ss.css("display","block").animate({"opacity":1},200,"linear")
		return false;
	})
	
	playlist.on("touchend","li",function(){
		var index=$(this).index();
		if(index==now){
			if(audio.paused){
				audio.play();
				
			}
			else{
				audio.pause()
			}
			return;
		}
		now=index;
		show=0;
		render(musics,songlist);
		render1(musics,playlist);
		return false;
	})
	
	playlist.on("touchend",".delete",function(){
		var index=$(this).closest("li").index();
		now1=index;
		deletesong();
		return false;
	})
	
	clear.on("touchend",function(){			/////清空列表
		musics=[]
		localStorage.musics=JSON.stringify(musics)
		render(musics,songlist);
		render1(musics,playlist);
		return false;
	})
	
	
	
		///////////////////////////////////		audio所有自带事件
	
	$(audio).on("loadstar",function(){
		name.html(musics[now].name);
		author.html(musics[now].author);
		$("#gm").html(musics[now].name);
		$("#gs").html(musics[now].author);
		bg.attr("src",musics[now].img);
		imgs.css("background-image","url("+musics[now].img+")");
		kk.attr("src",musics[now].img)
		
		num=0
		
	})
	
	$(audio).on("ft",function(){
		
	})
	
	$(audio).on("canplay",function(){
		star.html(time(audio.currentTime));
		end.html(time(audio.duration));
		if(show){
			audio.pause();
		}else{
			audio.play();
		}
	})
	
	


	
	$(audio).on("timeupdate",function(){
		yuan.css("left",ft.width()*audio.currentTime/audio.duration-yuan.width()/2);
		ft1.css("width",ft.width()*audio.currentTime/audio.duration);
		cen.css("width",ft.width()*audio.currentTime/audio.duration);
		star.html(time(audio.currentTime));
		num++;
	})
	
	
	$(audio).on("volumechange",function(){
		volume1.css("width",audio.volume*volume.width())
		vi.css("left",audio.volume*volume.width()-vi.width()/2)
	})
	
	$(audio).on("ended",function(){
		if(round.attr("type")==1){
			now++;
			show=0;
			prev();
		
			return false;
		}
		else{
			show=0;
			next();
			return false;
		}
	})
	$("body").on("click",function(){
		$(".playlist").css("display","none")
	})

	})

//$(document).ready(function  () {
//	
//  $(".head4").click(function  () {
//   
//    var index=$(this).index(".head4");
//    $(".one").css("display","block");
//   
//  })
//})