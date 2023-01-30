<script lang="ts">
	import { getSortAnimations } from '../helpers/animationsHelper';

	const array = Array.from(Array(10).keys(), (_) => Math.floor(Math.random() * 25 + 5));

	// let array = [5, 1, 3, 10];

	function sortMerge() {
		const [sortedArray, animations] = getSortAnimations(array);

		console.log(sortedArray);
		console.log(animations);
	}

	// function setBlockColor(action: Action, index: number) {
	// 	array = array.map((x) => {
	// 		x.bgColor = 'black';
	// 		return x;
	// 	});
	// 	array[index].bgColor = action.bgColor;
	// }
</script>

<button on:click={sortMerge}>Merge sort</button>
<div class="flex flex-row items-end absolute bottom-0 w-10/12 mx-20">
	{#each array as item}
		<div
			class="bg-black text-white align-bottom flex-1 min-w-[1px] mr-2 text-xs rounded-t-lg"
			style="height: {10 * item}px;"
		>
			<p class="text-center pt-5">{item}</p>
		</div>
	{/each}
</div>
