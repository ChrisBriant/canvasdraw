<script>
	import { onMount } from 'svelte';
  import { picStoreActions } from '../stores/picstore';
	import Toolbox from '../components/Toolbox.svelte';

  export let width = 300;
  export let height = 200;

	let canvas;
  let m = { x: 0, y: 0, pos:'' };
  let draw = false;
	let mode = 'draw';


  $: console.log($picStoreActions);

	onMount(() => {
		const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#edeae6';
    ctx.fillRect(0, 0, width, height);
    ctx.lineWidth = 4;

	});

	const reDraw = () => {
		console.log('Redrawing');
		const ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, width, height);
		ctx.moveTo($picStoreActions[0].x,$picStoreActions[0].y);
		for(let i=0;i<$picStoreActions.length;i++) {
			if($picStoreActions[i].pos === 's') {
				ctx.beginPath();
				ctx.moveTo($picStoreActions[i].x,$picStoreActions[i]);
			} else if ($picStoreActions[i].pos === 'e') {
				ctx.closePath();
			} else {
				ctx.lineTo($picStoreActions[i].x,$picStoreActions[i].y);
				ctx.stroke();
			}
		}
	}

	const wipeBoard = () => {
		console.log('Super retarted');
		const ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, width, height);
	}

  const handleClick = (e) => {
    let ctx = e.target.getContext('2d');
		//ctx.beginPath();
    m.x = e.clientX - e.target.offsetLeft;
    m.y = e.clientY - e.target.offsetTop;
		m.pos = 's';
    console.log('Click');
    draw = true;
		ctx.beginPath();
    ctx.moveTo(m.x,m.y);
		picStoreActions.draw(m);
  }

  const handleDrag = (e) => {
		console.log('MODE', mode);
    let ctx = e.target.getContext('2d');
		m.x = e.clientX - e.target.offsetLeft;
		m.y = e.clientY - e.target.offsetTop;
		m.pos = '';
    if(draw && mode === 'draw') {
      ctx.lineTo(m.x,m.y);
      ctx.stroke();
      //Add to store
      picStoreActions.draw(m);
    } else if (draw && mode === 'erase') {
			picStoreActions.erase(m);
			//reDraw(ctx);
    }
  }

  const handleUnClick = (e) => {
		let ctx = e.target.getContext('2d');
		m.x = e.clientX - e.target.offsetLeft;
		m.y = e.clientY - e.target.offsetTop;
		m.pos = 'e';
		ctx.closePath();
		picStoreActions.draw(m);
    draw = false;
    console.log('Un Click');
  }
</script>

<style>
	canvas {

	}

	.tool-panel {
		text-align: center;
		margin:auto;
	}
</style>

<canvas
  bind:this={canvas}
  on:mousemove={(e) => handleDrag(e)}
  on:mousedown={(e) => handleClick(e)}
  on:mouseup={(e) => handleUnClick(e)}
	width={width}
	height={height}
>
</canvas>
<div class="tool-panel">
<Toolbox
	on:draw={() => {mode = 'draw'}}
	on:erase={() => {mode = 'erase'}}
	on:wipeboard={wipeBoard}
	on:redraw={reDraw}
 />
	<p>The mouse position is {m.x} x {m.y}</p>
</div>
