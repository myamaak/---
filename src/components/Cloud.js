import React, { useEffect } from 'react';
import * as d3 from 'd3';
import cloud from 'd3-cloud';

const width = 800
const height = 800

function Cloud(props) {
  useEffect(() => {
    const data = props.data;

    cloud()
      .size([width, height])
      .words(data.map(function(d) {
        return {text: d[0], size: d[1]/160, test: "haha"};
      }))
      .padding(5)
      .font("Impact")
      .fontSize(function(d) { return d.size; })
      .on("end", end)
      .start();

    function end(words) {
      d3.select("#word-cloud")
          .append("svg")
          .attr("width", 800)
          .attr("height", 800)
          .style("padding-bottom"," 10px")
        .append("g")
          .attr("transform", "translate(" + 800 / 2 + "," + 800 / 2 + ")")
        .selectAll("text")
          .data(words)
        .enter().append("text")
          .style("font-size", function(d) { return d.size + "px"; })
          .style("font-family", "Impact")
          .attr("text-anchor", "middle")
          .attr("transform", function(d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
          })
          .text(function(d) { return d.text; })
          .style("fill",function(d) { return d.size >= 25 ? '#015095' : d.size>12.5? '#0199c6': '#b1e3e9';});
    }
  })

  return (
    <div>
      <div id="word-cloud"></div>
    </div>
  )
}

export default Cloud;
