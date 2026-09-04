(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();

  // --- Chart: Roadmap User Growth ---
  var chart1 = echarts.init(document.getElementById('chart-roadmap'), null, { renderer: 'svg' });
  var option1 = {
    tooltip: {
      trigger: 'axis',
      formatter: '{b}<br/>{a}: {c} 万人',
      appendToBody: true
    },
    grid: {
      left: '10%',
      right: '10%',
      bottom: '15%',
      top: '15%'
    },
    xAxis: {
      type: 'category',
      data: ['Year 1-2', 'Year 3-4', 'Year 5-7', 'Year 8-15'],
      axisLabel: {
        color: ink
      },
      axisLine: {
        lineStyle: {
          color: rule
        }
      }
    },
    yAxis: {
      type: 'value',
      name: '用户数量（万人）',
      nameTextStyle: {
        color: muted
      },
      axisLabel: {
        color: muted
      },
      axisLine: {
        lineStyle: {
          color: rule
        }
      },
      splitLine: {
        lineStyle: {
          color: rule
        }
      }
    },
    series: [{
      name: '目标用户',
      type: 'bar',
      data: [10, 200, 1000, 5000],
      itemStyle: {
        color: accent
      },
      label: {
        show: true,
        position: 'top',
        color: ink,
        formatter: '{c}万'
      }
    }],
    animation: false
  };
  chart1.setOption(option1);
  window.addEventListener('resize', function() { chart1.resize(); });

})();
