        var legW= 0.8 * window.innerWidth
        var legH= 60
        const legPaddingH = 80;
        const legPaddingV = 10
        
        var w= 960;
        var h= 570;
        const paddingH = 80;
        const paddingV= 100;
   

window.onload = ()=>{
    fetch("https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json")
    .then(response => response.json())
    .then(data =>{
        
        console.log(data.children)
        const sortedData = data.children.sort((a,b)=>{
            return b.children.length - a.children.length
        })
        console.log(sortedData)
        
       
        const quantifyChildren = sortedData.map(item=>{
            return {...item, quantity: item.children.map(child=>{
                return child.value
            }).reduce((a,b)=>{
                return Number(a)+Number(b)
            })}
        })
        const totalQuantity=quantifyChildren.map(item=>{
            return item.quantity
        }).reduce((a,b)=>{
            return a+b;
        })
        console.log(quantifyChildren)
        console.log(totalQuantity)
        
  
        
        const layout = d3.treemap()
            .size([w,h])
            .round(false)
            

        const root = d3.hierarchy(data)

        root.sum(d=>{
            return d.value
        })

        layout(root);


      

        const tooltip= d3.select("body")
            .append("div")
            .attr("id", "tooltip")
            .style("opacity", "0")
             
        d3.select("svg")
            .attr("width", w)
            .attr("height",h)
       
        d3.select('svg g')
            
            .selectAll("rect")
            .data(root.leaves())
            .enter()
            .append("rect")
            .attr("class", "tile")
            .attr("x", (d)=> d.x0 )
            .attr("y", (d)=> d.y0 )
            .attr("stroke-width", 4)
            
            .attr("fill", (d)=>{
                
                switch(true){
                    
                    case d.data.category=="Action" :
                        return "red"
                    case d.data.category=="Adventure":
                        return "orange"
                    case d.data.category=="Comedy":
                        return "green"
                    case d.data.category=="Drama":
                        return "pink"
                    case d.data.category=="Animation":
                        return "yellow"
                    case d.data.category=="Family":
                        return "purple"
                    case d.data.category=="Biography":
                        return "lightgreen"
                        
                    default : return "blue"
                }
            })
            .attr("width", d=>  d.x1 - d.x0) 
            .attr("height", d=>  d.y1-d.y0)
            .attr("data-name", d=>d.data.name)
            .attr("data-category",d=> d.data.category)
            .attr("data-value", d=>d.data.value)
           
        
            .on("mousemove", (d)=>{
                tooltip
                    .style("opacity", "0.9")
                    .html(`Name: ${d.data.name} <br>
                            Category: ${d.data.category} <br>
                            Value: ${d.data.value}`)
                    .attr("data-value", d.data.value)
                    .style("top", d3.event.pageY - 100 + "px")
                    .style("left", d3.event.pageX  -50 + "px")
               })
            .on("mouseleave", ()=>tooltip.style("opacity", "0"))


            const legend = d3.select("body")
            .append("svg")
            .attr("width", legW)
            .attr("height", legH)
            .attr("x", 0.1* window.innerWidth)
            .attr("y", h - (legPaddingV + legH)) 
            .attr("id", "legend")
            

        legend.append("text")
            .text("Action")
            .attr("dy", "1em")
            
            .attr("transform", "translate("+legW/5+","+(legH/2+legPaddingV) + ")")
            
        legend.append("text")
            .text("Adventure")
            .attr("dy", "1em")
          
            .attr("transform", `translate(${90+legW / 5},${legH / 2 + legPaddingV})`)
            legend.append("text")
            .text("Comedy")
            .attr("dy", "1em")
           
            .attr("transform", `translate(${200+legW / 5},${legH / 2 + legPaddingV})`)
            legend.append("text")
            .text("Drama")
            .attr("dy", "1em")
          
            .attr("transform", `translate(${300+legW / 5},${legH / 2 + legPaddingV})`)
            legend.append("text")
            .text("Animation")
            .attr("dy", "1em")
          
            .attr("transform", `translate(${390+ legW / 5},${legH / 2 + legPaddingV})`)
            legend.append("text")
            .text("Family")
            .attr("dy", "1em")
           
            .attr("transform", `translate(${500+legW / 5},${legH / 2 + legPaddingV})`)
            legend.append("text")
            .text("Biography")
            .attr("dy", "1em")
          
            .attr("transform", `translate(${600+legW / 5},${legH / 2 + legPaddingV})`)

        legend.append("rect")
            .attr("fill", "red")
            .attr("class", "legend-item")
            .attr("transform", `translate(${-25 + legW / 5},${legH / 2 +7.5})`)
           
            legend.append("rect")
            .attr("fill", "orange")
            .attr("class", "legend-item")
            .attr("transform", `translate(${65 + legW / 5},${legH / 2 +7.5})`)
            
            legend.append("rect")
            .attr("fill", "green")
            .attr("class", "legend-item")
            .attr("transform", `translate(${175 + legW / 5},${legH / 2 +7.5})`)
            
            legend.append("rect")
            .attr("fill", "pink")
            .attr("class", "legend-item")
            .attr("transform", `translate(${275 + legW / 5},${legH / 2 +7.5})`)

            legend.append("rect")
            .attr("fill", "yellow")
            .attr("class", "legend-item")
            .attr("transform", `translate(${365 + legW / 5},${legH / 2 +7.5})`)
            
            legend.append("rect")
            .attr("fill", "purple")
            .attr("class", "legend-item")
            .attr("transform", `translate(${475 + legW / 5},${legH / 2 +7.5})`)
            
            legend.append("rect")
            .attr("fill", "lightgreen")
            .attr("class", "legend-item")
            .attr("transform", `translate(${575 + legW / 5},${legH / 2 +7.5})`)
            
    
         
  
        
    
    })
    .catch((err)=>{
        console.log(err)
    })
    }
            


            
    



