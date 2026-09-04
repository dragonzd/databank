// 图6：系统模块分阶段交付甘特图
(function () {
  var dom = document.getElementById('chart-gantt');
  if (!dom) return;

  var chart = echarts.init(dom);

  // ========== 分阶段交付数据 ==========
  // 四个阶段，每个阶段包含若干模块
  var phases = [
    {
      name: 'MVP 基础网',
      start: 1,
      end: 12,
      color: '#38bdf8',
      colorBg: 'rgba(56,189,248,0.12)',
      modules: [
        '联盟链网络搭建',
        '协议账户核心合约',
        '边缘 SDK v0.1',
        'Token 发行与结算',
        '鉴权方准入模块',
        '基础管理后台'
      ]
    },
    {
      name: '产品化网络扩张',
      start: 13,
      end: 36,
      color: '#a78bfa',
      colorBg: 'rgba(167,139,250,0.12)',
      modules: [
        'TEE 隐私计算上线',
        '数据理财/贷款引擎',
        '入表服务工具',
        '隐私索引服务',
        '用户门户 Web/App',
        '开放 API 平台'
      ]
    },
    {
      name: '标准化生态确立',
      start: 37,
      end: 72,
      color: '#34d399',
      colorBg: 'rgba(52,211,153,0.12)',
      modules: [
        '数据交易所上线',
        '跨链互操作协议',
        'MPC 联邦学习平台',
        '衍生品交易模块',
        '全球多区域部署',
        'RWA 项目管理平台'
      ]
    },
    {
      name: '基础设施化',
      start: 73,
      end: 144,
      color: '#f472b6',
      colorBg: 'rgba(244,114,182,0.12)',
      modules: [
        '设备原生集成 SDK',
        '全球数据资产网络',
        '协议标准化输出',
        'AI 自动化运营',
        '自主运维平台'
      ]
    }
  ];

  // 构建所有模块的扁平列表（yAxis 类别）
  var allModules = [];
  var seriesData = [];

  phases.forEach(function (phase) {
    phase.modules.forEach(function (mod) {
      allModules.push(mod);
      seriesData.push({
        name: mod,
        value: [phase.start, phase.end],
        itemStyle: { color: phase.color }
      });
    });
  });

  // ========== 甘特图配置 ==========
  var option = {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(15,23,42,0.95)',
      borderColor: 'rgba(56,189,248,0.3)',
      textStyle: { color: '#e2e8f0', fontSize: 12 },
      formatter: function (params) {
        var d = params.data.value;
        var y = Math.floor((d[0] - 1) / 12) + 1;
        var sm = ((d[0] - 1) % 12) + 1;
        var ey = Math.floor((d[1] - 1) / 12) + 1;
        var em = ((d[1] - 1) % 12) + 1;
        return '<strong>' + params.name + '</strong><br/>' +
          'Y' + y + ' M' + sm + ' — Y' + ey + ' M' + em +
          '<br/>周期: ' + (d[1] - d[0] + 1) + ' 个月';
      }
    },
    grid: {
      left: 180,
      right: 40,
      top: 30,
      bottom: 50
    },
    xAxis: {
      type: 'value',
      min: 0,
      max: 150,
      interval: 12,
      axisLabel: {
        color: '#94a3b8',
        fontSize: 11,
        formatter: function (v) {
          if (v === 0) return 'M0';
          var y = Math.floor((v - 1) / 12) + 1;
          return 'Y' + y;
        }
      },
      axisLine: { lineStyle: { color: 'rgba(148,163,184,0.25)' } },
      axisTick: { show: false },
      splitLine: {
        show: true,
        lineStyle: { color: 'rgba(148,163,184,0.1)', type: 'dashed' }
      },
      name: '时间线（月）',
      nameTextStyle: { color: '#64748b', fontSize: 11 }
    },
    yAxis: {
      type: 'category',
      data: allModules,
      axisLabel: {
        color: '#cbd5e1',
        fontSize: 11
      },
      axisLine: { lineStyle: { color: 'rgba(148,163,184,0.25)' } },
      axisTick: { show: false },
      inverse: true
    },
    series: [
      {
        type: 'custom',
        renderItem: function (params, api) {
          var catIdx = api.value(0);
          var startVal = api.value(1);
          var endVal = api.value(2);
          var startPos = api.coord([startVal, catIdx]);
          var endPos = api.coord([endVal, catIdx]);
          var height = api.size([0, 1])[1] * 0.5;
          var y = startPos[1] - height / 2;

          var phase = null;
          for (var p = 0; p < phases.length; p++) {
            if (phases[p].modules.indexOf(allModules[catIdx]) !== -1) {
              phase = phases[p];
              break;
            }
          }
          var barColor = phase ? phase.color : '#38bdf8';
          var barColorBg = phase ? phase.colorBg : 'rgba(56,189,248,0.12)';

          return {
            type: 'group',
            children: [
              // 背景条（浅色）
              {
                type: 'rect',
                shape: {
                  x: startPos[0],
                  y: y,
                  width: Math.max(endPos[0] - startPos[0], 4),
                  height: height
                },
                style: api.style({
                  fill: barColorBg
                })
              },
              // 前景条（实色，带圆角效果）
              {
                type: 'rect',
                shape: {
                  x: startPos[0],
                  y: y,
                  width: Math.max(endPos[0] - startPos[0], 4),
                  height: height
                },
                style: api.style({
                  fill: barColor,
                  opacity: 0.85
                })
              }
            ]
          };
        },
        encode: { x: [1, 2], y: 0 },
        data: allModules.map(function (mod, i) {
          return {
            name: mod,
            value: [i, seriesData[i].value[0], seriesData[i].value[1]],
            itemStyle: { color: seriesData[i].itemStyle.color }
          };
        }),
        markArea: {
          silent: true,
          data: [
            [
              { xAxis: 1, itemStyle: { color: 'rgba(56,189,248,0.06)' }, label: { show: false } },
              { xAxis: 12, itemStyle: { color: 'rgba(56,189,248,0.06)' } }
            ],
            [
              { xAxis: 13, itemStyle: { color: 'rgba(167,139,250,0.06)' }, label: { show: false } },
              { xAxis: 36, itemStyle: { color: 'rgba(167,139,250,0.06)' } }
            ],
            [
              { xAxis: 37, itemStyle: { color: 'rgba(52,211,153,0.06)' }, label: { show: false } },
              { xAxis: 72, itemStyle: { color: 'rgba(52,211,153,0.06)' } }
            ],
            [
              { xAxis: 73, itemStyle: { color: 'rgba(244,114,182,0.06)' }, label: { show: false } },
              { xAxis: 144, itemStyle: { color: 'rgba(244,114,182,0.06)' } }
            ]
          ]
        }
      }
    ]
  };

  chart.setOption(option);

  // ========== 响应式 ==========
  window.addEventListener('resize', function () {
    chart.resize();
  });
})();