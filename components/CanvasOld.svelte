<script>
  import { Canvas, Layer, t } from "svelte-canvas";

  let m = { x: 0, y: 0 };

  $: render = ({ context, width, height }) => {
    context.fillStyle = 'blue';
    context.fillRect(0, 0, width, height);

    // context.fillStyle = `hsl(${$t / 40}, 100%, 50%)`;
    // context.beginPath();
    // context.arc(($t / 4) % width, ($t / 4) % height, 100, 0, Math.PI * 2);
    // context.fill();
  };


  const handleClick = () => {
    console.log('Click');
  }

  const handleDrag = (e) => {
    m.x = event.clientX - e.target.offsetLeft;
    m.y = event.clientY - e.target.offsetTop;

  }

  const handleUnClick = () => {
    console.log('Un Click');
  }
</script>

<style>

</style>

<div >
  <Canvas
    on:mousemove={(e) => handleDrag(e)}
    on:mousedown={() => handleClick()}
    on:mouseup={() => handleUnClick()}
    width={200}
    height={150}>
    <Layer {render} />
  </Canvas>
  <p>The mouse position is {m.x} x {m.y}</p>
</div>
