import {PlusCircleOutlined} from '@ant-design/icons'
import {Button, Form, Input, Layout} from 'antd'
import React, {useState} from 'react'

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
				<CvCodePreview fields={formFinal} />
			</Sider>
			
		</Layout>
	)
}

const CvCodePreview = (props)=>{
	return <pre>{cvToCode(props.fields)}</pre>
}

const cvToCode = (fields)=>{
	const {name,contact, education, skills, workExperience, languages} = fields
	
	const educationList = education.map(row=>`
		{
			course: '${row.course}',
			institution: '${row.institution}',
			period: '${row.period}',
		},
	`).join("\n")
	
	const skillsList = skills.map(row=>`
		'${row.name}',
	`).join("\n")
	
	const workExperienceList = workExperience.map(row=>`
		{
			company: '${row.company}',
			post: '${row.post}',
			period: '${row.period}',
			description: '${row.description}',
		},
	`).join("\n")
	
	const languagesList = languages.map(row=>`
		{
			language: '${row.language}',
			level: '${row.level}',
		},
	`).join("\n")
	
	return (`function myResume(){
	const name = '${name}'
	const contact = '${contact}'
	
	const education = [
		${educationList}
	],
	
	const skills = [
		${skillsList}
	],
	
	const workExperience = [
		${workExperienceList}
	],
	
	const languages = [
		${languagesList}
	],
}
	`)
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
	if(labels[fieldName]){
		return labels[fieldName]
	}
	
	return fieldName
}
export default Home
