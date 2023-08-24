export const DASHBOARDS = [
  {
    metadata: {
      configurationVersions: [7],
      clusterVersion: "1.269.117.20230626-160707",
    },
    id: "bbbbbbbb-a001-a017-0000-000000000001",
    dashboardMetadata: {
      name: "🏠 Dynatrace: simply smarter",
      shared: true,
      owner: "Dynatrace",
      tags: ["Configurator", "smarter"],
      preset: true,
      hasConsistentColors: false,
    },
    tiles: [
      {
        name: "Problems",
        nameSize: "small",
        tileType: "OPEN_PROBLEMS",
        configured: true,
        bounds: {
          top: 38,
          left: 0,
          width: 152,
          height: 152,
        },
        tileFilter: {},
        isAutoRefreshDisabled: false,
      },
      {
        name: "Service health",
        nameSize: "small",
        tileType: "SERVICES",
        configured: true,
        bounds: {
          top: 38,
          left: 456,
          width: 152,
          height: 152,
        },
        tileFilter: {},
        isAutoRefreshDisabled: false,
        chartVisible: true,
      },
      {
        name: "Markdown",
        tileType: "MARKDOWN",
        configured: true,
        bounds: {
          top: 228,
          left: 798,
          width: 342,
          height: 76,
        },
        tileFilter: {},
        isAutoRefreshDisabled: false,
        markdown:
          "___\n## 🔍 [Services](#dashboard/dashboard;id=bbbbbbbb-a001-a017-0001-000000000001)\n***",
      },
      {
        name: "Markdown",
        tileType: "MARKDOWN",
        configured: true,
        bounds: {
          top: 228,
          left: 418,
          width: 342,
          height: 76,
        },
        tileFilter: {},
        isAutoRefreshDisabled: false,
        markdown:
          "___\n## 🔍 [Digital experience](#dashboard;id=bbbbbbbb-a001-a017-0002-000000000001)\n___\n",
      },
      {
        name: "Markdown",
        tileType: "MARKDOWN",
        configured: true,
        bounds: {
          top: 228,
          left: 1178,
          width: 342,
          height: 76,
        },
        tileFilter: {},
        isAutoRefreshDisabled: false,
        markdown:
          "___\n## 🔍 [Infrastructure & cloud](#dashboard;id=bbbbbbbb-a001-a017-0007-000000000001)\n____\n\n",
      },
      {
        name: "Database health",
        nameSize: "small",
        tileType: "DATABASES_OVERVIEW",
        configured: true,
        bounds: {
          top: 38,
          left: 608,
          width: 152,
          height: 152,
        },
        tileFilter: {},
        isAutoRefreshDisabled: false,
        chartVisible: true,
      },
      {
        name: "Host health",
        nameSize: "small",
        tileType: "HOSTS",
        configured: true,
        bounds: {
          top: 38,
          left: 760,
          width: 152,
          height: 152,
        },
        tileFilter: {},
        isAutoRefreshDisabled: false,
        chartVisible: true,
      },
      {
        name: "Markdown",
        tileType: "MARKDOWN",
        configured: true,
        bounds: {
          top: 228,
          left: 1558,
          width: 342,
          height: 76,
        },
        tileFilter: {},
        isAutoRefreshDisabled: false,
        markdown:
          "___\n## 🔍 [Service Level Objectives](/ui/slo?slosc=name&slosd=asc&sloglobal=false&gtf=-7d&slopindx=1)\n____\n",
      },
      {
        name: "",
        nameSize: "small",
        tileType: "SYNTHETIC_TESTS",
        configured: true,
        bounds: {
          top: 38,
          left: 304,
          width: 152,
          height: 152,
        },
        tileFilter: {},
        isAutoRefreshDisabled: false,
        filterConfig: {
          type: "WEB_CHECK",
          customName: "Synthetic",
          defaultName: "Active synthetic monitor",
          chartConfig: {
            legendShown: true,
            type: "TIMESERIES",
            series: [],
            resultMetadata: {},
          },
          filtersPerEntityType: {
            WEB_CHECK: {
              WEBCHECK_STATUS: ["Active"],
            },
          },
        },
        chartVisible: true,
      },
      {
        name: "World map",
        nameSize: "small",
        tileType: "APPLICATION_WORLDMAP",
        configured: true,
        bounds: {
          top: 304,
          left: 418,
          width: 342,
          height: 304,
        },
        tileFilter: {},
        isAutoRefreshDisabled: false,
        assignedEntities: ["GEOLOCATION-0000000000000000", "WORLD"],
        metric: "APDEX",
      },
      {
        name: "Real users",
        nameSize: "small",
        tileType: "DATA_EXPLORER",
        configured: true,
        bounds: {
          top: 38,
          left: 950,
          width: 152,
          height: 152,
        },
        tileFilter: {},
        isAutoRefreshDisabled: false,
        customName: "Real users",
        queries: [
          {
            id: "A",
            spaceAggregation: "AVG",
            timeAggregation: "DEFAULT",
            splitBy: [],
            metricSelector:
              'builtin:apps.web.activeUsersEst:filter(and(eq("User type","Real users"))):splitBy():value:auto:sort(value(sum,descending)):limit(10)',
            rate: "NONE",
            enabled: true,
          },
        ],
        visualConfig: {
          type: "SINGLE_VALUE",
          global: {},
          rules: [
            {
              matcher: "A",
              properties: {
                seriesType: "LINE",
              },
              seriesOverrides: [],
            },
            {
              matcher: "A:",
              properties: {
                color: "DEFAULT",
              },
              seriesOverrides: [],
            },
          ],
          axes: {
            xAxis: {
              displayName: "",
              visible: true,
            },
            yAxes: [
              {
                displayName: "",
                visible: true,
                min: "AUTO",
                max: "AUTO",
                position: "LEFT",
                queryIds: ["A", ""],
                defaultAxis: true,
              },
            ],
          },
          heatmapSettings: {
            yAxis: "VALUE",
          },
          thresholds: [],
          tableSettings: {
            hiddenColumns: [],
          },
          graphChartSettings: {
            connectNulls: false,
          },
          honeycombSettings: {
            showHive: true,
            showLegend: true,
            showLabels: false,
          },
        },
        metricExpressions: [
          'resolution=Inf&(builtin:apps.web.activeUsersEst:filter(and(eq("User type","Real users"))):splitBy():value:auto:sort(value(sum,descending)):limit(10)):limit(100):names',
          'resolution=null&(builtin:apps.web.activeUsersEst:filter(and(eq("User type","Real users"))):splitBy():value:auto:sort(value(sum,descending)):limit(10))',
        ],
      },
      {
        name: "Request count (sum)",
        nameSize: "small",
        tileType: "DATA_EXPLORER",
        configured: true,
        bounds: {
          top: 304,
          left: 798,
          width: 342,
          height: 304,
        },
        tileFilter: {},
        isAutoRefreshDisabled: false,
        customName: "Request count (sum)",
        queries: [
          {
            id: "A",
            metric: "builtin:service.requestCount.total",
            spaceAggregation: "AVG",
            timeAggregation: "DEFAULT",
            splitBy: ["dt.entity.service"],
            filterBy: {
              nestedFilters: [],
              criteria: [],
            },
            rate: "NONE",
            enabled: true,
          },
        ],
        visualConfig: {
          type: "TOP_LIST",
          global: {},
          rules: [
            {
              matcher: "A:",
              properties: {
                color: "DEFAULT",
                seriesType: "COLUMN",
              },
              seriesOverrides: [],
            },
          ],
          axes: {
            xAxis: {
              displayName: "",
              visible: true,
            },
            yAxes: [
              {
                displayName: "",
                visible: true,
                min: "AUTO",
                max: "AUTO",
                position: "LEFT",
                queryIds: ["A"],
                defaultAxis: true,
              },
            ],
          },
          heatmapSettings: {
            yAxis: "VALUE",
          },
          thresholds: [
            {
              axisTarget: "LEFT",
              rules: [
                {
                  color: "#7dc540",
                },
                {
                  color: "#f5d30f",
                },
                {
                  color: "#dc172a",
                },
              ],
              visible: true,
            },
          ],
          tableSettings: {
            hiddenColumns: [],
          },
          graphChartSettings: {
            connectNulls: false,
          },
          honeycombSettings: {
            showHive: true,
            showLegend: true,
            showLabels: false,
          },
        },
        metricExpressions: [
          'resolution=Inf&(builtin:service.requestCount.total:splitBy("dt.entity.service"):avg:sort(value(avg,descending)):limit(20)):limit(100):names',
        ],
      },
      {
        name: "Markdown",
        tileType: "MARKDOWN",
        configured: true,
        bounds: {
          top: 228,
          left: 38,
          width: 342,
          height: 76,
        },
        tileFilter: {},
        isAutoRefreshDisabled: false,
        markdown: "___\n## 🔍 User Guide\n___\n",
      },
      {
        name: "Markdown",
        tileType: "MARKDOWN",
        configured: true,
        bounds: {
          top: 304,
          left: 38,
          width: 342,
          height: 456,
        },
        tileFilter: {},
        isAutoRefreshDisabled: false,
        markdown:
          "\n## 1) Filter your application\n \n- select a management zone based on the application\n(click on the funnel icon at the top left)\n- select the timeframe period\n\n\n## 2) Select your analyze   \n- **[Digital experience](#dashboard;id=bbbbbbbb-a001-a017-0002-000000000001)** :     \n=> user experience analysis measured from browser or mobile   device\n- **[Services](#dashboard/dashboard;id=bbbbbbbb-a001-a017-0001-000000000001)** :   \n=> full stack analysis of the distributed traces\n- **[Infrastructure & cloud](#dashboard;id=bbbbbbbb-a001-a017-0007-000000000001)** :   \n=> process, hosts & cloud\n- **[Service Level Objectives](/ui/slo?slosc=name&slosd=asc&sloglobal=false&gtf=-7d%20to%20now)** :   \n=> slo based on management zone \n\nclick [here](https://github.com/dynatrace-ace-services/itsm-integration-with-slo/tree/main/monaco-template) to create applications and SLOs alerts based on management zone\n",
      },
      {
        name: "Markdown",
        tileType: "MARKDOWN",
        configured: true,
        bounds: {
          top: 304,
          left: 1558,
          width: 342,
          height: 114,
        },
        tileFilter: {},
        isAutoRefreshDisabled: false,
        markdown:
          "\n## - [SLO Simply Smarter ](#dashboard;id=bbbbbbbb-a001-a017-0008-000000000001)\nboost the quality of your applications and the services by driving them with the SLOs  \n\n\n\n\n \n\n\n\n \n",
      },
      {
        name: "Markdown",
        tileType: "MARKDOWN",
        configured: true,
        bounds: {
          top: 570,
          left: 1634,
          width: 266,
          height: 76,
        },
        tileFilter: {},
        isAutoRefreshDisabled: false,
        markdown:
          "click [here](https://github.com/dynatrace-ace-services/slo-simply-smarter/blob/main/README.md)  to import slo template",
      },
      {
        name: "Markdown",
        tileType: "MARKDOWN",
        configured: true,
        bounds: {
          top: 418,
          left: 1558,
          width: 342,
          height: 152,
        },
        tileFilter: {},
        isAutoRefreshDisabled: false,
        markdown:
          "## - [SLO Resource Optimization](#dashboard;id=bbbbbbbb-a001-a017-0009-000000000001)\n\noptimize the resource consumption with these SLOs, first step to reduce the cost of your infrastructure and improve your CO2 footprint ",
      },
      {
        name: "",
        nameSize: "small",
        tileType: "APPLICATIONS",
        configured: true,
        bounds: {
          top: 38,
          left: 152,
          width: 152,
          height: 152,
        },
        tileFilter: {},
        isAutoRefreshDisabled: false,
        filterConfig: {
          type: "APPLICATION",
          customName: "Applications",
          defaultName: "Monitored applications",
          chartConfig: {
            legendShown: true,
            type: "TIMESERIES",
            series: [],
            resultMetadata: {},
          },
          filtersPerEntityType: {
            APPLICATION: {
              APPLICATION_STATUS: ["0"],
            },
          },
        },
        chartVisible: true,
      },
      {
        name: "Smartscape",
        nameSize: "small",
        tileType: "PURE_MODEL",
        configured: true,
        bounds: {
          top: 38,
          left: 1634,
          width: 304,
          height: 152,
        },
        tileFilter: {},
        isAutoRefreshDisabled: false,
      },
      {
        name: "Vulnerabilities (last value)",
        nameSize: "small",
        tileType: "DATA_EXPLORER",
        configured: true,
        bounds: {
          top: 38,
          left: 1368,
          width: 266,
          height: 152,
        },
        tileFilter: {},
        isAutoRefreshDisabled: false,
        customName: "Data explorer results",
        queries: [
          {
            id: "A",
            metric: "builtin:security.vulnerabilities.countAffectedEntities",
            spaceAggregation: "COUNT",
            timeAggregation: "DEFAULT",
            splitBy: ["Risk Level"],
            filterBy: {
              nestedFilters: [],
              criteria: [],
            },
            rate: "NONE",
            enabled: true,
          },
        ],
        visualConfig: {
          type: "PIE_CHART",
          global: {
            hideLegend: false,
          },
          rules: [
            {
              matcher: "A:",
              unitTransform: "auto",
              valueFormat: "auto",
              properties: {
                color: "DEFAULT",
                seriesType: "LINE",
              },
              seriesOverrides: [
                {
                  name: "CRITICAL",
                  color: "#dc172a",
                },
                {
                  name: "HIGH",
                  color: "#fd8232",
                },
                {
                  name: "MEDIUM",
                  color: "#f5d30f",
                },
                {
                  name: "LOW",
                  color: "#fff9d5",
                },
              ],
            },
          ],
          axes: {
            xAxis: {
              visible: true,
            },
            yAxes: [],
          },
          heatmapSettings: {
            yAxis: "VALUE",
            showLabels: false,
          },
          thresholds: [
            {
              axisTarget: "LEFT",
              columnId: "Vulnerabilities - affected entities count",
              rules: [
                {
                  color: "#7dc540",
                },
                {
                  color: "#f5d30f",
                },
                {
                  color: "#dc172a",
                },
              ],
              queryId: "A",
              visible: true,
            },
          ],
          tableSettings: {
            isThresholdBackgroundAppliedToCell: false,
            hiddenColumns: [],
          },
          graphChartSettings: {
            connectNulls: false,
          },
          honeycombSettings: {
            showHive: true,
            showLegend: true,
            showLabels: false,
          },
        },
        queriesSettings: {
          resolution: "",
          foldTransformation: "LAST_VALUE",
        },
        metricExpressions: [
          'resolution=null&(builtin:security.vulnerabilities.countAffectedEntities:splitBy("Risk Level"):count:sort(value(avg,descending)):limit(20)):limit(100):names:last',
        ],
      },
      {
        name: "Markdown",
        tileType: "MARKDOWN",
        configured: true,
        bounds: {
          top: 0,
          left: 1406,
          width: 190,
          height: 38,
        },
        tileFilter: {},
        isAutoRefreshDisabled: false,
        markdown: "## 🚨 [AppSec](/ui/security/vulnerabilities)",
      },
      {
        name: "Markdown",
        tileType: "MARKDOWN",
        configured: true,
        bounds: {
          top: 0,
          left: 1672,
          width: 190,
          height: 38,
        },
        tileFilter: {},
        isAutoRefreshDisabled: false,
        markdown: "## ➵ [Smartscape](#smartscape)",
      },
      {
        name: "Markdown",
        tileType: "MARKDOWN",
        configured: true,
        bounds: {
          top: 0,
          left: 988,
          width: 304,
          height: 38,
        },
        tileFilter: {},
        isAutoRefreshDisabled: false,
        markdown: "## 👨‍💼 [Users & users actions](/ui/user-sessions)",
      },
      {
        name: "Markdown",
        tileType: "MARKDOWN",
        configured: true,
        bounds: {
          top: 0,
          left: 380,
          width: 304,
          height: 38,
        },
        tileFilter: {},
        isAutoRefreshDisabled: false,
        markdown: "## 🚦[Health](/ui/problems)",
      },
      {
        name: "CPU usage %",
        nameSize: "small",
        tileType: "DATA_EXPLORER",
        configured: true,
        bounds: {
          top: 304,
          left: 1178,
          width: 342,
          height: 304,
        },
        tileFilter: {},
        isAutoRefreshDisabled: false,
        customName: "CPU usage %",
        queries: [
          {
            id: "A",
            metric: "builtin:host.cpu.usage",
            spaceAggregation: "AVG",
            timeAggregation: "DEFAULT",
            splitBy: ["dt.entity.host"],
            sortBy: "DESC",
            filterBy: {
              nestedFilters: [],
              criteria: [],
            },
            limit: 10,
            rate: "NONE",
            enabled: true,
          },
        ],
        visualConfig: {
          type: "TOP_LIST",
          global: {
            hideLegend: false,
          },
          rules: [
            {
              matcher: "A:",
              properties: {
                color: "DEFAULT",
              },
              seriesOverrides: [],
            },
          ],
          axes: {
            xAxis: {
              visible: true,
            },
            yAxes: [],
          },
          heatmapSettings: {
            yAxis: "VALUE",
          },
          thresholds: [
            {
              axisTarget: "LEFT",
              columnId: "CPU idle",
              rules: [
                {
                  color: "#7dc540",
                },
                {
                  color: "#f5d30f",
                },
                {
                  color: "#dc172a",
                },
              ],
              queryId: "A",
              visible: false,
            },
          ],
          tableSettings: {
            isThresholdBackgroundAppliedToCell: false,
            hiddenColumns: [],
          },
          graphChartSettings: {
            connectNulls: false,
          },
          honeycombSettings: {
            showHive: true,
            showLegend: true,
            showLabels: false,
          },
        },
        queriesSettings: {
          resolution: "",
          foldTransformation: "TOTAL",
          foldAggregation: "AVG",
        },
        metricExpressions: [
          'resolution=null&(builtin:host.cpu.usage:splitBy("dt.entity.host"):avg:sort(value(avg,descending)):limit(10)):limit(100):names:fold(avg)',
        ],
      },
      {
        name: "ApdexCategory",
        nameSize: "small",
        tileType: "DATA_EXPLORER",
        configured: true,
        bounds: {
          top: 38,
          left: 1102,
          width: 266,
          height: 152,
        },
        tileFilter: {},
        isAutoRefreshDisabled: false,
        customName: "ApdexCategory",
        queries: [
          {
            id: "A",
            spaceAggregation: "AVG",
            timeAggregation: "DEFAULT",
            splitBy: ["Apdex category"],
            metricSelector:
              '(builtin:apps.web.actionCount.category:splitBy("Apdex category"):default(0) + builtin:apps.other.uaCount.osAndApdex:splitBy("Apdex category"):default(0)):value:auto:sort(value(sum,descending)):limit(10) ',
            rate: "NONE",
            enabled: true,
          },
        ],
        visualConfig: {
          type: "TOP_LIST",
          global: {
            hideLegend: false,
          },
          rules: [
            {
              matcher: "A:",
              unitTransform: "auto",
              valueFormat: "auto",
              properties: {
                color: "DEFAULT",
                seriesType: "STACKED_AREA",
              },
              seriesOverrides: [
                {
                  name: "SATISFIED",
                  color: "#008000",
                },
                {
                  name: "TOLERATING",
                  color: "#f5d30f",
                },
                {
                  name: "FRUSTRATED",
                  color: "#FF0000",
                },
              ],
            },
          ],
          axes: {
            xAxis: {
              visible: true,
            },
            yAxes: [],
          },
          heatmapSettings: {
            yAxis: "VALUE",
          },
          thresholds: [
            {
              axisTarget: "LEFT",
              rules: [
                {
                  color: "#7dc540",
                },
                {
                  color: "#f5d30f",
                },
                {
                  color: "#dc172a",
                },
              ],
              queryId: "",
              visible: true,
            },
          ],
          tableSettings: {
            isThresholdBackgroundAppliedToCell: false,
            hiddenColumns: [],
          },
          graphChartSettings: {
            connectNulls: false,
          },
          honeycombSettings: {
            showHive: true,
            showLegend: true,
            showLabels: false,
          },
        },
        queriesSettings: {
          resolution: "",
          foldTransformation: "TOTAL",
          foldAggregation: "SUM",
        },
        metricExpressions: [
          'resolution=null&((builtin:apps.web.actionCount.category:splitBy("Apdex category"):default(0)+builtin:apps.other.uaCount.osAndApdex:splitBy("Apdex category"):default(0)):value:auto:sort(value(sum,descending)):limit(10)):limit(100):names:fold(sum)',
        ],
      },
    ],
  },
];
