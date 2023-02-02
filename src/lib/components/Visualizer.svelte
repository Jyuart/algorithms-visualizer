<script lang="ts">
	import { getSortAnimations } from '../helpers/animationsHelper';

	$: arrayLength = 50;
	$: array = Array.from(Array(arrayLength).keys(), (_) => Math.floor(Math.random() * 25 + 5));

	$: currentActiveArray = Array.from({ length: arrayLength }, (_, index) => index);

	$: speedInput = 2100;
	$: speed = 2600 - speedInput;

	let activeBarIndex = -1;
	let barsComparedIndexes: number[] = [];

	let animationRunning = false;

	function sortMerge() {
		animationRunning = true;
		const [_, animations] = getSortAnimations(array.slice());

		for (var i = 0; i < animations.length; i++) {
			const currentAnimation = animations[i];

			setTimeout((_: any) => {
				activeBarIndex = -1;

				if (currentAnimation.type == 'ARRAY') {
					barsComparedIndexes = [];
					currentActiveArray = [];

					let bars = document.getElementById('bars')?.childNodes! as NodeListOf<HTMLElement>;
					for (var i = currentAnimation.first; i <= currentAnimation.second; i++) {
						currentActiveArray.push(i);
						bars[i].style.bottom = `${(25 * 25) / 2}px`;
					}
				} else if (currentAnimation.type == 'COMPARE') {
					barsComparedIndexes = [];
					barsComparedIndexes.push(currentAnimation.first);
					barsComparedIndexes.push(currentAnimation.second);
				} else if (currentAnimation.type == 'PICK_MIN') {
					let bars = document.getElementById('bars')?.childNodes! as NodeListOf<HTMLElement>;

					for (var i = 0; i < bars.length; i++) {
						bars[i].style.transitionProperty = 'left, bottom';
						bars[i].style.transitionDuration = '250ms';
					}

					let activeBar = bars.item(currentAnimation.second);
					activeBarIndex = currentAnimation.second;

					let currentLeft = parseInt(activeBar?.style.left);
					currentLeft = (100 / array.length) * currentAnimation.first;
					activeBar.style.left = `${currentLeft}%`;
					activeBar.style.bottom = '0';

					let sortedBars = [...bars].sort(
						(a, b) => parseInt(a.style.left) - parseInt(b.style.left)
					);
					let barLeftValues = sortedBars.map((x) => x.style.left);
					let allUnique = barLeftValues.length === new Set(barLeftValues).size;

					if (allUnique) {
						setTimeout((_) => {
							for (var i = 0; i < sortedBars.length; i++) {
								sortedBars[i].style.transitionProperty = 'bottom';
							}

							for (var i = 0; i < sortedBars.length; i++) {
								array[i] = parseInt(sortedBars[i].getAttribute('data-value')!);
								activeBarIndex = -1;
								barsComparedIndexes = [];
							}
						}, speed / 2);
					}
				}
			}, i * speed);
		}

		setTimeout((_: any) => {
			animationRunning = false;
			activeBarIndex = -1;
			barsComparedIndexes = [];
		}, animations.length * speed);
	}
</script>

<div class="flex flex-col h-screen">
	<div>
		<label for="speed">Speed</label>
		<input
			type="range"
			bind:value={speedInput}
			max="2500"
			min="50"
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
				height: {(25 * item) / 2.5}px; 
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
