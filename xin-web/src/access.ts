import {initialStateType} from "@/app";

export default (initialState:initialStateType) => {

  const { access = [] } = initialState;

  return {
    canSeeAdmin: () => {
      console.log(access)
      return true
    },
    crud: () => access.includes('crud'),
    index: () => access.includes('index'),
    data: () => access.includes('data'),
    dataList: () => access.includes('data:list'),
    dataListUp: () => access.includes('data:listUp'),
    dataCard: () => access.includes('data:card'),
    rule: () =>  access.includes('rule'),
    admin: () => access.includes('admin'),
    adminList: () => access.includes('admin:list'),
    adminGroup: () => access.includes('admin:group'),
    adminRule: () => access.includes('admin:rule'),
    system: () => access.includes('system'),
    systemDict: () => access.includes('system:dict'),
    buttonAccess: (name:string) => access.includes(name),
  }
}
