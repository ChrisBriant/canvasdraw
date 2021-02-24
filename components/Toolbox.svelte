<script>
  import {createEventDispatcher} from 'svelte';
  import Icon from 'svelte-awesome';
  import { eraser, pencil,beer,comment } from 'svelte-awesome/icons';

  const dispatch = createEventDispatcher();
</script>

<style>
  .toolbox {
    display: flex;
    text-align: center;
  }

</style>

<div class="toolbox">
  <div
    on:click={() => {dispatch('draw')}}
  >
      <Icon
        data={pencil}
      />
  </div>
  <div
    on:click={() => {dispatch('erase')}}
  >
      <Icon
        data={eraser}
        />
  </div>
  <div
    on:click={() => {dispatch('wipeboard')}}
  >
      <Icon
        data={beer}
        />
  </div>
  <div
    on:click={() => {dispatch('redraw')}}
  >
      <Icon
        data={comment}
        />
  </div>
</div>
