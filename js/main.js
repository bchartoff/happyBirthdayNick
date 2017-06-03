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
		if(i == 30){
			d3.select("body")
				.style("background-color",rainbow[i%13])
		}
		return rainbow[i%13]
	})
	.on("click", function(d,i){
		openList(i)
	})

	
repeat(1)

function repeat(count) {
	d3.selectAll("li.thirties")
		.transition()
		.duration(1000)
		.style("background-color", function(d,i){
			if(i == 30){
				d3.select("body")
					.transition()
					.duration(1000)
					.style("background-color",rainbow[(i+count)%13])
			}
			return rainbow[(i+count)%13]
		})
		.on("end", function(){ repeat(count+1) })
};



var listContainer = d3.select("#list-container")
	.style("width",0)
	.style("height",0)
	.style("left",(window.innerWidth/2) + "px")
	.style("top", (window.innerHeight/2) + "px")

listContainer.select("#inner-list")
	.style("opacity",0)


function openList(i){
	listContainer
		.style("width",0)
		.style("height",0)
		.style("left",(window.innerWidth/2) + "px")
		.style("top", (window.innerHeight/2) + "px")
		.transition()
		.duration(1000)
		.style("width", (window.innerWidth*.8) + "px")
		.style("height", (window.innerHeight*.8) + "px")
		.style("left", (window.innerWidth*.1) + "px")
		.style("top", (window.innerHeight*.1) + "px")
		.on("end", function(){
			d3.select("#inner-list")
				.html(i)
				.transition()
				.style("opacity",1)
		})
}

