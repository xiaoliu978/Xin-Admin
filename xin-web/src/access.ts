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

    systemdDictAdd: () => access.includes('system:dict:add'),
    systemDictDelete: () => access.includes('system:dict:delete'),
    systemDictEdit: () => access.includes('system:dict:edit'),
    systemDictList: () => access.includes('system:dict:list'),
    adminListList: () => access.includes('admin:list:list'),
    adminListAdd: () => access.includes('admin:list:add'),
    adminListEdit: () => access.includes('admin:list:edit'),
    adminListDelete: () => access.includes('admin:list:delete'),
    adminGroupList: () => access.includes('admin:group:list'),
    adminGroupAdd: () => access.includes('admin:group:add'),
    adminGroupEdit: () => access.includes('admin:group:edit'),
    adminGroupDelete: () => access.includes('admin:group:delete'),
    adminGroupRule: () => access.includes('admin:group:rule'),
    adminGroupRuleEdit: () => access.includes('admin:group:ruleEdit'),
    adminRuleList: () => access.includes('admin:rule:list'),
    adminRuleAdd: () => access.includes('admin:rule:add'),
    adminRuleEdit: () => access.includes('admin:rule:edit'),
    adminRuleDelete: () => access.includes('admin:rule:delete'),
    systemDictItemList: () => access.includes('system:dict:item:list'),
    systemDictItemAdd: () => access.includes('system:dict:item:add'),
    systemDictItemEdit: () => access.includes('system:dict:item:edit'),
    systemDictItemDelete: () => access.includes('system:dict:item:delete'),
  }
}
