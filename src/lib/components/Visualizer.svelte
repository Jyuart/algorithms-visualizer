<script lang="ts">
	import { getSortAnimations } from '../helpers/animationsHelper';

	let array = Array.from(Array(50).keys(), (_) => Math.floor(Math.random() * 25 + 5));

	let currentActiveArray = Array.from({ length: array.length }, (_, index) => index);
	let activeBarIndex = -1;
	let barsComparedIndexes: number[] = [];

	function sortMerge() {
		const [_, animations] = getSortAnimations(array.slice());

		for (var i = 0; i < animations.length; i++) {
			const currentAnimation = animations[i];

			setTimeout((_: any) => {
				activeBarIndex = -1;

				if (currentAnimation.type == 'ARRAY') {
					barsComparedIndexes = [];
					currentActiveArray = [];
					for (var i = currentAnimation.first; i <= currentAnimation.second; i++) {
						currentActiveArray.push(i);
					}
				} else if (currentAnimation.type == 'COMPARE') {
					barsComparedIndexes = [];
					barsComparedIndexes.push(currentAnimation.first);
					barsComparedIndexes.push(currentAnimation.second);
				} else if (currentAnimation.type == 'PICK_MIN') {
					let bars = document.getElementById('bars')?.childNodes! as NodeListOf<HTMLElement>;

					for (var i = 0; i < bars.length; i++) {
						bars[i].style.transitionProperty = 'left';
					}

					let activeBar = bars.item(currentAnimation.second);
					activeBarIndex = currentAnimation.second;

					let currentLeft = parseInt(activeBar?.style.left);
					currentLeft = (100 / array.length) * currentAnimation.first;
					activeBar.style.left = `${currentLeft}%`;
					activeBar.style.zIndex = '999';

					let sortedBars = [...bars].sort(
						(a, b) => parseInt(a.style.left) - parseInt(b.style.left)
					);
					let barLeftValues = sortedBars.map((x) => x.style.left);
					let allUnique = barLeftValues.length === new Set(barLeftValues).size;

					if (allUnique) {
						for (var i = 0; i < sortedBars.length; i++) {
							sortedBars[i].style.transitionProperty = 'none';
							array[i] = parseInt(sortedBars[i].getAttribute('data-value')!);
						}
					}
				}
			}, i * 1000);
		}
	}
</script>

<button on:click={sortMerge}>Merge sort</button>
<div class="flex flex-row items-end absolute bottom-0 w-10/12 mx-20" id="bars">
	{#each array as item, index}
		<div
			data-value={item}
			class="bg-black text-white align-bottom absolute text-xs rounded-t-md"
			style="
				height: {10 * item}px; 
				opacity: {currentActiveArray.includes(index) ? '1' : '.2'};
				width: calc(100%/{array.length} - 5px);
				left: {(100 / array.length) * index}%;
				transition-property: left;
				transition-duration: 250ms;
				background-color: {activeBarIndex == index
				? 'red'
				: barsComparedIndexes.includes(index)
				? 'green'
				: 'black'}"
		>
			<p class="text-center pt-5">{item}</p>
		</div>
	{/each}
</div>
