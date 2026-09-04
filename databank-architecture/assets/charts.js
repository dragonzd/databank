(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();

  // --- Chart: 阿里云资源用量估算 ---
  var chart1 = echarts.init(document.getElementById('chart-resources'), null, { renderer: 'svg' });
  chart1.setOption({
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true },
    legend: { data: ['开发/测试环境', '生产环境'], textStyle: { color: muted }, bottom: 0 },
    grid: { left: '3%', right: '4%', bottom: '15%', top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['ECS', 'RDS', 'Redis', 'OSS', 'SLB', 'MQ', 'Elasticsearch'],
      axisLabel: { color: muted, fontSize: 11 },
      axisLine: { lineStyle: { color: rule } }
    },
    yAxis: {
      type: 'value',
      name: '实例数',
      nameTextStyle: { color: muted },
      axisLabel: { color: muted },
      splitLine: { lineStyle: { color: rule } }
    },
    color: [accent, accent2],
    series: [
      { name: '开发/测试环境', type: 'bar', data: [3, 2, 1, 1, 1, 1, 1], barWidth: '40%' },
      { name: '生产环境', type: 'bar', data: [4, 2, 2, 2, 2, 2, 2], barWidth: '40%' }
    ]
  });
  window.addEventListener('resize', function() { chart1.resize(); });

  // --- Chart: 研发工作量分布 ---
  var chart2 = echarts.init(document.getElementById('chart-workload'), null, { renderer: 'svg' });
  chart2.setOption({
    animation: false,
    tooltip: { trigger: 'item', appendToBody: true, formatter: '{b}: {c} 人月 ({d}%)' },
    legend: { orient: 'vertical', right: '5%', top: 'center', textStyle: { color: muted } },
    color: [accent, accent2, '#38bdf8', '#818cf8', '#a78bfa', '#c084fc'],
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['40%', '50%'],
      avoidLabelOverlap: false,
      label: { show: true, position: 'outside', color: muted, fontSize: 11,
        formatter: '{b}\n{d}%' },
      emphasis: { label: { show: true, fontSize: 14, fontWeight: 'bold' } },
      data: [
        { value: 12, name: '前端开发' },
        { value: 16, name: '后端服务开发' },
        { value: 8, name: '数据层建设' },
        { value: 6, name: '安全体系建设' },
        { value: 6, name: '运维与CI/CD' },
        { value: 4, name: '测试与质量保障' }
      ]
    }]
  });
  window.addEventListener('resize', function() { chart2.resize(); });

  // --- Chart: 月度云资源成本估算 ---
  var chart3 = echarts.init(document.getElementById('chart-cost'), null, { renderer: 'svg' });
  chart3.setOption({
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true, formatter: function(p) { return p[0].name + '<br/>' + p[0].marker + ' 月费: ¥' + p[0].value.toLocaleString(); } },
    grid: { left: '3%', right: '4%', bottom: '5%', top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['ECS', 'RDS', 'Redis', 'OSS', 'SLB', 'MQ', 'ES', 'WAF', 'NAT', '其他'],
      axisLabel: { color: muted, fontSize: 10, rotate: 30 },
      axisLine: { lineStyle: { color: rule } }
    },
    yAxis: {
      type: 'value',
      name: '元/月',
      nameTextStyle: { color: muted },
      axisLabel: { color: muted, formatter: function(v) { return '¥' + (v/1000).toFixed(0) + 'k'; } },
      splitLine: { lineStyle: { color: rule } }
    },
    series: [{
      type: 'bar',
      data: [3200, 2400, 1200, 800, 600, 900, 1500, 500, 400, 300],
      barWidth: '60%',
      itemStyle: {
        color: accent,
        borderRadius: [4, 4, 0, 0]
      },
      label: { show: true, position: 'top', color: muted, fontSize: 10,
        formatter: function(p) { return '¥' + (p.value/1000).toFixed(1) + 'k'; } }
    }]
  });
  window.addEventListener('resize', function() { chart3.resize(); });
})();