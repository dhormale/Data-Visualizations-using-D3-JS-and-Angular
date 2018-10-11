import {Component, NgModule, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {miserables} from './miserables';
import * as d3 from 'd3';


@Component({
    selector: 'app-miserables',
    templateUrl: './miserables.component.html',
    styleUrls: ['./miserables.component.css']
})
export class MiserablesComponent implements OnInit, AfterViewInit, OnDestroy{
  name: string;
  svg;
  color;
  simulation;
  link;
  node;
  constructor() {}
  ngOnInit() {}
  ngAfterViewInit() {
    this.svg = d3.select("svg");

    var width = +this.svg.attr("width");
    var height = +this.svg.attr("height");

    this.color = d3.scaleOrdinal(d3.schemeCategory10);
    
    this.simulation = d3.forceSimulation()
        // TODO - Fix below link
        // .force("link", d3.forceLink().id(function(d) {return d.id;}))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2));
    
    this.render(miserables);
  }
  ticked() {
    this.link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr('y2', function(d) { return d.target.y; });

    this.node
        .attr('cx', function(d) { return d.x; })
        .attr('cy', function(d) { return d.y; });
  }

  render(graph){
    this.link = this.svg.append('g')
    .attr('class', 'links')
    .selectAll('line')
    .data(graph.links)
    .enter().append('line')
      .attr('stroke-width', function(d) { return Math.sqrt(d.value); });

    this.node = this.svg.append('g')
    .attr('class', 'nodes')
    .selectAll('circle')
    .data(graph.nodes)
    .enter().append('circle')
      .attr('r', 5)
      .attr('fill', (d)=> { return this.color(d.group); })
      .call(d3.drag()
          .on('start', (d)=>{return this.dragstarted(d)})
          .on('drag', (d)=>{return this.dragged(d)})
          .on('end', (d)=>{return this.dragended(d)}));

    this.node.append('title')
      .text(function(d) { return d.id; });

    this.simulation
      .nodes(graph.nodes)
      .on('tick', ()=>{return this.ticked()});

    this.simulation.force('link')
      .links(graph.links);  
  }
  
  dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }
  
  dragended(d) {
    if (!d3.event.active) this.simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
  
  dragstarted(d) {
    if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  ngOnDestroy(){
    
  }

}