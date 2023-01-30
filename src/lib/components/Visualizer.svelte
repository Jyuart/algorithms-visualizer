<script lang="ts">
	import type { Action } from '$lib/interfaces/action';
	import { getSortAnimations } from '../helpers/actionsHelper';
	import type { Item } from '../interfaces/item';

	// const array: Item[] = Array.from(Array(4).keys()).map(
	// 	(x) => ({ value: Math.floor(Math.random() * 45 + 5), index: x } as Item)
	// );

	let array: Item[] = [
		{ mb: 0, value: 5, index: 0, key: 0 },
		{ mb: 0, value: 1, index: 1, key: 1 },
		{ mb: 0, value: 10, index: 2, key: 2 },
		{ mb: 0, value: 3, index: 3, key: 3 }
	];

	function sortMerge() {
		const animations = getSortAnimations(array);

		console.log(animations);
		for (let i = 0; i < animations.length; i++) {
			setTimeout((_) => {
				let currentAnimation = animations[i];
				let index = array.findIndex((x) => x.key == currentAnimation.key);
				setBlockColor(currentAnimation, index);
			}, 2000 * i);
		}
	}

	function setBlockColor(action: Action, index: number) {
		array = array.map((x) => {
			x.bgColor = 'black';
			return x;
		});
		array[index].bgColor = action.bgColor;
	}
</script>

<button on:click={sortMerge}>Merge sort</button>
<div class="flex flex-row items-end absolute bottom-0 w-10/12 mx-20">
	{#each array as item}
		<div
			id={item.index.toString()}
			class="bg-black text-white align-bottom flex-1 min-w-[1px] mr-32 text-xs absolute transition-all"
			style="height: {30 * item.value}px; width:150px;  left: {200 *
				item.index}px; background-color: {item.bgColor};"
		>
			{item.value}
		</div>
	{/each}
</div>
