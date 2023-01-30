import type { Action } from '$lib/interfaces/action';
import type { Item } from '../interfaces/item';

function mergeSort(array: Item[], actions: Action[]): Item[] {
	if (array.length < 2) {
		return array;
	}

	const middleIndex = Math.floor(array.length / 2);
	actions.push({ key: array[middleIndex].key, bgColor: 'orange' });

	const firstHalf = mergeSort(array.slice(0, middleIndex), actions);
	const secondHalf = mergeSort(array.slice(middleIndex), actions);

	return merge(firstHalf, secondHalf, actions);
}

function merge(firstArray: Item[], secondArray: Item[], actions: Action[]) {
	let i = 0;
	let j = 0;

	let result: Item[] = [];

	while (i < firstArray.length && j < secondArray.length) {
		const firstArrayItem = firstArray[i];
		const secondArrayItem = secondArray[j];

		if (firstArrayItem.value < secondArrayItem.value) {
			result.push(firstArray[i++]);
			actions.push({ key: firstArrayItem.key, bgColor: 'yellow' });
		} else {
			result.push(secondArray[j++]);
			actions.push({ key: secondArrayItem.key, bgColor: 'red' });
		}
	}

	if (firstArray.length == i) {
		result = result.concat(secondArray.splice(j));
	}
	if (secondArray.length == j) {
		result = result.concat(firstArray.splice(i));
	}

	return result;
}

export { mergeSort };
