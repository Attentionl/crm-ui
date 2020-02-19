import Vue from 'vue'
import { Button, Form, FormItem, Input, Message } from 'element-ui'

// 导入弹框提示 Message

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.prototype.$message = Message
