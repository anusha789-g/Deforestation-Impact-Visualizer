const data=[
{year:2018,region:"Amazon",loss:3.2,carbon:410,impact:72},
{year:2019,region:"Amazon",loss:3.8,carbon:470,impact:78},
{year:2020,region:"Amazon",loss:4.1,carbon:520,impact:82},
{year:2021,region:"Amazon",loss:3.6,carbon:455,impact:76},
{year:2022,region:"Amazon",loss:4.4,carbon:560,impact:86},
{year:2023,region:"Amazon",loss:4.7,carbon:590,impact:89},
{year:2018,region:"Congo",loss:1.4,carbon:165,impact:42},
{year:2019,region:"Congo",loss:1.6,carbon:185,impact:46},
{year:2020,region:"Congo",loss:1.8,carbon:205,impact:50},
{year:2021,region:"Congo",loss:1.7,carbon:198,impact:48},
{year:2022,region:"Congo",loss:2.0,carbon:230,impact:54},
{year:2023,region:"Congo",loss:2.2,carbon:250,impact:58},
{year:2018,region:"Southeast Asia",loss:2.5,carbon:300,impact:61},
{year:2019,region:"Southeast Asia",loss:2.7,carbon:325,impact:65},
{year:2020,region:"Southeast Asia",loss:2.9,carbon:345,impact:68},
{year:2021,region:"Southeast Asia",loss:2.6,carbon:315,impact:63},
{year:2022,region:"Southeast Asia",loss:3.1,carbon:370,impact:72},
{year:2023,region:"Southeast Asia",loss:3.3,carbon:395,impact:75},
{year:2018,region:"Central America",loss:0.9,carbon:105,impact:31},
{year:2019,region:"Central America",loss:1.0,carbon:115,impact:34},
{year:2020,region:"Central America",loss:1.2,carbon:140,impact:39},
{year:2021,region:"Central America",loss:1.1,carbon:130,impact:37},
{year:2022,region:"Central America",loss:1.3,carbon:150,impact:42},
{year:2023,region:"Central America",loss:1.5,carbon:175,impact:46}
];

let charts={};
const colors=['#2e7d32','#1565c0','#ef6c00','#8e24aa'];

function filtered(){
  const r=document.getElementById('region').value;
  return r==='All'?data:data.filter(x=>x.region===r);
}
function sum(a,k){return a.reduce((s,x)=>s+x[k],0)}
function groupByYear(a,k){
  const m={}; a.forEach(x=>m[x.year]=(m[x.year]||0)+x[k]); return Object.entries(m);
}
function destroy(){Object.values(charts).forEach(c=>c.destroy())}

function render(){
  const a=filtered(), years=[...new Set(a.map(x=>x.year))].sort();
  document.getElementById('forestLoss').textContent=sum(a,'loss').toFixed(1);
  document.getElementById('carbon').textContent=sum(a,'carbon').toFixed(0);
  document.getElementById('avgLoss').textContent=(sum(a,'loss')/years.length).toFixed(2);
  document.getElementById('years').textContent=years.length;
  destroy();

  charts.trend=new Chart(document.getElementById('trendChart'),{type:'line',data:{labels:years,datasets:[{label:'Forest Loss (M ha)',data:groupByYear(a,'loss').map(x=>x[1]),borderColor:colors[0],backgroundColor:'#2e7d3220',fill:true,tension:.3}]},options:{responsive:true}});
  const regions=[...new Set(a.map(x=>x.region))];
  charts.region=new Chart(document.getElementById('regionChart'),{type:'bar',data:{labels:regions,datasets:[{label:'Forest Loss (M ha)',data:regions.map(r=>sum(a.filter(x=>x.region===r),'loss')),backgroundColor:colors}]},options:{responsive:true}});
  charts.carbon=new Chart(document.getElementById('carbonChart'),{type:'line',data:{labels:years,datasets:[{label:'Carbon Emissions (Mt CO₂)',data:groupByYear(a,'carbon').map(x=>x[1]),borderColor:colors[1],tension:.3}]},options:{responsive:true}});
  const avgImpact=a.reduce((s,x)=>s+x.impact,0)/a.length;
  charts.impact=new Chart(document.getElementById('impactChart'),{type:'doughnut',data:{labels:['Impact Score','Remaining'],datasets:[{data:[avgImpact,100-avgImpact],backgroundColor:[colors[2],'#e8ece9']}]},options:{responsive:true}});
}
document.getElementById('region').addEventListener('change',render);
render();
