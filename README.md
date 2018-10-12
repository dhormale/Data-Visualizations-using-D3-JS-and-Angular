# Dynamic, interactive Data Visualizations using D3 JS and Angular

https://medium.com/@dhormale/dynamic-interactive-data-visualizations-using-d3-js-and-angular-41770d7c66f7

D3.js is a JavaScript library for producing dynamic, interactive data visualizations in web browsers. It makes use of the widely implemented SVG, HTML5, and CSS standards.

## Demo: https://dhormale.github.io/Data-Visualizations-using-D3-JS-and-Angular/


Below is high level 5 steps to get basic D3.JS graph going using Angular 6

## Step 1: Install d3 and type declaration

npm install d3 --save
npm install --save @types/d3

## Step 2: Generate/retrieve chart data (In demo it’s random data as below)

generateData() {
   this.chartData = [];
   for (let i = 0; i < (8 + Math.floor(Math.random() * 10)); i++) {
   this.chartData.push([
   `Index ${i}`,
   Math.floor(Math.random() * 100)
   ]);
  }
}

## Step 3: Pass chart data to shared component which we are creating in step 4.

<app-barchart *ngIf="chartData" [data]="chartData"></app-barchart>

## Step 4: Create shared component like “barchart.component”. In html add div like below.

<div class="d3-chart" #chart></div>

## Step 5-A: Access #chart element using ViewChild

@ViewChild('chart') private chartContainer: ElementRef;

### Step 5-B: On init create chart and append SVG

let element = this.chartContainer.nativeElement;
let svg = d3.select(element).append('svg')
   .attr('width', element.offsetWidth)
   .attr('height', element.offsetHeight);

### Step 5-C: Chart plot area

this.chart = svg.append('g').attr('class', 'bars')

### Step 5-D: Define X and Y, Create Scale, Add colors

Example file below shows Step 5 in detail. Also it also has updateChart() method if underneath data changes.

