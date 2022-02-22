const calculateDistancesArray = (cities) => {
	let leftMainPointer = 0
	let rightMainPointer = cities.length - 1

	while(leftMainPointer < rightMainPointer){
		let leftInnerPointer  = leftMainPointer  + 1
		let rightInnerPointer = rightMainPointer - 1

		const leftInnerPointerMax  = rightMainPointer
		const rigthInnerPointerMax = leftMainPointer + 1

		const leftMainCity  = cities[leftMainPointer]
		const rightMainCity = cities[rightMainPointer]

		while(leftInnerPointer <= leftInnerPointerMax && rightInnerPointer >= rigthInnerPointerMax){
			const leftCity = cities[leftInnerPointer]
			const rightCity = cities[rightInnerPointer]

			console.log(`Left: ${leftMainCity}-${leftCity}`)
			console.log(`RIGHT: ${rightMainCity}-${rightCity}`)
      
			leftInnerPointer  ++
			rightInnerPointer --
		}

    const leftCity = cities[leftInnerPointer]
    console.log(`Left: ${leftMainCity}-${leftCity}`)

    console.log('-------')
    
		leftMainPointer  ++
		rightMainPointer --
	}
  console.log('.')
}

calculateDistancesArray(["A","B","C","D"])