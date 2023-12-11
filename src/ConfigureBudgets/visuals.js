import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

function Visuals() {
  const [dataSource, setDataSource] = useState({
    datasets: [
      {
        budget: [],
        expense: [],
        backgroundColor: [],
      },
    ],
    labels1: [],
    labels2: [],
  });

  const [dataLoaded, setDataLoaded] = useState(false);
  const [dataExists, setDataExists] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [months, setMonths] = useState([
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]);

  function getRandomColor(previousColors) {
    const letters = '0123456789ABCDEF';
    let color;

    do {
      color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
    } while (previousColors.includes(color));

    return color;
  }



  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (selectedMonth) {
      axios
        .get(`http://localhost:3002/get-budgets/${userId}?month=${selectedMonth}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(function (res) {
          if (res.data && res.data.length > 0) {
            const updateData = { ...dataSource };
            for (var i = 0; i < res.data.length; i++) {
              updateData.datasets[0].budget[i] = res.data[i].budget;
              updateData.datasets[0].backgroundColor[i] = getRandomColor(dataSource.datasets[0].backgroundColor);
              updateData.labels1[i] = res.data[i].category;
            }
            setDataSource(updateData);
            setDataExists(true);
            setDataLoaded(true);
          } else {
            setDataExists(false);
            setDataLoaded(true);
          }
        });
    }
  }, [selectedMonth]);

  useEffect(()=>{
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (selectedMonth) {
      axios
        .get(`http://localhost:3002/get-expenses/${userId}?month=${selectedMonth}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(function (res) {
          if (res.data && res.data.length > 0) {
            const updateExpenses = { ...dataSource };
            for (var i = 0; i < res.data.length; i++) {
              updateExpenses.datasets[0].expense[i] = res.data[i].expense;
              updateExpenses.datasets[0].backgroundColor[i] = getRandomColor(dataSource.datasets[0].backgroundColor);
              updateExpenses.labels2[i] = res.data[i].category;
            }
            setDataSource(updateExpenses);
            setDataExists(true);
            setDataLoaded(true);
          } else {
            setDataExists(false);
            setDataLoaded(true);
          }
        });
    }
   
  },[selectedMonth])

  
  const createPolarareaChart = (chartRef, data, labels) => {
    if (chartRef.current) {
      const chart = new Chart(chartRef.current, {
        type: 'polarArea',
        data: {
          datasets: [
            {
              data: data,
              backgroundColor: dataSource.datasets[0].backgroundColor,
            },
          ],
          labels: labels,
        },
      });

      return () => {
        chart.destroy();
      };
    }
  };

  const createGroupedBarChart = (chartRef, labels, budget, expenses) => {
    if (chartRef.current) {
      const chart = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Budget',
              data: budget,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
            {
              label: 'Expense',
              data: expenses,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            x: {
              stacked: false,
            },
            y: {
              stacked: false,
            },
          },
        },
      });

      return () => {
        chart.destroy();
      };
    }
  };

  const createRadarChart = (chartRef, labels, budget, expenses) => {
    if (chartRef.current) {
      const chart = new Chart(chartRef.current, {
        type: 'radar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Budget',
              data: budget,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
            {
              label: 'Expenses',
              data: expenses,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
          ],
        },
      });

      return () => {
        chart.destroy();
      };
    }
  };


  // const createdonutChart = (chartRef, data, labels) => {
  //   if (chartRef.current) {
  //     const chart = new Chart(chartRef.current, {
  //       type: 'doughnut',
  //       data: {
  //         datasets: [
  //           {
  //             data: data,
  //             backgroundColor: dataSource.datasets[0].backgroundColor,
  //           },
  //         ],
  //         labels: labels,
  //       },
  //     });

  //     return () => {
  //       chart.destroy();
  //     };
  //   }
  // };

  const createChart = (chartRef, labels, budget, expenses) => {
    if (chartRef.current) {
      const chart = new Chart(chartRef.current, {
        
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Budget',
              type:'bar',
              data: budget,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
            {
              label: 'Expenses',
              type:'line',
              data: expenses,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
          ],
        },
      });

      return () => {
        chart.destroy();
      };
    }
  };




  const chartRef = useRef(null);
  const expenseRef = useRef(null);
  const chart1Ref = useRef(null);
  const chart2Ref = useRef(null);
  const chart3Ref = useRef(null);
  const chart4Ref = useRef(null);
  const chart5Ref = useRef(null);
  

  useEffect(() => createPolarareaChart(chartRef, dataSource.datasets[0].budget, dataSource.labels1), [dataSource]);
  useEffect(() => createPolarareaChart(expenseRef, dataSource.datasets[0].expense, dataSource.labels2), [dataSource]);
  useEffect(() => createGroupedBarChart(chart1Ref, dataSource.labels1, dataSource.datasets[0].budget, dataSource.datasets[0].expense), [dataSource]);
  useEffect(() => createRadarChart(chart2Ref, dataSource.labels1, dataSource.datasets[0].budget, dataSource.datasets[0].expense), [dataSource]);
  // useEffect(() => createdonutChart(chart3Ref,  dataSource.datasets[0].budget,dataSource.labels1,), [dataSource]);
  // useEffect(() => createdonutChart(chart4Ref,  dataSource.datasets[0].expense,dataSource.labels1,), [dataSource]);
  useEffect(() => createChart(chart5Ref, dataSource.labels1, dataSource.datasets[0].budget, dataSource.datasets[0].expense), [dataSource]);
  
  return (
    <main className="center" id="main" aria-label="main">
      <div>
        <label htmlFor="months">Select Month:</label>
        <select id="months" onChange={(e) => setSelectedMonth(e.target.value)} value={selectedMonth}>
          <option value="">Select Month</option>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      {dataLoaded ? (
             dataExists ? (
              <section>
      <section className="chart-container">
        <article className="chart">
          <h1>polarArea Chart - Budget</h1>
          <p>
            <canvas ref={chartRef} />
          </p>
        </article>
        <article className="chart">
          <h1>polarArea Chart - Expenses</h1>
          <p>
            <canvas ref={expenseRef} />
          </p>
        </article>
        <article className="chart">
          <h1>Grouped Bar Chart</h1>
          <p>
            <canvas ref={chart1Ref} />
          </p>
        </article>
        <article className="chart">
          <h1>Radar Chart</h1>
          <p>
            <canvas ref={chart2Ref} />
          </p>
        </article>
       
      </section>
     
       <section className="chart-container">
       {/* <article className="chart">
          <h1>Donught Chart- Budgets</h1>
          <p>
            <canvas ref={chart3Ref} />
          </p>
        </article>
       <article className="chart">
         <h1>Donught Chart - Expenses</h1>
         <p>
           <canvas ref={chart4Ref} />
         </p>
       </article> */}
       <article className="chart">
         <h1>combo Chart - Expenses</h1>
         <p>
           <canvas ref={chart5Ref} />
         </p>
       </article>
       </section>
       </section>
     
       ) : (
        <div>
          <p>Data is not present. Please enter the data.</p>
        </div>
       )
         
       ) : (
        <div>
          <p>Loading...</p>
        </div>
      )}
    </main>
  );
}

export default Visuals;
