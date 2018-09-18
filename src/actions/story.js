// export const setUser = user => ({type: 'AUTH_SET_USER', payload: user})


export const addDescription = description => ({
  type: 'UPDATE_DESCRIPTION',
  payload: description
})


export const addTags = tags => ({
  type: 'UPDATE_TAGS',
  payload: tags
})


export const addNameOfSubjects = names => ({
  type: 'UPDATE_NAME_OF_SUBJECTS',
  payload: names
})
