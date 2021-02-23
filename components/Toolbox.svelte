<script>
  import {createEventDispatcher} from 'svelte';
  import Icon from 'svelte-awesome';
  import { eraser, pencil } from 'svelte-awesome/icons';

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
</div>
