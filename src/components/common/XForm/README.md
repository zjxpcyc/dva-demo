# XForm 封装 [Antd Form](https://ant.design/components/form-cn/)

将原来的组件式写法，改为 json 对象的方式

## 原因

* 项目需要
* Antd 原来的写法，真的很蛋疼

## 用法

### FormItem

所有的字段都可以配置为 json 方式, 比如
```javascript
// 如果 fields 是一维数组, 那么最终 Form 表单是一列纵向的,
// 如果是二维数组, 那么数组内的每个子数组会作为表单的一行显示,
// 因此可以自定义为多行，多列的格局
const fields = 
  [
    {
      label: '姓名',
      placeholder: '请填写姓名',
      name: 'user_name',  // 普通字段, 这个属性必须存在
      element: 'Input', // 控件名称, 目前只支持 antd 几个基本的控件, 但是普通项目已经完全足够
      options: {  // 这个就是定制 form 的 getFieldDecorator 函数入参 
        initialValue: props.data.userName,
        rules: [
          {
            required: true,
            message: '请填写姓名',
          },
        ],
      },
    },
    {
      label: '密码',
      name: 'user_pass',
      element: 'Input',
      eleAttr: { type: 'password' }, // 这个是空间本身的属性集合
      options: {
        rules: [
          {
            required: true,
            message: '请填写密码',
          },
        ],
      },
    },
    {
      isPure: true,  // 这里使用的自定义控件, 比如按钮这种没有 name 属性的空间, isPure 必须为 true
      element: () => (<Button type="primary" htmlType="submit">保存</Button>),
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    },
    {
      name: 'token',  // token 或者 id 类的字段可能是需要隐藏的
      element: null,  // 代表该 form field 是隐藏字段
      options: {
        initialValue: props.data.token
      },
    }
  ];
```

### FomBody

body 实际上 fields 的一个简单组合
```javascript
const formSetting =
{
  form: props.form,
  items: fields
}
```

最终在使用的时候就是
```javascript
const LogIn = (props) => {

  const handleSubmit = () => {
    // do something
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormBody {...formSetting} />
    </Form>
  );
}

export default Form.create()(LogIn);
```
