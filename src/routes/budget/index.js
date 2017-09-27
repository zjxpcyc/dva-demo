import { budget } from 'utils/routes';

export default [
  {
    path: budget.form.add,
    models: () => [import('models/budget/form')],
    component: () => import('routes/budget/form/CreateForm'),
  },
  {
    path: budget.form.formfolder.list,
    models: () => [import('models/budget/form')],
    component: () => import('routes/budget/form/FormFolder'),
  },
  {
    path: budget.form.formfolder.add,
    models: () => [import('models/budget/form')],
    component: () => import('routes/budget/form/EditFormFolder'),
  },
  {
    path: budget.member.edit,
    models: () => [import('models/budget/member')],
    component: () => import('routes/budget/member/MemberEdit'),
  },
  {
    path: budget.dimension.list,
    models: () => [import('models/budget/dimension')],
    component: () => import('routes/budget/dimension/DimList'),
  },
  {
    path: budget.dimension.add,
    models: () => [import('models/budget/dimension')],
    component: () => import('routes/budget/dimension/DimEdit'),
  },
  {
    path: budget.dimension.edit,
    models: () => [import('models/budget/dimension')],
    component: () => import('routes/budget/dimension/DimEdit'),
  },
  {
    path: budget.setting.calendar,
    models: () => [import('models/budget/calendarset')],
    component: () => import('routes/budget/setting/Calendar'),
  },
  {
    path: budget.setting.plan,
    models: () => [import('models/budget/planset')],
    component: () => import('routes/budget/setting/Plan'),
  },
];
