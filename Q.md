## 记录遇到的一些疑惑
1. ts碰到事件对象时的问题
```
  const handleSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    // const text = e.target.value.trim() 会报错，说EventTarget上没有value属性
    // const text = e.currentTarget.value.trim() 这个也、可以通过检查
    const text = (e.target as HTMLInputElement).value.trim() // 这个也可以通过检查
    if (e.code === 'Enter') {
      onSave(text);
      if (newTodo) {
        setText('');
      }
    }
  }
```