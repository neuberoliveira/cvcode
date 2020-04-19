import {PlusCircleOutlined} from '@ant-design/icons'
import {Button, Divider, Form, Input, Layout} from 'antd'
import React, {useState} from 'react'
import template from '../templates/templateRender'

const {Content, Sider} = Layout

const PlusButton = () => <PlusCircleOutlined style={{fontSize:24, padding:10}}/>
const cvDefaultValues = {
	name:'',
	contact:'',
	education:[],
	skills:[],
	workExperience:[],
	languages:[],
}
const Home = () => {
	const [formFinal, setFormFinal] = useState(cvDefaultValues)
	const [templateType, setTemplateType] = useState('function')
	const [form] = Form.useForm();
	
	const onChange = (curField, allFields)=>{
		// console.log(form)
		console.log(curField)
		setFormFinal(allFields)
	}
	
	const carbonGenerator = ()=>{
		const baseCarbon = 'https://carbon.now.sh/?bg=rgba(171%2C%20184%2C%20195%2C%201)&t=seti&wt=none&l=javascript&ds=true&dsyoff=20px&dsblur=68px&wc=true&wa=true&pv=56px&ph=56px&ln=true&fl=1&fm=Hack&fs=14px&lh=131%25&si=false&es=2x&wm=false&code='
		const code = encodeURIComponent(cvToCode(formFinal))
		
		window.open(baseCarbon+code)
	}
	return (
		<Layout>
			<Content style={{ padding: '30px 50px' }}>
				<Form
					form={form}
					onValuesChange={onChange}
					initialValues={cvDefaultValues}
					layout="horizontal"
					labelCol={{ span: 2 }}
					wrapperCol={{ span: 12 }}
				>
					<Form.Item name="name" label="Name">
						<Input size={50} />
					</Form.Item>
					
					<Form.Item name="contact" label="Contact">
						<Input/>
					</Form.Item>
					
					<fieldset>
						<Form.List name="education">
							{(fields, { add, remove }) => (
								<>
									<legend>Education <Button type="link" onClick={() => add({})}><PlusButton /></Button></legend>
									{fields.map(field =>(
										<div key={field.fieldKey}>
											<Divider>Item {field.key+1}</Divider>
											
											<Form.Item name={[field.name, "course"]} fieldKey={[field.fieldKey, "course"]} label="Course">
												<Input/>
											</Form.Item>
											
											<Form.Item name={[field.name, "institution"]} label="Institution">
												<Input/>
											</Form.Item>
											
											<Form.Item name={[field.name, "period"]} label="Period">
												<Input/>
											</Form.Item>
											
										</div>
										)
									)}
								</>
							)}
						</Form.List>
					</fieldset>
					
					<fieldset>
						<Form.List name="skills">
							{(fields, { add, remove }) => (
								<>
									<legend>Skills <Button type="link" onClick={()=>add({})}><PlusButton /></Button></legend>
									{fields.map(field =>(
											<>
												<Divider>Item {field.key+1}</Divider>
												<Form.Item name={[field.name, "name"]} label="Skill">
													<Input/>
												</Form.Item>
											</>
										)
									)}
								</>
							)}
						</Form.List>
					</fieldset>
					
					<fieldset>
						<Form.List name="workExperience">
							{(fields, { add, remove }) => (
								<>
									<legend>Work experience <Button type="link" onClick={()=>add({})}><PlusButton /></Button></legend>
									{fields.map(field =>(
											<>
												<Divider>Item {field.key+1}</Divider>
												<Form.Item name={[field.name, "company"]} label="Company">
													<Input/>
												</Form.Item>
												<Form.Item name={[field.name, "post"]} label="Post">
													<Input/>
												</Form.Item>
												<Form.Item name={[field.name, "period"]} label="Period">
													<Input/>
												</Form.Item>
												<Form.Item name={[field.name, "description"]} label="Description">
													<Input/>
												</Form.Item>
											</>
										)
									)}
								</>
							)}
						</Form.List>
					</fieldset>
					
					<fieldset>
						<Form.List name="languages">
							{(fields, { add, remove }) => (
								<>
									<legend>Languages <Button type="link" onClick={()=>add({})}><PlusButton /></Button></legend>
									{fields.map(field =>(
											<>
												<Divider>Item {field.key+1}</Divider>
												<Form.Item name={[field.name, "language"]} label="Language">
													<Input/>
												</Form.Item>
												<Form.Item name={[field.name, "level"]} label="Level">
													<Input/>
												</Form.Item>
											</>
										)
									)}
								</>
							)}
						</Form.List>
					</fieldset>
				</Form>
				
				<Button type="primary" onClick={carbonGenerator}>
					Generate
				</Button>
			</Content>
			
			<Sider theme="light" width="35%">
				<CvCodePreview fields={formFinal} type={templateType} />
			</Sider>
			
		</Layout>
	)
}

const CvCodePreview = (props)=>{
	return <pre>{cvToCode(props.fields, props.type)}</pre>
}

const cvToCode = (fields, type='function')=>{
	return template.render(type, fields)
}

const cvIterator = (fields, func, outerIndex=0)=>{
	Object.keys(fields).map((fieldname)=> {
		const value = fields[fieldname]
		
		if(Array.isArray(value)){
			const hasMultiple = true
			func(fieldname, undefined, hasMultiple, outerIndex)
			value.forEach((row, idx)=>{
				if(row){
					cvIterator(row, func, idx)
				}
			})
		}else{
			const hasMultiple = false
			func(fieldname, value, hasMultiple, outerIndex)
		}
	})
}

const labels = {
	'name': 'Name',
	'contact': 'Contact',
	'course': 'Course',
	'institution': 'Institution',
	'period': 'Period',
	'post': 'Post',
	'description': 'Description',
	'language': 'Language',
	'languages': 'Languages',
	'level': 'Level',
	'workExperience': 'Work experience',
	'skills': 'Skills',
	'education': 'Education',
}
const mapLabels = (fieldName)=>{
	if(labels[fieldName.toLowerCase()]){
		return labels[fieldName.toLowerCase()]
	}
	
	return fieldName
}
export default Home
