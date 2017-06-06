var randomColor = (function(){
  var golden_ratio_conjugate = 0.618033988749895;
  var h = Math.random();

  var hslToRgb = function (h, s, l){
      var r, g, b;

      if(s == 0){
          r = g = b = l; // achromatic
      }else{
          function hue2rgb(p, q, t){
              if(t < 0) t += 1;
              if(t > 1) t -= 1;
              if(t < 1/6) return p + (q - p) * 6 * t;
              if(t < 1/2) return q;
              if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
              return p;
          }

          var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          var p = 2 * l - q;
          r = hue2rgb(p, q, h + 1/3);
          g = hue2rgb(p, q, h);
          b = hue2rgb(p, q, h - 1/3);
      }

      return '#'+Math.round(r * 255).toString(16)+Math.round(g * 255).toString(16)+Math.round(b * 255).toString(16);
  };
    return function(){
    h += golden_ratio_conjugate;
    h %= 1;
    return hslToRgb(h, 0.5, 0.60);
  };
})();

var rainbow = ["#f1e902", "#a1cd3c", "#66be65", "#3cbfb8", "#21a2dc","#5588c7","#cd6baa","#ea4660","#f04942","#f04b23","#f07122","#f2aa1d","#eed216"]

d3.selectAll("li.thirties")
	.style("background-color", function(d,i){
		if(i == 31){
			d3.select("body")
				.style("background-color",rainbow[i%13])
		}
		return rainbow[i%13]
	})
	.on("click", function(d,i){
		if(i != 0 && i != 31){
			openList(i, this)			
		}
	})

	
repeat(1)	

function repeat(count) {
	d3.selectAll("li.thirties")
		.transition()
		.duration(2000)
		.ease(d3.easeLinear)
		.style("background-color", function(d,i){
			if(i == 31){
				d3.select("body")
					.transition()
					.ease(d3.easeLinear)
					.duration(2000)
					.style("background-color",rainbow[(i+count)%13])
			}
			return rainbow[(i+count)%13]
		})
		.on("end", function(){ repeat(count+1) })
};


function openList(i, obj){
	$('html,body').animate({ scrollTop: 0 }, 'slow');
	d3.select("#list-container")
		.style("pointer-events","auto")
		.transition()
		.duration(1000)
		.style("opacity",1)

	var list = lists[i-1]

	var title = d3.select(obj).select("h3").html()
	d3.select("#list-contents")
		.remove()

	var listContents = d3.select("#list-container")
		.append("div")
		.attr("id", "list-contents")
	listContents.append("div")
		.attr("class", "list-title")
		.html("#" + i + " " + title)

	if(i == 3){
		listContents.append("div")
			.attr("class", "list-disclaimer")
				.html("Location data from <a href = \"http://www.steaknshake.com/\">steaknshake.com</a>. Distances are in geodesic (\"crow flies\") miles.")	
	}

	var ul = listContents.append("ul")

	for(var j = 0; j < list.items.length; j++){
		var li = ul.append("li")
		li.append("span")
			.attr("class", "list-number")
			.text((j+1) + ".")
		if(list["items"][j]["text"] != ""){
			li.append("div")
				.attr("class", "list-description")
				.html(list["items"][j]["text"])
		}
		if(list["items"][j]["image"] != false){
			li.append("div")
				.attr("class","list-img-container")
				.append("img")
				.attr("src",list["items"][j]["image"])
		}
	}

	listContents.append("img")
		.attr("id", "close-button")
		.attr("src","images/close-button.png")
		.on("click", function(){
			closeList();
		})
		.on("mouseover", function(){
			d3.select(this)
				.attr("src","images/close-button-hover.png")
		})
		.on("mouseout", function(){
			d3.select(this)
				.attr("src","images/close-button.png")
		})
	listContents.append("div")
		.attr("id","list-bottom-close")
		.text("Close")
		.on("click", function(){
			closeList();
		})
}

function closeList(){
	d3.select("#list-container")
		.style("pointer-events","none")
		.transition()
		.duration(1000)
		.style("opacity",0)
		.on("end", function(){
			d3.select("#list-contents")
				.remove()
		})
}

$(document).keyup(function(e) {
     if (e.keyCode == 27) { // escape key maps to keycode `27`
        closeList();
    }
});