export default {
	render: (data)=>`function myResume(){
	const name = '${data.name}'
	const contact = '${data.contact}'

	const education = [
		${data.education.map(row=>`
		{
			course: '${row.course}',
			institution: '${row.institution}',
			period: '${row.period}',
		},
	`).join("\n")}
	],

	const skills = [
		${data.skills.map(row=>`
		'${row.name}',
	`).join("\n")}
	],

	const workExperience = [
		${data.workExperience.map(row=>`
		{
			company: '${row.company}',
			post: '${row.post}',
			period: '${row.period}',
			description: '${row.description}',
		},
	`).join("\n")}
	],

	const languages = [
		${data.languages.map(row=>`
		{
			language: '${row.language}',
			level: '${row.level}',
		},
	`).join("\n")}
	],
}`
}