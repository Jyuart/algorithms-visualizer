import type { SortingAnimation } from '$lib/interfaces/animation';
import { mergeSort } from '../logic/sortingAlrogithms';

function getSortAnimations(array: number[]): [number[], SortingAnimation[]] {
	const animations: SortingAnimation[] = [];

	const referenceArray = array.slice();

	mergeSort(array, 0, array.length - 1, animations, referenceArray);

	return [array, animations];
}

export { getSortAnimations };
