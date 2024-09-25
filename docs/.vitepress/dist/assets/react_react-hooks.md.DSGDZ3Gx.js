import{_ as n,c as a,a2 as p,o as e}from"./chunks/framework.BFVHecrR.js";const h=JSON.parse('{"title":"1.介绍","description":"","frontmatter":{},"headers":[],"relativePath":"react/react-hooks.md","filePath":"react/react-hooks.md"}'),l={name:"react/react-hooks.md"};function t(i,s,c,o,r,u){return e(),a("div",null,s[0]||(s[0]=[p(`<h1 id="_1-介绍" tabindex="-1">1.介绍 <a class="header-anchor" href="#_1-介绍" aria-label="Permalink to &quot;1.介绍&quot;">​</a></h1><h2 id="_1-1-为什么需要-hook" tabindex="-1">1.1.为什么需要 Hook <a class="header-anchor" href="#_1-1-为什么需要-hook" aria-label="Permalink to &quot;1.1.为什么需要 Hook&quot;">​</a></h2><ul><li><code>Hook</code>是 React <code>16.8</code>的新增特性，它可以让我们<code>不编写类组件</code>的情况下<code>使用state以及其它的React特性</code>(eg:生命周期)</li><li>换句话来说<code>Hook弥补了函数组件的缺陷</code>，比如没有声明周期，不能保存状态(更改数据无法刷新页面)等问题</li><li>所以，Hook 出现之前，通常会使用类组件，类组件的优缺点看下面</li></ul><h2 id="_1-2-类组件的优点" tabindex="-1">1.2.类组件的优点 <a class="header-anchor" href="#_1-2-类组件的优点" aria-label="Permalink to &quot;1.2.类组件的优点&quot;">​</a></h2><ul><li>class 组件可以<code>定义自己的stat</code>e，用来保存组件自己内部的状态</li><li>class 组件有<code>自己的生命周期</code></li><li>class 组件可以在<code>状态改变时</code>只会<code>执行render函数</code>以及我们希望重新调用的生命周期函数 <ul><li>函数式组件在重新渲染时，整个函数都会被执行</li></ul></li></ul><h2 id="_1-3-类组件的缺陷" tabindex="-1">1.3.类组件的缺陷 <a class="header-anchor" href="#_1-3-类组件的缺陷" aria-label="Permalink to &quot;1.3.类组件的缺陷&quot;">​</a></h2><ul><li>随着业务的增加，<code>类组件的逻辑会变的复杂</code>，难以理解</li><li><code>this指向问题</code>，this 自古以来就是 js 的难题</li><li><code>组件复用状态很难</code>，需要使用高阶组件来实现复用，有时候逻辑很复杂，往往是高阶组件嵌套高阶组件，难以理解</li></ul><h2 id="_1-4-hook-的使用场景" tabindex="-1">1.4.Hook 的使用场景 <a class="header-anchor" href="#_1-4-hook-的使用场景" aria-label="Permalink to &quot;1.4.Hook 的使用场景&quot;">​</a></h2><ul><li>Hook 的出现<code>基本可以替代之前所有使用class组件的地方</code></li><li>如果是一个<code>旧的项目</code>，并不需要<code>直接将所有的代码重构为Hooks</code>，因为它<code>完全向下兼容</code>，可以渐进式的来使用它</li><li>Hook<code>只能在函数组件中使用</code>，不能在类组件，或函数组件之外的地方使用</li></ul><h1 id="_2-hooks" tabindex="-1">2.Hooks <a class="header-anchor" href="#_2-hooks" aria-label="Permalink to &quot;2.Hooks&quot;">​</a></h1><h2 id="_2-1-hook-使用规则" tabindex="-1">2.1.Hook 使用规则 <a class="header-anchor" href="#_2-1-hook-使用规则" aria-label="Permalink to &quot;2.1.Hook 使用规则&quot;">​</a></h2><ul><li>只能在<code>函数组件</code>的最<code>外层调</code>用 Hook。<code>不能</code>在<code>循环</code>、<code>条件判断</code>语句中调用</li></ul><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { memo, useState } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;react&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> CounterH</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">counter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">setCounter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> useState</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">20</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 只能在函数组件最外层调用 下面的调用不在最外层了 不能这样写</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // if (true) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  //   const [counter, setCounter] = useState(20)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h2 id="_2-2-usestate" tabindex="-1">2.2.useState <a class="header-anchor" href="#_2-2-usestate" aria-label="Permalink to &quot;2.2.useState&quot;">​</a></h2><p><strong>State Hook 的 API 就是 useState</strong></p><ul><li>useState 来自 react，需要从 react 中导入，他是一个 hook</li></ul><p><strong>参数</strong></p><ul><li>接受一个参数作为<code>初始化值</code>，如果不设置初始化值为 undefined</li></ul><p><strong>返回值</strong></p><ul><li>返回一个<code>数组</code>，包含两个元素</li><li><code>元素一</code>：当前的状态值(第一次调用会使用初始化值)</li><li><code>元素二</code>：设置状态值的函数</li></ul><p><strong>FAQ</strong></p><ul><li><strong>为什么叫 useState 而不叫 createState</strong><ul><li>create 可能不是很准确，因为<code>state只在组件首次渲染的时候被创建</code></li><li>在<code>下一次重新渲染时</code>，<code>useState返回给我们当前的state</code></li><li>这也就是 Hook 的名字总是以 use 开开头的一个原因</li></ul></li></ul><p><strong>结果</strong></p><p>当使用元素二改变状态后，会使用最新的状态重新渲染</p><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { memo, useState } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;react&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> CounterH</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">counter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">setCounter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> useState</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">20</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">h2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;Hook 当前计数:{counter}&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">h2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">button</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> onClick</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">e</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> setCounter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(counter </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)}&gt;+1&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">button</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">button</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> onClick</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">e</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> setCounter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(counter </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)}&gt;-1&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">button</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  );</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h2 id="_2-3-useeffect" tabindex="-1">2.3.useEffect <a class="header-anchor" href="#_2-3-useeffect" aria-label="Permalink to &quot;2.3.useEffect&quot;">​</a></h2><p><strong>useEffect 可以模拟 class 中的生命周期，但是比生命周期更加强大</strong></p><ul><li><strong>useEffect 的解析</strong>： <ul><li>通过 useEffect 的 Hook，可以<code>告诉React需要在渲染后执行某些操作</code></li><li>useEffect 要求<code>传入一个回调函数</code>，在 React<code>执行更新DOM操作后</code>，<code>就会回调这个函数</code></li><li>默认情况下，<code>无论是第一次渲染之后</code>，还是每次更新之后，都会<code>执行这个回调函数</code></li></ul></li><li><strong>使用场景</strong><ul><li>比如发送网络请求</li><li>比如订阅事件</li><li>...</li></ul></li></ul><h3 id="_2-3-1-需要清除的-effect" tabindex="-1">2.3.1.需要清除的 Effect <a class="header-anchor" href="#_2-3-1-需要清除的-effect" aria-label="Permalink to &quot;2.3.1.需要清除的 Effect&quot;">​</a></h3><p>上面提到可以在 useEffect 中订阅事件，那么在哪里进行取消订阅呢？</p><p><strong>useEffect 中可以返回一个函数</strong></p><ul><li><p>这是<code>effect可选的清除机制</code>。<code>每个effect都可以返回一个清除函数</code></p></li><li><p>如此<code>可以将添加和衣橱订阅的逻辑放在一起</code>，他们都属于 effect 的一部分</p></li><li><p><strong>React 会在组件更新阶段 <code>先执行清除操作(useEffect返回的回调)</code> ，<code>再执行effect中的内容</code></strong></p></li><li><p><strong>React 会在组件卸载阶段 <code>只执行清除操作(useEffect返回的回调)</code></strong></p></li></ul><h3 id="_2-3-2-使用多个-effect" tabindex="-1">2.3.2.使用多个 Effect <a class="header-anchor" href="#_2-3-2-使用多个-effect" aria-label="Permalink to &quot;2.3.2.使用多个 Effect&quot;">​</a></h3><ul><li><p>使用 Hook 的其中一个目的就是解决 class 中生命周期经常将很多的逻辑放在一起的问题</p><ul><li>比如网络请求，事件监听，手动修改 DOM，这些往往都会放在 componentDidMount 中</li></ul></li><li><p><strong>使用 Effect Hook 可以将他们分离到不同的 useEffect 中</strong></p></li><li><p><strong>Hook 允许我们按照代码的用途分离他们</strong>，而不是像生命周期函数那样：</p><ul><li>React 将<code>按照effect声明的顺序依次执行组件中的每一个effect</code></li></ul></li></ul><h3 id="_2-3-3-代码示例" tabindex="-1">2.3.3.代码示例 <a class="header-anchor" href="#_2-3-3-代码示例" aria-label="Permalink to &quot;2.3.3.代码示例&quot;">​</a></h3><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const App = memo(() =&gt; {</span></span>
<span class="line"><span>  const [counter, setCounter] = useState(10)</span></span>
<span class="line"><span>  // 使用一个useEffect</span></span>
<span class="line"><span>  useEffect(() =&gt; {</span></span>
<span class="line"><span>    // 当组件渲染完毕后会执行这个回调</span></span>
<span class="line"><span>    document.title = counter</span></span>
<span class="line"><span>    console.log(&#39;添加订阅&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 如果返回一个回调 那么每次更新和卸载的时候都会调用这个回调</span></span>
<span class="line"><span>    // 可以在这个清除函数中做一些取消订阅/取消监听的操作</span></span>
<span class="line"><span>    return () =&gt; {</span></span>
<span class="line"><span>      console.log(&#39;取消订阅&#39;)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>  // 再使用一个useEffect</span></span>
<span class="line"><span>  useEffect(() =&gt; {</span></span>
<span class="line"><span>    console.log(&#39;执行网络请求&#39;)</span></span>
<span class="line"><span>    return () =&gt; {</span></span>
<span class="line"><span>      console.log(&#39;操作dom&#39;)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;div&gt;</span></span>
<span class="line"><span>      &lt;h2&gt;当前计数：{counter}&lt;/h2&gt;</span></span>
<span class="line"><span>      &lt;button onClick={(e) =&gt; setCounter(counter + 1)}&gt;+1&lt;/button&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>  )</span></span>
<span class="line"><span>})</span></span></code></pre></div><h3 id="_2-3-4-effect-性能优化" tabindex="-1">2.3.4.Effect 性能优化 <a class="header-anchor" href="#_2-3-4-effect-性能优化" aria-label="Permalink to &quot;2.3.4.Effect 性能优化&quot;">​</a></h3><p>上面说到每次渲染都会执行 effect，比如我在当前 effect 中执行的是从服务器获取数据的操作，那么每次执行渲染操作，都会发送一次请求，这样显然是不合理的</p><p>所以，如果某些代码只希望执行一次可以按照下面的解决方案</p><p><strong>注意</strong>：不管依赖谁 在组件第一次加载的时候，useEffect 中的内容都会执行一次，否则没有意义了</p><p><strong>解决</strong></p><ul><li>useEffect<code>实际上有两个参数</code></li><li>参数一：<code>执行的回调函数</code></li><li>参数二：是一个数组，表示该<code>useEffect在哪些state发生变化时才重新执行</code><ul><li>说白了就是当前 useEffect 依赖谁，类似于 computed，只有依赖变化了才执行</li></ul></li></ul><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const App = memo(() =&gt; {</span></span>
<span class="line"><span>  const [counter, setCounter] = useState(10)</span></span>
<span class="line"><span>  const [message, setMessage] = useState(&#39;你好&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 只要页面渲染都会执行</span></span>
<span class="line"><span>  useEffect(() =&gt; {</span></span>
<span class="line"><span>    console.log(&#39;修改title&#39;)</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 依赖message 当message 变化才执行</span></span>
<span class="line"><span>  // 参数二是一个数组，可以依赖多个 eg:[message,counter]</span></span>
<span class="line"><span>  useEffect(() =&gt; {</span></span>
<span class="line"><span>    console.log(&#39;操作DOM&#39;)</span></span>
<span class="line"><span>  }, [message])</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 不依赖任何，只有当组件加载的时候执行一次</span></span>
<span class="line"><span>  useEffect(() =&gt; {</span></span>
<span class="line"><span>    console.log(&#39;发送网络请求，获取服务器的数据&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 因为该useEffect不依赖任何，所以清除的effect也只会在当前组件被卸载时候执行</span></span>
<span class="line"><span>    return () =&gt; {</span></span>
<span class="line"><span>      console.log(&#39;组件被卸载时执行一次&#39;)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }, [])</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;div&gt;</span></span>
<span class="line"><span>      &lt;h2&gt;当前计数：{counter}&lt;/h2&gt;</span></span>
<span class="line"><span>      &lt;button onClick={(e) =&gt; setCounter(counter + 1)}&gt;+1&lt;/button&gt;</span></span>
<span class="line"><span>      &lt;h2&gt;当前msg：{message}&lt;/h2&gt;</span></span>
<span class="line"><span>      &lt;button onClick={(e) =&gt; setMessage(&#39;我很好&#39;)}&gt;change msg&lt;/button&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>  )</span></span>
<span class="line"><span>})</span></span></code></pre></div><h2 id="_2-4-usecontext" tabindex="-1">2.4.useContext <a class="header-anchor" href="#_2-4-usecontext" aria-label="Permalink to &quot;2.4.useContext&quot;">​</a></h2><p>之前的学习中，在函数组件中使用 context 是很不方便的，可以使用 useContext Hook 来简化操作</p><p><strong>注意</strong>： 当前组件依赖的 Context 数据发生变化时，该组件也会重新渲染</p><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import React, { memo, useContext } from &#39;react&#39;</span></span>
<span class="line"><span>import { ThemeContext, UserContext } from &#39;./context&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const App = memo(() =&gt; {</span></span>
<span class="line"><span>  //如果 UserContext ThemeContext 传入的数据发生变化 那么当前组件也会重新渲染</span></span>
<span class="line"><span>  const user = useContext(UserContext)</span></span>
<span class="line"><span>  const theme = useContext(ThemeContext)</span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;div&gt;</span></span>
<span class="line"><span>      &lt;h2&gt;展示userContext的数据:{user.name}&lt;/h2&gt;</span></span>
<span class="line"><span>      &lt;h2&gt;展示ThemeContext的数据:{theme.color}&lt;/h2&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>  )</span></span>
<span class="line"><span>})</span></span></code></pre></div><h2 id="_2-5-usereducer-了解" tabindex="-1">2.5.useReducer(了解) <a class="header-anchor" href="#_2-5-usereducer-了解" aria-label="Permalink to &quot;2.5.useReducer(了解)&quot;">​</a></h2><ul><li><strong>这个不是 redux 的替代品</strong></li><li>useReducer<code>仅仅是useState的一种替代方案</code><ul><li>某些场景下，<code>如果state的处理逻辑比较复杂</code>，可以通过 useReducer 来对其进行拆分</li><li>比如现在点击按钮，既要让 counter+1，又要改变 message，如果使用 useState 那么就需要两个，一个是操作 counter 的 useState，一个是操作 message 的 useState</li><li>如果操作的 state 更多，那么就需要更多的 useState</li><li>可以使用 userReducer，只需要一个即可，因为操作的都会放到一个 state 中(就像 redux 的 state 一样)</li></ul></li><li>开发中不推荐这样，如果遇到这样的需求，建议使用 redux</li></ul><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import React, { memo, useReducer } from &#39;react&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function reducer(state, action) {</span></span>
<span class="line"><span>  switch (action.type) {</span></span>
<span class="line"><span>    case &#39;add&#39;:</span></span>
<span class="line"><span>      return {</span></span>
<span class="line"><span>        ...state,</span></span>
<span class="line"><span>        counter: state.counter + action.num,</span></span>
<span class="line"><span>        message: &#39;我是add&#39;,</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    default:</span></span>
<span class="line"><span>      return {</span></span>
<span class="line"><span>        ...state,</span></span>
<span class="line"><span>        counter: state.counter - action.num,</span></span>
<span class="line"><span>        message: &#39;我是sub&#39;,</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const App = memo(() =&gt; {</span></span>
<span class="line"><span>  const [state, dispatch] = useReducer(reducer, { counter: 1 })</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;div&gt;</span></span>
<span class="line"><span>      &lt;h1&gt;</span></span>
<span class="line"><span>        counter:{state.counter},msg:{state.message}</span></span>
<span class="line"><span>      &lt;/h1&gt;</span></span>
<span class="line"><span>      &lt;button onClick={(e) =&gt; dispatch({ type: &#39;add&#39;, num: 1 })}&gt;+&lt;/button&gt;</span></span>
<span class="line"><span>      &lt;button onClick={(e) =&gt; dispatch({ type: &#39;sub&#39;, num: 1 })}&gt;-&lt;/button&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>  )</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default App</span></span></code></pre></div><h2 id="_2-6-usecallback" tabindex="-1">2.6.useCallback <a class="header-anchor" href="#_2-6-usecallback" aria-label="Permalink to &quot;2.6.useCallback&quot;">​</a></h2><ul><li>useCallback<code>实际目的是为了进行性能的优化</code></li><li>useCallback<code>会返回一个函数的memoized(记忆的)值（返回一个有记忆的回调函数）</code></li><li>在<code>依赖不变的情况下，多次定义的时候，返回值是相同</code>的</li></ul><p><strong>性能优化</strong></p><ul><li>当需要<code>将一个函数传递给子组件时</code>，最好<code>使用useCallback进行优化</code>，将优化后的函数，传递给子组件</li></ul><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 解析</span></span>
<span class="line"><span>// 看下面案例</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 当点击加一操作之后，count进行了更新 重新执行了app组件完成重新渲染 这时&lt;YMIncrement&gt;子组件接收了increment函数，所以也会重新渲染一次，这都是正常的 因为app组件重新渲染了 所以increment函数又被重新定义了一次 子组件接收到新的参数所以也会重新渲染</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 当点击change message按钮之后 改变了message  此时子组件也会被重新渲染 道理和上面一样 因为message发生了变化 所以app重新渲染 increment函数重新定义 子组件拿到新的参数又会被重新渲染</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 但是这样是有损性能的 子组件依赖的是count相关的 并不是message相关的 所以当message变化不应该去影响这个子组件  这个案例中没有那么复杂 所以性能看不出有啥损耗 如果真是开发中有100个子组件都需要使用这个函数那么这100个子组件都会渲染，就会影响很大了</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 使用useCallback对increment进行优化，他依赖count，只有count变化导致的重新渲染才会使得increment的回调foo重新定义，否则就会使用之前定义的，这时因为increment没有被重新定义，所以子组件不会重新渲染</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const YMIncrement = memo((props) =&gt; {</span></span>
<span class="line"><span>  console.log(&#39;YMIncrement渲染了&#39;)</span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;div&gt;</span></span>
<span class="line"><span>      &lt;button onClick={props.increment}&gt;YMIncrement+1&lt;/button&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>  )</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const App = memo(() =&gt; {</span></span>
<span class="line"><span>  const [count, setCount] = useState(0)</span></span>
<span class="line"><span>  const [message, setMessage] = useState(&#39;hello&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 未被优化的函数</span></span>
<span class="line"><span>  // const increment = () =&gt; {</span></span>
<span class="line"><span>  //   setCount(count + 1)</span></span>
<span class="line"><span>  // }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 使用useCallback优化的函数</span></span>
<span class="line"><span>  const increment = useCallback(</span></span>
<span class="line"><span>    function foo() {</span></span>
<span class="line"><span>      console.log(count)</span></span>
<span class="line"><span>      setCount(count + 1)</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    [count]</span></span>
<span class="line"><span>  )</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const changeMessage = () =&gt; {</span></span>
<span class="line"><span>    setMessage(Math.random())</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;div&gt;</span></span>
<span class="line"><span>      &lt;h2&gt;count:{count}&lt;/h2&gt;</span></span>
<span class="line"><span>      &lt;button onClick={(e) =&gt; increment()}&gt;+1&lt;/button&gt;</span></span>
<span class="line"><span>      &lt;YMIncrement increment={increment} /&gt;</span></span>
<span class="line"><span>      &lt;h2&gt;message:{message}&lt;/h2&gt;</span></span>
<span class="line"><span>      &lt;button onClick={(e) =&gt; changeMessage()}&gt;change message&lt;/button&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>  )</span></span>
<span class="line"><span>})</span></span></code></pre></div><p><strong>必包陷阱问题</strong></p><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>// 必包陷阱问题</span></span>
<span class="line"><span>// 现在如果我们将代码写成下面这样，increment表示不依赖任何，即，即使页面重新渲染 increment中的foo也不会被重新定义(解决了一个函数不会被重复定义问题？？)  但是会有问题 +1的时候count变成1之后就不会累加了</span></span>
<span class="line"><span>// 原因是 因为不依赖任何 所以 传入的回调foo就不会被再次定义 当点击+1 app渲染 但是foo不会被重新定义   虽然这次更新后count已经变成了1 但是foo内部的count是0 他引用的依旧是第一次app的count，0，所以就是点击很多次+1 foo内部的count依然是0  所以页面上count永远是0+1 =1</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span> const increment = useCallback(function foo() {</span></span>
<span class="line"><span>   console.log(count)  // 永远是0</span></span>
<span class="line"><span>   setCount(count + 1)</span></span>
<span class="line"><span> }, [])</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 所以使用useCallback的时候添加一个依赖 当依赖发生变化 useCallback的回调会被重新定义</span></span>
<span class="line"><span>// 所以说useCallback并不是让函数只定义一次这个浅薄且有误的理解</span></span></code></pre></div><p><strong>进一步优化</strong></p><ul><li>上面的优化方案 如果添加依赖，当依赖发生变化时，回调函数还是会被重新定义，如果不添加依赖，虽然回调函数不会被多次定义，但是会存在必包陷阱的问题</li><li>可以使用 useRef 解决这个问题 <ul><li>useRef 在组件多次渲染的时候，返回的是同一个值</li></ul></li></ul><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>  // 虽然可以使用添加依赖的方式解决 必包陷阱问题</span></span>
<span class="line"><span>  // 但是当改变count foo还是会多次定义</span></span>
<span class="line"><span>  // 使用 useRef解决</span></span>
<span class="line"><span>  // useRef，在组件多次渲染时，返回的是同一个值</span></span>
<span class="line"><span>  const countRef = useRef()</span></span>
<span class="line"><span>  countRef.current = count</span></span>
<span class="line"><span>  const increment = useCallback(function foo() {</span></span>
<span class="line"><span>    console.log(countRef.current)</span></span>
<span class="line"><span>    setCount(countRef.current + 1)</span></span>
<span class="line"><span>  }, [])</span></span></code></pre></div><p><strong>总结</strong></p><ul><li>使用 useCallback 和不使用 useCallback<code>在函数定义的使用时不会带来性能的优化</code>(可以使用 useRef 配合来完成优化)</li><li>使用 useCallback 和不使用 useCallback 定义的函数<code>在传递给子组件可以带来性能的优化</code></li><li>通常使用 useCallback 的目的是不希望子组件进行多次渲染，并不是为了函数进行缓存</li></ul><h2 id="_2-7-usememo" tabindex="-1">2.7.useMemo <a class="header-anchor" href="#_2-7-usememo" aria-label="Permalink to &quot;2.7.useMemo&quot;">​</a></h2><ul><li>useMemo 实际的目的也是为了性能优化</li><li>useMemo<code>返回的也是一个memoized(记忆的)值</code></li><li>在<code>依赖不变的情况下，多次定义的时候返回的值是相同的</code></li><li>和 useCallback 的区别是 <code>useCallback返回的是一个记忆的回调函数</code>，<code>useMemo返回的是一个记忆的值</code></li></ul><p><strong>案例一</strong></p><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 案例中 当点击计数器操作 count发生变化，组件被重新渲染，组件内部的所有东西都会被重新执行一遍，那么calcTotal这个函数也被重新执行</span></span>
<span class="line"><span>// 但是calcTotal函数与count没有半毛钱关系，所以没必要执行</span></span>
<span class="line"><span>// 使用useMemo 只有当依赖发生了变化时 才会重新返回一次结果</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const calcTotal = (num) =&gt; {</span></span>
<span class="line"><span>  console.log(&#39;calcTotl重新执行&#39;)</span></span>
<span class="line"><span>  return num * 2</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const App = memo(() =&gt; {</span></span>
<span class="line"><span>  const [count, setCount] = useState(0)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // const calcNum = calcTotal(20)</span></span>
<span class="line"><span>  // 不依赖任何，当组件重新渲染 calcTotal函数也不会被重新执行 括号内可以写依赖的内容,空表示不依赖任何</span></span>
<span class="line"><span>  const calcNum = useMemo(() =&gt; calcTotal(20), [])</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  function handleClick() {</span></span>
<span class="line"><span>    setCount(count + 1)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;div&gt;</span></span>
<span class="line"><span>      &lt;h2&gt;total:{calcNum}&lt;/h2&gt;</span></span>
<span class="line"><span>      &lt;button onClick={(e) =&gt; handleClick()}&gt;count:{count}&lt;/button&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>  )</span></span>
<span class="line"><span>})</span></span></code></pre></div><p><strong>案例二</strong></p><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 案例中 当点击计数器操作，count发生变化，组件被重新渲染 info又被重新生成了一次 是一个新对象，子组件中接受到新的值 所以重新渲染</span></span>
<span class="line"><span>// 其实子组件是不用重新渲染的 避免性能浪费</span></span>
<span class="line"><span>// 使用useMemo 只有当依赖发生了变化时 才会重新返回一次结果</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const YmUser = memo((props) =&gt; {</span></span>
<span class="line"><span>  console.log(&#39;子组件渲染&#39;)</span></span>
<span class="line"><span>  return &lt;h2&gt;use:{props.info.name}&lt;/h2&gt;</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const App = memo(() =&gt; {</span></span>
<span class="line"><span>  const [count, setCount] = useState(0)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  function handleClick() {</span></span>
<span class="line"><span>    setCount(count + 1)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 使用useMemo对子组件渲染进行优化</span></span>
<span class="line"><span>  // const info = { name: &#39;zs&#39; }</span></span>
<span class="line"><span>  const info = useMemo(() =&gt; ({ name: &#39;zs&#39; }), [])</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;div&gt;</span></span>
<span class="line"><span>      &lt;button onClick={(e) =&gt; handleClick()}&gt;count:{count}&lt;/button&gt;</span></span>
<span class="line"><span>      &lt;YmUser info={info} /&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>  )</span></span>
<span class="line"><span>})</span></span></code></pre></div><h2 id="_2-8-useref" tabindex="-1">2.8.useRef <a class="header-anchor" href="#_2-8-useref" aria-label="Permalink to &quot;2.8.useRef&quot;">​</a></h2><ul><li><code>useRef返回一个ref对象，</code></li><li>返回的 ref 对象在<code>组件的整个生命周期是保持不变的</code><ul><li>不然当前组件重新渲染几次，这个 ref 对象始终是同一个</li></ul></li></ul><p><strong>常用的用法</strong></p><ul><li>获取 DOM 元素、或者组件(但是需要 class 组件)</li><li>保存一个数据，解决必包陷阱问题，可参考 useCallback 案例</li></ul><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import React, { memo, useRef } from &#39;react&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const App = memo(() =&gt; {</span></span>
<span class="line"><span>  const titleRef = useRef()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;div&gt;</span></span>
<span class="line"><span>      &lt;h2 ref={titleRef}&gt;Hello 拿捏&lt;/h2&gt;</span></span>
<span class="line"><span>      &lt;button onClick={(e) =&gt; console.log(titleRef.current)}&gt;查看dom&lt;/button&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>  )</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default App</span></span></code></pre></div><h2 id="_2-9-useimperativehandle" tabindex="-1">2.9.useImperativeHandle <a class="header-anchor" href="#_2-9-useimperativehandle" aria-label="Permalink to &quot;2.9.useImperativeHandle&quot;">​</a></h2><p><strong>不常用</strong></p><ul><li>通过 useImperativeHandle 可以只暴露固定的操作</li></ul><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 如下案例场景是， 父组件想要操作子组件的input框，父组件拿到子组件input元素后可以做任何操作，但是子组件却希望父组件只能做获取焦点事件</span></span>
<span class="line"><span>// 这时候就需要借助useImperativeHandle，useImperativeHandle返回的是一个对象，父组件操作的实际是这个返回的对象，父组件只能操作该对象中有的方法</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 子组件</span></span>
<span class="line"><span>const YMIpt = memo(</span></span>
<span class="line"><span>  forwardRef((props, ref) =&gt; {</span></span>
<span class="line"><span>    const iptRef = useRef()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    useImperativeHandle(ref, () =&gt; {</span></span>
<span class="line"><span>      return {</span></span>
<span class="line"><span>        focus() {</span></span>
<span class="line"><span>          // 操作自己的input</span></span>
<span class="line"><span>          iptRef.current.focus()</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return (</span></span>
<span class="line"><span>      &lt;div&gt;</span></span>
<span class="line"><span>        &lt;input ref={iptRef} type=&quot;text&quot; /&gt;</span></span>
<span class="line"><span>      &lt;/div&gt;</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>// 父组件</span></span>
<span class="line"><span>const App = memo(() =&gt; {</span></span>
<span class="line"><span>  const iptRef = useRef()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  function handleClick() {</span></span>
<span class="line"><span>    iptRef.current.focus()</span></span>
<span class="line"><span>    // 无效的操作 子组件没提供该方法</span></span>
<span class="line"><span>    iptRef.current.value = &#39;&#39;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;div&gt;</span></span>
<span class="line"><span>      &lt;YMIpt ref={iptRef} /&gt;</span></span>
<span class="line"><span>      &lt;button onClick={handleClick}&gt;操作DOM&lt;/button&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>  )</span></span>
<span class="line"><span>})</span></span></code></pre></div><h2 id="_2-10-uselayouteffect" tabindex="-1">2.10.useLayoutEffect <a class="header-anchor" href="#_2-10-uselayouteffect" aria-label="Permalink to &quot;2.10.useLayoutEffect&quot;">​</a></h2><ul><li>useLayoutEffect 和 useEffect 很相似，只有一点区别 <ul><li><code>useEffect</code>会在<code>渲染内容更新到DOM</code>上<code>之后</code>执行，不会阻塞 DOM 的更新</li><li><code>useLayoutEffect</code>会在<code>渲染的内容更新到DOM</code>上<code>之前</code>执行，会阻塞 DOM 的更新</li></ul></li><li>官方给的建议是：<code>useLayoutEffect</code> 可能会影响性能。尽可能使用 <a href="https://zh-hans.react.dev/reference/react/useEffect" target="_blank" rel="noreferrer"><code>useEffect</code></a>。</li><li>用法：<strong>useLayoutEffect(setup, dependencies?)</strong></li></ul><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 下面案例 点击按钮设置count的值为0</span></span>
<span class="line"><span>// 如果在useEffect中进行判断  因为useEffect是在屏幕出现内容之后执行，所以会先设置成0，然后才设置成判断的值，会有一个闪烁的效果</span></span>
<span class="line"><span>// 如果在useLayoutEffect中判断， 因为useLayoutEffect是在屏幕出现内容之前执行，所以页面不会显示0，也不会有闪烁的效果</span></span>
<span class="line"><span>const App = memo(() =&gt; {</span></span>
<span class="line"><span>  const [count, setCount] = useState(99)</span></span>
<span class="line"><span>  // 当内容显示到屏幕上之后执行，会阻塞DOM</span></span>
<span class="line"><span>  // useLayoutEffect(() =&gt; {</span></span>
<span class="line"><span>  //   console.log(&#39;useLayoutEffect：我第二执行&#39;)</span></span>
<span class="line"><span>  //   if (count === 0) {</span></span>
<span class="line"><span>  //     setCount(Math.random() + 99)</span></span>
<span class="line"><span>  //   }</span></span>
<span class="line"><span>  // })</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 当内容显现到屏幕上之后才执行 不会阻塞DOM</span></span>
<span class="line"><span>  useEffect(() =&gt; {</span></span>
<span class="line"><span>    console.log(&#39;useEffect：我第三执行&#39;)</span></span>
<span class="line"><span>    if (count === 0) {</span></span>
<span class="line"><span>      setCount(Math.random() + 99)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  console.log(&#39;app render:我第一执行&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;div&gt;</span></span>
<span class="line"><span>      &lt;h1&gt;count:{count}&lt;/h1&gt;</span></span>
<span class="line"><span>      &lt;button onClick={(e) =&gt; setCount(0)}&gt;click&lt;/button&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>  )</span></span>
<span class="line"><span>})</span></span></code></pre></div><h2 id="_2-11-自定义-hook" tabindex="-1">2.11.自定义 Hook <a class="header-anchor" href="#_2-11-自定义-hook" aria-label="Permalink to &quot;2.11.自定义 Hook&quot;">​</a></h2><ul><li>自定义 Hook 本质上只是一种函数代码逻辑的抽取，严格意义上来说，他并不算 React 的特性</li><li>案例在另一个代码库中</li></ul><h2 id="_2-12-redux-中的-hook" tabindex="-1">2.12.redux 中的 Hook <a class="header-anchor" href="#_2-12-redux-中的-hook" aria-label="Permalink to &quot;2.12.redux 中的 Hook&quot;">​</a></h2><ul><li>在之前的 redux 开发中，为了让组件和 redux 结合起来，使用了 react-redux 中的 conne <ul><li>但是这种方式 必须使用高阶函数结合返回的高阶组件</li><li>且必须编写：mapStateToProps 和 mapStateToDispatch 映射函数 比较麻烦</li></ul></li><li>在 Redux7.1 开始，<code>提供了Hook的方式</code>简便了使用 stroe 数据的写法（只是换了使用 store 的方式 创建 store 还是和之前一样）</li><li>使用<code>useSelector</code>和<code>useDispatch</code>两个 hook 来完成<code>读取和操作</code>redux 中数据</li><li>还可以使用 useStore 来获取整个 store（不推荐）</li></ul><p><strong>useSelector 和 useDispatch</strong></p><ul><li><code>useSelector</code>的作用是将 sate 映射到组件中，有两个参数 <ul><li>·<strong>参数一</strong>：将 state 映射到需要的数据中 <ul><li><code>需要传入一个回调</code>，回调函数的<code>参数</code>是 stroe 的<code>state</code></li></ul></li><li><strong>参数二</strong>：可以进行比较来决定是否组件重新渲染</li></ul></li><li><code>useDispatch</code>作用就是返回一个 dispatch 函数，用来派发事件</li></ul><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import React, { memo } from &#39;react&#39;</span></span>
<span class="line"><span>import { shallowEqual, useDispatch, useSelector } from &#39;react-redux&#39;</span></span>
<span class="line"><span>import { addNumberAction } from &#39;./store/features/counter&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// useSelector第二个参数的作用</span></span>
<span class="line"><span>// 案例中 在APP和Home组件中 都是用了store中的数据  App中使用的是counter Home中使用的是message</span></span>
<span class="line"><span>// 现在 在App中派发一个事件去修改counter  这时候Home组件重新渲染了 这是有损性能的 因为Home中压根没用到counter</span></span>
<span class="line"><span>// 原因是因为 useSelector Hook 在不传入第二个参数的情况下 默认会监听store中的所有数据，如果有数据变化了就会使得组件重新渲染</span></span>
<span class="line"><span>// 解决 只需要在使用useSelector的时候传入第二个参数即可  这个参数可以是函数然后在里面判断时候要渲染 这个不常用     还可以使用react-redux 提供的shallowEqual函数</span></span>
<span class="line"><span>// shallowEqual函数会做一个浅层的比较 从而判断是否要重新渲染组件</span></span>
<span class="line"><span>// 添加完第二个参数后 就不会发生案例的情况了</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>const App = memo(() =&gt; {</span></span>
<span class="line"><span>   // 1.使用useSelector将redux中store的数据映射到组件内部</span></span>
<span class="line"><span>  const { count } = useSelector(</span></span>
<span class="line"><span>    (state) =&gt; ({</span></span>
<span class="line"><span>      count: state.counter.counter,</span></span>
<span class="line"><span>    }),</span></span>
<span class="line"><span>    shallowEqual</span></span>
<span class="line"><span>  )</span></span>
<span class="line"><span>  // 2.获取dispatch</span></span>
<span class="line"><span>  const dispathc = useDispatch()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  function handleClick(num) {</span></span>
<span class="line"><span>    // 3.派发dispatch</span></span>
<span class="line"><span>    dispathc(addNumberAction(num))</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  console.log(&#39;App render&#39;)</span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;div&gt;</span></span>
<span class="line"><span>      &lt;h1&gt;count:{count}&lt;/h1&gt;</span></span>
<span class="line"><span>      &lt;button onClick={(e) =&gt; handleClick(1)}&gt;+1&lt;/button&gt;</span></span>
<span class="line"><span>      &lt;Home /&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>  )</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>const Home = memo(() =&gt; {</span></span>
<span class="line"><span>  console.log(&#39;Home render&#39;)</span></span>
<span class="line"><span>  const { message } = useSelector(</span></span>
<span class="line"><span>    (state) =&gt; ({</span></span>
<span class="line"><span>      message: state.counter.message,</span></span>
<span class="line"><span>    }),</span></span>
<span class="line"><span>    shallowEqual</span></span>
<span class="line"><span>  )</span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;div&gt;</span></span>
<span class="line"><span>      &lt;h2&gt;Home:{message}&lt;/h2&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>  )</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default App</span></span></code></pre></div><h2 id="_2-13-useid" tabindex="-1">2.13.useId <a class="header-anchor" href="#_2-13-useid" aria-label="Permalink to &quot;2.13.useId&quot;">​</a></h2><p>学完 ssr 之后再补充</p><h2 id="_2-14-usetransition" tabindex="-1">2.14.useTransition <a class="header-anchor" href="#_2-14-usetransition" aria-label="Permalink to &quot;2.14.useTransition&quot;">​</a></h2><ul><li>官网解释：返回一个状态值表示过渡任务的等待状态，以及一个启动该过渡任务的函数</li><li>个人理解：<strong>实际上就是告诉 react 对于某部分任务的更新优先级较低，可以稍后进行更新</strong></li></ul><p><strong>只有当数据量很大的时候适合使用这个 像下面案例中那样</strong></p><p><strong>返回值</strong></p><ul><li>返回一个数组</li><li>第一项是一个 boolean 表示：<code>过渡的状态</code><ul><li>默认状态是 false。如果启动了过渡函数 该状态是 true。</li></ul></li><li>第二项是一个函数 表示<code>启动该过渡任务</code><ul><li>这个函数接受一个回调</li></ul></li></ul><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import React, { memo, useState, useTransition } from &#39;react&#39;</span></span>
<span class="line"><span>import { users } from &#39;./namesArray&#39;</span></span>
<span class="line"><span>import &#39;./style.css&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// useTransition作用</span></span>
<span class="line"><span>// 案例中 有1万条数据用于展示在页面中 当我们输入时会触发input事件，会从1万条数据中匹配输入的内容</span></span>
<span class="line"><span>// 会看到这么一个现象 当我们输入的时候，按下键盘，此时界面上会停顿约1s之后才会将内容显示在输入框中  原因是当输入的时候会触发input事件 就会枚举这1万条数据 这就会导致页面出现上述现象 这会让用户感到很不舒服</span></span>
<span class="line"><span>// 正确做法应该是 先显示输入的内容 在执行input事件  所以可以借助于useTransition 当输入的时候 告诉react  input事件中setTransition包裹的内容优先级较低 稍后进行更新</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const App = memo(() =&gt; {</span></span>
<span class="line"><span>  const [infos, setInfos] = useState(users)</span></span>
<span class="line"><span>  const [pending, setTransition] = useTransition()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  function handleInput(e) {</span></span>
<span class="line"><span>    setTransition(() =&gt; {</span></span>
<span class="line"><span>      const target = e.target.value</span></span>
<span class="line"><span>      const filterNames = users.filter((item) =&gt; item.username.includes(target))</span></span>
<span class="line"><span>      setInfos(filterNames)</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;div&gt;</span></span>
<span class="line"><span>      &lt;h1&gt;names&lt;/h1&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      &lt;div className=&quot;search&quot;&gt;</span></span>
<span class="line"><span>        &lt;input</span></span>
<span class="line"><span>          type=&quot;text&quot;</span></span>
<span class="line"><span>          placeholder=&quot;请输入要搜索的名称🔍&quot;</span></span>
<span class="line"><span>          onInput={(e) =&gt; handleInput(e)}</span></span>
<span class="line"><span>        /&gt;</span></span>
<span class="line"><span>        {/* &lt;button&gt;search&lt;/button&gt; */}</span></span>
<span class="line"><span>      &lt;/div&gt;</span></span>
<span class="line"><span>      {pending ? (</span></span>
<span class="line"><span>        &lt;h1&gt;loading...&lt;/h1&gt;</span></span>
<span class="line"><span>      ) : (</span></span>
<span class="line"><span>        &lt;ul&gt;</span></span>
<span class="line"><span>          {infos.map((item) =&gt; (</span></span>
<span class="line"><span>            &lt;li key={item.userId}&gt;</span></span>
<span class="line"><span>              &lt;div className=&quot;name&quot;&gt;{item.username}&lt;/div&gt;</span></span>
<span class="line"><span>              &lt;div className=&quot;info&quot;&gt;</span></span>
<span class="line"><span>                {/* &lt;img src={item.avatar} alt=&quot;&quot; /&gt; */}</span></span>
<span class="line"><span>                &lt;span&gt;</span></span>
<span class="line"><span>                  &lt;i&gt;email:&lt;/i&gt; {item.email}</span></span>
<span class="line"><span>                &lt;/span&gt;</span></span>
<span class="line"><span>              &lt;/div&gt;</span></span>
<span class="line"><span>            &lt;/li&gt;</span></span>
<span class="line"><span>          ))}</span></span>
<span class="line"><span>        &lt;/ul&gt;</span></span>
<span class="line"><span>      )}</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>  )</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default App</span></span></code></pre></div><h2 id="_2-15-usedeferredvalue" tabindex="-1">2.15.useDeferredValue <a class="header-anchor" href="#_2-15-usedeferredvalue" aria-label="Permalink to &quot;2.15.useDeferredValue&quot;">​</a></h2><ul><li>官方解释：<strong>useDeferredValue 接受一个值，并且返回该值的新副本，该副本将推迟到更紧急地更新之后</strong></li><li>其实 useDeferredValue 效果和 useTransition 是一样的，<code>只不过useDeferredValue需要接受一个值且返回的是该值的副本，react在渲染的时候发现是useDeferredValue的副本之后 就会推迟更新</code></li><li>所以如果想要做 loading 效果选择使用 useTransition</li></ul><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import React, { memo, useDeferredValue, useState } from &#39;react&#39;</span></span>
<span class="line"><span>import { users } from &#39;./namesArray&#39;</span></span>
<span class="line"><span>import &#39;./style.css&#39;</span></span>
<span class="line"><span>// useDeferredValue作用</span></span>
<span class="line"><span>// 作用和useTransition作用一样 只不过返回的是传入值的副本</span></span>
<span class="line"><span>// 案例中 有1万条数据用于展示在页面中 当我们输入时会触发input事件，会从1万条数据中匹配输入的内容</span></span>
<span class="line"><span>// 会看到这么一个现象 当我们输入的时候，按下键盘，此时界面上会停顿约1s之后才会将内容显示在输入框中  原因是当输入的时候会触发input事件 就会枚举这1万条数据 这就会导致页面出现上述现象 这会让用户感到很不舒服</span></span>
<span class="line"><span>// 正确做法应该是 先显示输入的内容 在执行input事件  所以可以借助于useDeferredValue 当react发现更新的是useDeferredValue产生的副本时候，就会延迟更新该副本做造成的渲染</span></span>
<span class="line"><span>const App = memo(() =&gt; {</span></span>
<span class="line"><span>  const [infos, setInfos] = useState(users)</span></span>
<span class="line"><span>  const deferredValue = useDeferredValue(infos)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  function handleInput(e) {</span></span>
<span class="line"><span>    const target = e.target.value</span></span>
<span class="line"><span>    const filterNames = users.filter((item) =&gt; item.username.includes(target))</span></span>
<span class="line"><span>    setInfos(filterNames)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;div&gt;</span></span>
<span class="line"><span>      &lt;h1&gt;names&lt;/h1&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      &lt;div className=&quot;search&quot;&gt;</span></span>
<span class="line"><span>        &lt;input</span></span>
<span class="line"><span>          type=&quot;text&quot;</span></span>
<span class="line"><span>          placeholder=&quot;请输入要搜索的名称🔍&quot;</span></span>
<span class="line"><span>          onInput={(e) =&gt; handleInput(e)}</span></span>
<span class="line"><span>        /&gt;</span></span>
<span class="line"><span>        {/* &lt;button&gt;search&lt;/button&gt; */}</span></span>
<span class="line"><span>      &lt;/div&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      &lt;ul&gt;</span></span>
<span class="line"><span>        {deferredValue.map((item) =&gt; (</span></span>
<span class="line"><span>          &lt;li key={item.userId}&gt;</span></span>
<span class="line"><span>            &lt;div className=&quot;name&quot;&gt;{item.username}&lt;/div&gt;</span></span>
<span class="line"><span>            &lt;div className=&quot;info&quot;&gt;</span></span>
<span class="line"><span>              {/* &lt;img src={item.avatar} alt=&quot;&quot; /&gt; */}</span></span>
<span class="line"><span>              &lt;span&gt;</span></span>
<span class="line"><span>                &lt;i&gt;email:&lt;/i&gt; {item.email}</span></span>
<span class="line"><span>              &lt;/span&gt;</span></span>
<span class="line"><span>            &lt;/div&gt;</span></span>
<span class="line"><span>          &lt;/li&gt;</span></span>
<span class="line"><span>        ))}</span></span>
<span class="line"><span>      &lt;/ul&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>  )</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default App</span></span></code></pre></div>`,98)]))}const g=n(l,[["render",t]]);export{h as __pageData,g as default};
