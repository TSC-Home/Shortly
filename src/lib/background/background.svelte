<script lang="ts">
    import { Canvas } from '@threlte/core'
    import Scene from './Scene.svelte'
  </script>
  <div class="static bg-[#18181b] bg_dots" >
    <div class=" h-screen  ">
      <div class="absolute inset-0 flex items-center justify-center z-10">
        <div class="">
          <slot></slot>
        </div>
      </div>
      <Canvas>
        <Scene></Scene>
      </Canvas>
    </div>
  </div>
  
  <style>
    .bg_dots {
      background-image: radial-gradient(circle, #2B2B2E 1px, transparent 0.5px), radial-gradient(circle, #3C3C3C 1px, transparent 1px);
      background-size: 30px 30px; 
    }
    :root{
      background-color: #18181b;
      background-image: radial-gradient(circle, #2B2B2E 1px, transparent 0.5px), radial-gradient(circle, #3C3C3C 1px, transparent 1px);
      background-size: 30px 30px; 
    }
  </style>