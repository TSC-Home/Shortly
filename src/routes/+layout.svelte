<script lang="ts">
	import Auth from "$lib/auth/auth.svelte";
import "../app.postcss";
import 'papercss/dist/paper.min.css';

let art: any = `.------..------..------..------.
|Z.--. ||E.--. ||R.--. ||O.--. |
| :(): || (\\/) || :(): || :/\\: |
| ()() || :/\\: || ()() || :/\\: |
| '--'Z|| '--'E|| '--'R|| '--'O|
'------''------''------''------'`;

console.info(art);

</script>

<Auth>
    <slot class="dark"></slot>
</Auth>