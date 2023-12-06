const createSelect=(id, defVal, arr, changeFunction)=>{
	let select = document.createElement('div')
	select.setAttribute('id', id)
	select.setAttribute('class','select')
	let val = document.createElement('div')
	val.setAttribute('class','selectValue')
	val.innerHTML=defVal
	val.addEventListener('click',()=>{
		let list = document.getElementById(id).children[1]
		if (list) {
			list.remove()
		} else {
			document.addEventListener('mouseup',(e)=>{
				let list = document.getElementById(id).children[1]
				if (list && e.target.parentNode!=list && e.target.parentNode!=document.getElementById(id)) {list.remove()}
			}, {once:true})
			let options = document.createElement('div')
			options.setAttribute('class', 'options')
			for (let a of arr) {
				let option = document.createElement('div')
				option.innerHTML=a
				option.addEventListener('click',()=>{
					val.innerHTML=a
					if (changeFunction) changeFunction()
					document.getElementById(id).children[1].remove()
				})
				options.append(option)
			}
			select.append(options)
			
		}
	})
	
	select.append(val)
	return select
}