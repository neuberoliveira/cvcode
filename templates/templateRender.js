import func from './function'


const render = (templateName, data={})=>{
	let result;
	switch(templateName){
		case 'function':
			result = func
			break
	}
	
	if(result){
		return result.render(data)
	}
	
	return ''
}

const template = {
	render
}
export default template