const vlSpec_c2 = {
  "$schema": "https://vega.github.io/schema/vega-lite/v6.json",
  "title": "Number of Ratings 2016–2020 (Log Scale)",
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
      "as": ["rawGameString", "valueNum"] 
    },
    {"calculate": "split(datum.rawGameString, '=')[0]", "as": "gameName"},
    {"calculate": "parseInt(datum.valueNum)", "as": "valueNum"},
    {"calculate": "datum[datum.gameName + '=rank']", "as": "rank"},
    {"filter": "toDate(datum.date) >= toDate('2016-11-01') && toDate(datum.date) <= toDate('2020-08-31')"}
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
          "axis": {"format": "%b %y", "tickCount": {"interval": "month", "step": 3 }}
        },
        "y": {
          "field": "valueNum",
          "type": "quantitative",
          "title": "Num of Ratings",
          "scale": {"type": "log"}
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
        "x": {"field": "date", "type": "temporal", "aggregate": "max"},
        "y": {
          "field": "valueNum", 
          "type": "quantitative", 
          "aggregate": {"argmax": "date"},
          "scale": {"type": "sqrt", "domain": [1, 100000]}
        },
        "text": {"field": "gameName", "type": "nominal"},
        "color": {"field": "gameName", "type": "nominal", "legend": null}
      }
    },
    {
      "name": "symbols",
      "transform": [
        {
          "filter": {
            "field": "gameName",
            "oneOf": ["Catan", "Codenames", "Terraforming Mars", "Gloomhaven"]
          }
        },
        {"filter": "month(datum.date) % 3 == 0"}
      ],
      "mark": {"type": "circle", "size": 350, "opacity": 1},
      "encoding": {
        "x": {"field": "date", "type": "temporal"},
        "y": {
          "field": "valueNum", 
          "type": "quantitative",
          "scale": {"type": "sqrt"}
        },
        "color": {"field": "gameName", "type": "nominal", "legend": null}
      }
    },
    {
      "name": "rank_labels",
      "transform": [
        {
          "filter": {
            "field": "gameName",
            "oneOf": ["Catan", "Codenames", "Terraforming Mars", "Gloomhaven"]
          }
        },
        {"filter": "month(datum.date) % 3 == 0"}
      ],
      "mark": {"type": "text", "align": "center", "baseline": "middle", "fontSize": 10, "color": "white"},
      "encoding": {
        "x": {"field": "date", "type": "temporal"},
        "y": {
          "field": "valueNum", 
          "type": "quantitative",
          "scale": {"type": "sqrt"}
        },
        "text": {"field": "rank", "type": "nominal"}
      }
    },
    {
      "name": "legend_symbols",
      "data": {"values": [{}]},
      "mark": {"type": "circle", "size": 350, "color": "gray", "opacity": 1},
      "encoding": {
        "x": {"value": 775},
        "y": {"value": 375}
      }
    },
    {
      "name": "legend_labels",
      "data": {"values": [{}]},
      "mark": {"type": "text", "align": "center", "baseline": "middle", "fontSize": 10, "color": "white"},
      "encoding": {
        "x": {"value": 775},
        "y": {"value": 375},
        "text": {"datum": "rank"}
      }
    },
    {
      "name": "legend_title",
      "data": {"values": [{}]},
      "mark": {"type": "text", "align": "left", "baseline": "middle", "fontSize": 12, "color": "black"},
      "encoding": {
        "x": {"value": 710},
        "y": {"value": 400},
        "text": {"datum": "BoardGameGeek Rank"}
      }
    }
  ]
};

vegaEmbed('#svg-c2', vlSpec_c2, {renderer: 'svg' }).catch(console.error);

function vega_lite_spec_c2() {
  return vlSpec_c2;
}
function vega_spec_c2() {
  return vegaLite.compile(vega_lite_spec_c2()).spec;
}