<script lang="ts">
	import {
		MIN_ANIMATION_SPEED,
		MAX_ANIMATION_SPEED,
		DEFAULT_ANIMATION_SPEED
	} from '$lib/helpers/consts';
	import { getSortAnimations, calculateAnimationSpeed, generateArray } from '../helpers/helpers';

	// inputs
	let arrayLength = 50;
	let speedInput = DEFAULT_ANIMATION_SPEED;
	$: speed = calculateAnimationSpeed(speedInput);

	// main array
	$: array = generateArray(arrayLength);

	// helpers for UI
	$: currentActiveArray = Array.from({ length: arrayLength }, (_, index) => index);
	let activeBarIndex = -1;
	let barsComparedIndexes: number[] = [];
	let animationRunning = false;

	function sortMerge() {
		animationRunning = true;
		const [_, animations] = getSortAnimations(array.slice());

		for (var i = 0; i < animations.length; i++) {
			const currentAnimation = animations[i];

			setTimeout((_: any) => {
				// on each animation unset the active bar index to remove the color highlight
				activeBarIndex = -1;

				if (currentAnimation.type == 'ARRAY') {
					barsComparedIndexes = [];
					currentActiveArray = [];

					let bars = getAllBars();

					// elevate all the bars of the currently active array
					for (var i = currentAnimation.first; i <= currentAnimation.second; i++) {
						currentActiveArray.push(i);
						bars[i].style.bottom = '40vh';
					}
				} else if (currentAnimation.type == 'COMPARE') {
					barsComparedIndexes = [];
					barsComparedIndexes.push(currentAnimation.first, currentAnimation.second);
				} else if (currentAnimation.type == 'PICK_MIN') {
					let bars = getAllBars();

					for (var i = 0; i < bars.length; i++) {
						bars[i].style.transitionProperty = 'left, bottom';
					}

					let activeBar = bars.item(currentAnimation.second);
					activeBarIndex = currentAnimation.second;

					let currentLeft = parseInt(activeBar?.style.left);
					currentLeft = (100 / array.length) * currentAnimation.first;
					activeBar.style.left = `${currentLeft}%`;
					activeBar.style.bottom = '0';

					// crucial step
					// we need to sort all the bars by their updated positions
					// if they are sorted and all the bars in their own place
					// we need to reassign the original array to be up to date
					let sortedBars = [...bars].sort(
						(a, b) => parseInt(a.style.left) - parseInt(b.style.left)
					);
					let barLeftValues = sortedBars.map((x) => x.style.left);
					let allUnique = barLeftValues.length === new Set(barLeftValues).size;

					if (allUnique) {
						setTimeout((_) => {
							// remove the 'left' transition property to omit glitch when reassigning the main array
							for (var i = 0; i < sortedBars.length; i++) {
								sortedBars[i].style.transitionProperty = 'bottom';
							}

							for (var i = 0; i < sortedBars.length; i++) {
								array[i] = parseInt(sortedBars[i].getAttribute('data-value')!);
								activeBarIndex = -1;
								barsComparedIndexes = [];
							}
						}, speed - 10);
					}
				}
			}, i * speed);
		}

		// unblock the UI after
		setTimeout((_: any) => {
			animationRunning = false;
			activeBarIndex = -1;
			barsComparedIndexes = [];
		}, animations.length * speed);
	}

	function getAllBars() {
		return document.getElementById('bars')?.childNodes! as NodeListOf<HTMLElement>;
	}
</script>

<div class="flex flex-col h-screen">
	<div>
		<label for="speed">Speed</label>
		<input
			type="range"
			bind:value={speedInput}
			max={MAX_ANIMATION_SPEED}
			min={MIN_ANIMATION_SPEED}
			disabled={animationRunning}
			id="speed"
			name="speed"
		/>
		<label for="Size">Size</label>

		<input
			type="range"
			bind:value={arrayLength}
			max="100"
			min="10"
			disabled={animationRunning}
			id="size"
			name="size"
		/>
		<button on:click={sortMerge} disabled={animationRunning} class="fixed top-0">Merge sort</button>
	</div>
	<div class="flex flex-row items-end w-10/12 mx-20" id="bars">
		{#each array as item, index}
			<div
				data-value={item}
				class="bg-black text-white align-bottom absolute text-xs rounded-md"
				style="
				height: {7 * item}px; 
				opacity: {currentActiveArray.includes(index) ? '1' : '.2'};
				width: calc(100%/{array.length} - 5px);
				left: {(100 / array.length) * index}%;
				transition-duration: 250ms;
				transition-property: bottom;
				bottom: 0;
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
</div>
