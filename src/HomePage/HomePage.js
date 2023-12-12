import React, { useEffect, useRef,useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto'
import * as d3 from 'd3';

function HomePage() {
    const [dataSource, setDataSource] = useState({
        datasets: [
          {
            data: [],
            backgroundColor: [
              '#ffd700', 
              '#ff6b81', 
              '#4ea8e0', 
              '#ff8c00', 
               '#da70d6', 
               '#00ff7f', 
               '#556b2f',
            ],
          },
        ],
        labels: [],
      });

       useEffect(() => {
    axios.get('http://174.138.56.121:3002/budget').then(function (res) {
      const updateData = { ...dataSource }; 
      for (var i = 0; i < res.data.myBudget.length; i++) {
        updateData.datasets[0].data[i] = res.data.myBudget[i].budget;
        updateData.labels[i] = res.data.myBudget[i].title;
      }

      setDataSource(updateData);
    });
  }, []);
      const chartRef = useRef(null);
      const svgRef = useRef(null)

      useEffect(() => {
        if (chartRef.current ) {
          const chart = new Chart(chartRef.current, {
            type: 'pie',
            data: dataSource,
          });
    
          return () => {
            chart.destroy();
          };
        }
      }, [dataSource]);
    
      useEffect(() => {
        if (svgRef.current ) {
         
          const width = 300;
          const height = 300;
          const radius = Math.min(width, height) / 2;
    
          const svg = d3.select(svgRef.current).attr('width', width).attr('height', height);
          const g = svg.append('g').attr('transform', `translate(${width / 2},${height / 2})`);
    
          const color = d3.scaleOrdinal(d3.schemeCategory10);
    
          const pie = d3.pie().value((d) => d);
    
          const path = d3.arc().outerRadius(radius - 10).innerRadius(0);
    
          const arc = g.selectAll('.arc').data(pie(dataSource.datasets[0].data)).enter().append('g').attr('class', 'arc');
    
          arc
            .append('path')
            .attr('d', path)
            .attr('fill', (d, i) => color(i))
            .attr('stroke', 'white')
            .style('stroke-width', '2px');
    
          arc
            .append('text')
            .attr('transform', (d) => `translate(${path.centroid(d)})`)
            .attr('dy', '0.35em')
            .text((d, i) => dataSource.labels[i]);
        }
      }, [dataSource]);
        
    
    return (
        <main  className="center" id="main" aria-label="main">
            
                <div className="page-area">    
                    <article>
                    <h1>Stay on track</h1>
                    <p>
                        Do you know where you are spending your money? If you really stop to track it down,
                        you would get surprised! Proper budget management depends on real data... and this
                        app will help you with that!
                    </p>
                </article>
                
        
                
                <article>
                    <h1>Alerts</h1>
                    <p>
                        What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                    </p>
                </article>
                
        
                
                <article>
                    <h1>Results</h1>
                    <p>
                        People who stick to a financial plan, budgeting every expense, get out of debt faster!
                        Also, they to live happier lives... since they expend without guilt or fear... 
                        because they know it is all good and accounted for.
                    </p>
                </article>
                
        
                
    
                <article>
                    
                    <h1>Free</h1>
                    <p>
                        This app is free!!! And you are the only one holding your data!
                    </p>
                </article>
                
        
                <article>
                    <h1>Stay on track</h1>
                    <p>
                        Do you know where you are spending your money? If you really stop to track it down,
                        you would get surprised! Proper budget management depends on real data... and this
                        app will help you with that!
                    </p>
                </article>
                
               
                
                <article>
                    <h1>Alerts</h1>
                    <p>
                        What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                    </p>
                </article>
                
        
               
                <article>
                    <h1>Results</h1>
                    <p>
                        People who stick to a financial plan, budgeting every expense, get out of debt faster!
                        Also, they to live happier lives... since they expend without guilt or fear... 
                        because they know it is all good and accounted for.
                    </p>
                </article>
                
           <article>
                
                    <h1>Free</h1>
                    <p>
                        This app is free!!! And you are the only one holding your data!
                    </p>
                
            </article>
            <section className="chart-container">
            <article className="chart">
                <h1>Chart</h1>
                    <p>
                        <canvas ref={chartRef} />
                    </p>
             
            </article>
    
            <article className="chart">
                <h1>D3JS Chart</h1>
                <svg ref={svgRef}></svg>
                
                
            </article>
        </section>       
        </div>  
        </main>
        
     

    );
    
  }
  
  export default HomePage;