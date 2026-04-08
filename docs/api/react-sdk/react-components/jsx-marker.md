# JSX 标记

WebSpatial SDK 支持把大部分普通 HTML 元素转变成空间化 HTML 元素，但出于性能、开源生态兼容性等方面的考虑，现阶段需要开发者在 JSX 代码中给这些 HTML 元素加上特殊标记。

## `enable-xr`

这个特殊标记表示把一个 HTML 元素转变成空间化 HTML 元素。

为了兼容第三方开源库，SDK 支持三种标记方式：

1. 将属性 `enable-xr` 作为 HTML 属性传给元素：

   ```html
   <div className="card" enable-xr></div>
   ```

2. 将 `__enableXr__` 添加到元素的 `className` 中：

   ```html
   <div className="card __enableXr__"></div>
   ```

3. 在元素的内联样式中添加 `enableXr: true`:

   ```html
   <div className="card" style={{ enableXr: true, marginTop: '10px' }}>
   ```

### `enable-xr-monitor`

把这个特殊标记添加空间化 HTML 元素的某个父元素上，可以让 WebSpatial SDK 监听这个父元素中内容的变化，如果这些变化会影响到了空间化 HTML 元素的尺寸和在 X/Y 轴上的布局位置，就可以及时同步到空间化 HTML 元素上。

```js
function CardList() {
  const [showFirstCard, setShowFirstCard] = useState(true);

  const onClick = () => {
    setShowFirstCard(prevState => !prevState);
  };

  return (
    <div enable-xr-monitor>
      {showFirstCard && <div>first card</div>}
      <div enable-xr>second card</div>
      <button onClick={onClick}>toggle</button>
    </div>
  );
}
```
