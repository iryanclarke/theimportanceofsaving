var app = new Vue({
  el: '#tios',
  data: {
    apm: '400$',
    apr: '4'
  }
})

// Define a new component called todo-item
Vue.component('todo-item', {
  template: '<li>This is a todo</li>'
})
