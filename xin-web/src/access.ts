export default (initialState:initialStateType) => {
  const access: string[] = []
  if(initialState && initialState.access){
    access.push(...initialState.access)
  }
  return {
    buttonAccess: (name:string) => access.includes(name),
  }
}
