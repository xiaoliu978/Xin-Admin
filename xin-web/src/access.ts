import {initialStateType} from "@/app";

export default (initialState:initialStateType) => {

  const { access = [] } = initialState;

  return {
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
    example: () => access.includes('example'),
    exampleTable: () => access.includes('example:table'),
    user: () => access.includes('user'),
    userList: () => access.includes('user:list'),
    content: () => access.includes('content'),
    contentList: () => access.includes('content:list'),
    online: () => access.includes('online'),
    onlineTable: () => access.includes('online:table'),
    onlinePages: () => access.includes('online:pages'),
    onlineApp: () => access.includes('online:app'),
    onlineCharts: () => access.includes('online:charts'),
    buttonAccess: (name:string) => access.includes(name),
  }
}
