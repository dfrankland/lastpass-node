import templates from './templates'
const rxpSpaces = new RegExp(' ', 'g')
const rxpIncase = search => new RegExp(`\\b(${search})\\b`, 'i')


const prettifyField = field => field
	.toLowerCase()
	.replace(rxpSpaces, '-')

const prepareNote = str => {
	const split = str.split('\n')

	return {
		field : key => {
			const search = `${key}:`
			const regexp = rxpIncase(search)
			const field = split.find((v, i) => {
				const found = v.match(regexp)
				if (found) split.splice(i, 1)
				return found
			}) || ''
			return field.replace(regexp, '')
		},
		notes : () => split.join('\n').substring(5)
	}
}

const noteTypesParser = (note, isSecureNote) => {
	let noteText = ''
	let noteForms = {}
	const get = prepareNote(note)
	const noteType = get.field('notetype')
	const template = templates.find(v => v.name === noteType)

	if (!isSecureNote || !template) return {
		noteText : note,
		noteForms,
	}

	noteForms = template.fields.reduce((forms, field) => {
		const value = get.field(field)
		const prettyField = prettifyField(field)

		forms[prettyField] = value

		return forms
	}, {})
	noteForms.notetype = noteType
	noteText = get.notes()


	return {
		noteText,
		noteForms,
	}
}


export default noteTypesParser
