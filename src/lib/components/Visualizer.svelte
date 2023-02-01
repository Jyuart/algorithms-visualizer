<script lang="ts">
	import { getSortAnimations } from '../helpers/animationsHelper';

	const array = Array.from(Array(10).keys(), (_) => Math.floor(Math.random() * 25 + 5));

	let currentArray = Array.from({ length: array.length }, (_, index) => index);
	let compared: number[] = [];
	console.log(currentArray);
	let min = -1;

	function sortMerge() {
		const [sortedArray, animations] = getSortAnimations(array.slice());

		for (var i = 0; i < animations.length; i++) {
			const currentAnimation = animations[i];

			setTimeout((_: any) => {
				compared = [];
				console.log(currentAnimation);
				if (currentAnimation.type == 'ARRAY') {
					currentArray = [];
					for (var i = currentAnimation.first; i <= currentAnimation.second; i++) {
						currentArray.push(i);
					}
				} else if (currentAnimation.type == 'PICK_MIN') {
					// 	let bars = document.getElementById('bars');
					// 	let bar = bars?.childNodes.item(currentAnimation.first);
					// 	bar.style.height = `${currentAnimation.second * 10}px`;
					array[currentAnimation.first] = currentAnimation.second;

					// compared.push(currentAnimation.first);
					// compared.push(currentAnimation.second);
					// bars?.childNodes.values[currentAnimation.first].style.height =
					// 	array[currentAnimation.second] * 10;
					//let myBar = allBars. .style.height = '200px'
				}
			}, i * 1000);
		}
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
<div class="flex flex-row items-end absolute bottom-0 w-10/12 mx-20 transition-all" id="bars">
	{#each array as item, index}
		<div
			class="bg-black text-white align-bottom flex-1 min-w-[1px] mr-2 text-xs rounded-t-lg transition-all"
			style="height: {10 * item}px; opacity: {currentArray.includes(index)
				? '1'
				: '.2'}; background-color: {compared.includes(index) ? 'red' : 'black'}"
		>
			<p class="text-center pt-5">{item}</p>
		</div>
	{/each}
</div>
