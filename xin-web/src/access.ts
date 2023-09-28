export default (initialState:initialStateType) => {
  const access: string[] = []
  if(initialState && initialState.access){
    access.push(...initialState.access.map(item=>item.toLowerCase()))
  }
  const noAuth: string[] = [
    'admin/login',
    'login',
    'index',
    '/'
  ];
  return {
    buttonAccess: (name:string) => access.includes(name.toLowerCase()),
    noAuth
  }
}
