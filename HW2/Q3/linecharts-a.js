const vlSpec_a = {
  "$schema": "https://vega.github.io/schema/vega-lite/v6.json",

  // your spec goes here
  "title": "Number of Ratings 2016-2020",
  "width": 700,
  "height": 400,
  "data": {"url": "boardgame_ratings.csv"},
  "transform": [
    {
      "fold": [
        "Catan=count",
        "Dominion=count",
        "Codenames=count",
        "Terraforming Mars=count",
        "Gloomhaven=count",
        "Magic: The Gathering=count",
        "Dixit=count",
        "Monopoly=count"
      ],
      "as": ["rawGameString", "rawCountString"]
    },
    {
      "calculate": "split(datum.rawGameString, '=')[0]", 
      "as": "gameName" 
    },
    {
      "calculate": "parseInt(datum.rawCountString)", 
      "as": "countNum" 
    },
    {
      "filter": "toDate(datum.date) >= toDate('2016-11-01') && toDate(datum.date) <= toDate('2020-08-31')"
    }
  ],
  "layer": [
    {
      "name": "lines",
      "mark": "line",
      "encoding": {
        "x": {
          "field": "date",
          "type": "temporal",
          "title": "Month",
          "axis": {
            "format": "%b %y",
            "tickCount": {"interval": "month", "step": 3}
          }
        },
        "y": {
          "field": "countNum",
          "type": "quantitative",
          "title": "Num of Ratings"
        },
        "color": {
          "field": "gameName",
          "type": "nominal",
          "scale": {"scheme": "category10"},
          "legend": null
        }
      }
    },
    {
      "name": "labels",
      "mark": {"type": "text", "align": "left", "dx": 5},
      "encoding": {
        "x": {
          "field": "date",
          "type": "temporal",
          "aggregate": "max"
        },
        "y": {
          "field": "countNum",
          "type": "quantitative",
          "aggregate": {"argmax": "date"}
        },
        "text": {"field": "gameName", "type": "nominal"},
        "color": {
          "field": "gameName",
          "type": "nominal",
          "scale": {"scheme": "category10"},
          "legend": null
        }
      }
    }
  ]
};

vegaEmbed('#svg-a', vlSpec_a, { renderer: 'svg' })
  .catch(console.error);

function vega_lite_spec_a() {
  return vlSpec_a;
}
function vega_spec_a() {
  return vegaLite.compile(vega_lite_spec_a()).spec;
}
