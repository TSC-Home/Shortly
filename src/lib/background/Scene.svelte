<script lang="ts">
    import { T, useThrelte } from '@threlte/core'
    import { OrbitControls } from '@threlte/extras'
	import { Color } from 'three';
  
    let controls:any
    export const reset = () => controls.reset()
    
  </script>
  
  <T.PerspectiveCamera
    makeDefault
    position={[0,0,50]}
    
    lookAt.y={0.5}
    lookAt.z={0.3}


  >
    <OrbitControls enableZoom={false} enablePan={false} autoRotate={true}  />
  </T.PerspectiveCamera>
  
  <T.DirectionalLight position={[3, 10, 10]} />
  <T.HemisphereLight intensity={1} />
  

  <T.LOD let:ref={lod}>
    
      <T.Group on:create={({ref}) => {
       
      }}>
        <T.Mesh>
          <T.IcosahedronGeometry args={[20,4-3]} />
          <T.MeshStandardMaterial color={'lightblue'} wireframe />
        </T.Mesh>
      </T.Group>
      
    </T.LOD>
    