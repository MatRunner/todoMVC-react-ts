## 记录遇到的一些疑惑
1. ts碰到事件对象时的问题
```
  const handleSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    // const text = e.target.value.trim() 会报错，说EventTarget上没有value属性
    // const text = e.currentTarget.value.trim() 这个可以通过检查
    const text = (e.target as HTMLInputElement).value.trim() // 这个也可以通过检查
    if (e.code === 'Enter') {
      onSave(text);
      if (newTodo) {
        setText('');
      }
    }
  }
```
2. type和interface声明按理来说都不能取一个变量的值，但是有时候import进来一个变量有时候又不会报错
   比如一个文件export出一个变量A=1
   import 这个A后不能在type声明里使用，但是在enum里可以使用
   目前知道的解答是，使用外部引入声明declare，或者将类型作为配置从外部导入