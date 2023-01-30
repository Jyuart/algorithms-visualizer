function mergeSort(
	array: number[],
	startIndex: number,
	endIndex: number,
	animations: any[],
	referenceArray: number[]
) {
	// When we come to the point of the array having just a single item, we stop
	// Until then, we continue splitting it in halves
	if (startIndex == endIndex) {
		return;
	}

	// We look for the center of the array to split it into halves
	const middleIndex = Math.floor((endIndex + startIndex) / 2);

	mergeSort(referenceArray, startIndex, middleIndex, animations, array);
	mergeSort(referenceArray, middleIndex + 1, endIndex, animations, array);

	merge(array, startIndex, middleIndex, endIndex, referenceArray);
}

function merge(
	array: number[],
	startIndex: number,
	middleIndex: number,
	endIndex: number,
	referenceArray: number[]
) {
	// pointers to the starts of both halves
	let i = startIndex;
	let j = middleIndex + 1;

	// pointer to the section of the original array where new elements should be put
	let k = startIndex;

	while (i <= middleIndex && j <= endIndex) {
		if (referenceArray[i] < referenceArray[j]) {
			array[k++] = referenceArray[i++];
		} else {
			array[k++] = referenceArray[j++];
		}
	}

	while (i <= middleIndex) {
		array[k++] = referenceArray[i++];
	}

	while (j <= endIndex) {
		array[k++] = referenceArray[j++];
	}
}

export { mergeSort };
