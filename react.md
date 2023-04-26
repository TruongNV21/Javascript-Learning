# I. ES6
## 1. Enhanced object literals
là cách viết ngắn gọn trong ES6 trong các trường hợp sau: 
**1. Định nghĩa key và value cho object**
```javascript
let a =1, b=2, c=3;
let obj = {
    a,
    b,
    c
}
console.log(obj)
\\Log: 
Object
a: 1
b: 2
c: 3
\\
```
**2. Định nghĩa method cho object**
```javascript
let obj = {
    sum(a,b){
        return a+b;
    }
}

```
**3. Định nghĩa key cho object dưới dạng biến.**
```javascript
let a= 'name';
let obj = {
    [a]: 'Truong'
}
console.log(obj)
\\Log:
{name: Truong}
```

## 2. Destructuring
là một cú pháp cho phép bạn gán các thuộc tính của một Object hay một Array. Có hai loại Destructuring là Destructuring Object và Destructuring Array.
```javascript
var a, b;
[a, b] = [1, 2]
console.log(a, b); //1 2

//or 

const [a, b] = [1, 2]
console.log(a, b); //1 2

//or
const [a, , c] = [1,2,3]
console.log(a,c); //1 3

//or 
const [a, b, ...c] = [1, 2, 3, 4, 5]
console.log(a, b, c) ; //1, 2, [3, 4, 5]
// đây sử dụng rest params hay rest es6
```

**Destructuring với Object**
```javascript
const {a, b} = {a: 1, b: 2};
console.log(a, b);// 1, 2

// add c 

const {a, b, c} = {a: 1, b: 2, c: () => 3}
console.log(a, b, c)// 1, 2, () => 3

// add ...c

const {a, b, ...c} = {a: 1, b: 2, c: () => 3, d: 4}
console.log(a, b, c)// 1, 2, {d: 4, c: f} với f = () => 3
```
***Để dùng đúng cú pháp thì tên biến được gán giá trị phải cùng với tên key của object***
```javascript
const {e, b, c} = {a: 1, b: 2, c: () => 3}
console.log(e, b, c)// undefined , 2, () => 3
```
***Ta cũng có thể gán giá trị mặc định cho biến trong trường hợp tên biến không trùng với bất kì key nào trong object. Nếu trong tên biến trùng với tên key trong object thì giá trị của biến sẽ được gán bằng giá trị của key tương ứng, nếu không thì được gán cho giá trị mặc định và không bị xảy ra lỗi cú pháp.***
```javascript
const {a = 12, b, c} = { b: 2, c: () => 3}
console.log(a, b, c)// 12 , 2, () => 3
```
***Ngoài ra, ta cũng có thể thay đổi tên biến sao cho không trùng với key của object nữa***
```javascript
const {a:d, b, c} = {a: 1, b: 2, c: () => 3}
console.log(d, b, c)// 12 , 2, () => 3
```
**Một số ứng dụng của Destructuring**
***1. Gán giá trị cho biến***
    Ví dụ trong trường hợp Rest API trả về một array hoặc object thì khi sử dụng destructuring lúc này thì hiệu quả: 
```javascript
    const res = [1, 2, 3, 4,] ;//res.response();
    const [a, b, c] = res
    console.log(a, b, c);//1 2 3
```

***2. Swapping***
```javascript
var a = 1;
var b = 2;
[a, b] = [b, a]
console.log(a, b) ;//2, 1
```
***3. Bỏ qua giá trị***

```javascript
const res = () => [1, 2, 3]
const [a, ,b] = res()
console.log(a, b) ;//1,3
```
***4. Gán giá trị cho các biến mới***

```javascript
const res = {blog: 'anonystick.com', type: 'javascript'}
const {blog: nameBlog, type: newType} = res;
console.log(nameBlog, newType);//anonystick.com, javascript
```


**Phân biệt Rest và Spread operator**
Giống nhau: có cùng cú pháp là 3 dấu chấm
Khác nhau: 
+ Rest: cho phép chúng ta chuyển một đối số không xác định cho hàm bằng cách phân ra chúng ra thành một mảng,
+ Spread: phân rã các giá trị trong mảng hoặc chuỗi hay thậm chí cả object thành các phần tử riêng lẻ.
# JSX - Javascript XML
JSX không phải là một chuỗi kí tự cũng không phải là là HTML, nó là một cú pháp mở rộng cho JS để mô tả giao diện người dùng UI. Nó đi kèm với toàn bộ tính năng của JS và tạo ra những ReactElement 

+ là tiêu chuẩn cho JS XML
+ cho phép viết HTML trong React và thêm chúng vào DOM mà không cần dùng đến createELement() và appendChild()

**Một số quy tắc của JSX:**
1. Trả về duy nhất 1 phần từ nguyên gốc
```javascript
<>
  <h1>Hedy Lamarr's Todos</h1>
  <img 
    src="https://i.imgur.com/yXOvdOSs.jpg" 
    alt="Hedy Lamarr" 
    class="photo"
  >
  <ul>
    ...
  </ul>
</>
///Nếu muốn không trả về phần tử bao rỗng thì dùng React.Fragment - tương tự như document.fragment
```
1. Đóng tất cả các thẻ
2. camelCase tất cả mọi thứ
## Children Props
+ Có 2 cách để truyền giá trị cho 1 props là: sử dụng string literals hoặc sử dụng expression
+ Props mặc định là true
+ Children props: là tất cả những gì inside 1 component

```javascript
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  );
}
```
## Props: 
là object thể hiện các tham số hay đối số truyền vào component 
# Phân biệt NPM NPX và YARN

```


```
**1. NPM**
- Project scope
    + npm install <tên thư viện> => cài vào dependencies
    + npm i <tên thư viện>

    + npm install --save-dev <tên thư viện> => cài vào devDependencies
    + npm i -D <tên thư viện>

    + npm uninstall <tên thư viện>
- Project global
    + npm i --global <tên thư viện>
    + npm i -g <tên thư viện>

    + npm uninstall -g <tên thư viện>
  
**2. NPX**
  là công cụ CLI(Command-Line Interface) với mục đích là làm cho việc cài đặt vào quản lý nhưng thư viện phụ thuộc được lưu trữ trên NPM Registry. NPX ngoài việc thực thi những thư viện đã được cài đặt sẵn trong nội bộ dự án, thì có thể thực thi những thư viện mà chưa đưuọc cài đặt.
**3. YARN:** tương tự như NPM nhưng ra đời sau nên có nhiều tính năng cải thiện về mặt hiệu suất và bảo mật hơn so với NPM. Nếu muốn nhanh thì dùng YARN, còn nếu ít bộ nhớ thì dùng NPM 
# Hook
  là các hàm đơn giản mà chúng ta có thể sử dụng để tách thành phần tái sử dụng khỏi thành phần chức năng. Hook có thể có trạng thái và có thể có quản lý tác dụng phụ.
  
  Hook chỉ dùng với Function Component.
  
  Các hàm build-in hooks:

## 1. useState()
  Dùng useState khi muốn dữ liệu thay đổi thì giao diện tự động được cập nhật
**1. Cách dùng**
```javascript
  import {useState} from 'react'

  const [state, setState] = useState(initState)
```
  Trong đó: 
  + initState là để khai báo giá trị khởi tạo cho state, chỉ được dùng duy nhất trong lần đầu tiên.
  + state: để lưu trạng thái của dữ liệu, nó chỉ được cập nhật dữ liệu sau mỗi lần Component được re-render.
  + setState: là hàm để thay đổi dữ liệu

***Giá trị trả về của useState là một mảng.***

### Lưu ý:
+ Component được re-render sau khi 'setState'
+ initState chỉ được dùng cho lần đầu và có thể nhận giá trị trả về của một callback
  ```
  function App() {
  const [token] = useState(()=>{
    let token = window.localStorage.getItem('my-token')
    return token || 'default#-token#'
  })

  return(
    <div className="wrapper">
      <p>Token is {token}</p>
    </div>
  )
  }
  ```
+ setState với callback

```
function App() {
  const [counter,setCounter] = useState(1)

  const handleInCrease = ()=>{
    setCounter(counter + 1)
    setCounter(counter + 1)
    setCounter(counter + 1)
  }

  ///Trường hợp này thì biến counter chỉ tăng lên 1 đơn vị vì biến counter chỉ được cập nhật giá trị sau mỗi lần hàm handleInCrease được chạy.
  return (
    <div className="App">
      <h1>{counter}</h1>
      <button onClick={handleInCrease}>InCrease</button>
    </div>
  );
}
```

```
function App() {
  const [counter,setCounter] = useState(1)

  const handleInCrease = ()=>{
    setCounter(preCounter => preCounter +1);
    setCounter(preCounter => preCounter +1);
    setCounter(preCounter => preCounter +1);
  }

  /// Còn trường hợp này thì, sau mỗi lần bấm nút button thì giá trị của biến counter sẽ tăng lên 3 đơn vị. Bởi vì hàm setCounter trả lại cho callback một đối số là giá trị hiện tại của counter. Nhưng vẫn chỉ re-render lại đúng 1 lần.
  return (
    <div className="App">
      <h1>{counter}</h1>
      <button onClick={handleInCrease}>InCrease</button>
    </div>
  );
}
```
### Mounted and Unmounted
+ Mounted là thời điểm component được gán vào DOM
+ Unmounted là thời điểm component được gỡ khỏi DOM


## 2. useEfect()
+ Callback luôn được gọi sau khi component mounted
+ callback luôn được gọi sau cùng khi render component.
```
 const [state, setState] = useState('')

  useEffect(()=>{
    console.log('This is callback')
  })

  console.log('Mounted')

  return (
    <div>
      <input
        value = {state}
        onChange={(e)=>setState(e.target.value)}
      />
      
    </div>
  )


////Log: 
Mounted
This is callback
```
  
  
### 2.1 useEffect(callback)
- Callback được gọi sau mỗi lần component được re-render
- Phần return để render UI sẽ được ưu tiên thực thi trước phần callback của useEffect
  Như trong ví dụ sau thì 'Render' sẽ được log ra trước 'Mounted'

```
function Content(){
  const [state, setState] = useState('')

  useEffect(()=>{
    console.log('Mounted')
  })

  return (
    <div>
      <input
        value = {state}
        onChange={(e)=>setState(e.target.value)}
      />
      {console.log('Render')}
    </div>
  )
}
```
### 2.2 useEffect(callback,[])
- Chỉ được gọi sau khi component được mounted. Ứng dụng trong trường hợp call API 1 lần để lấy dữ liệu.
### 2.3 useEffect(callback,dependencies)
+ Callback được gọi lại sau mỗi lần dependencies thay đổi.
+ Trong đó, dependencies được hiểu như là một biến, có thể gán bằng giá trị của biến khác trong component và cả ngoài component.
```
const tabs = ['posts','users','albums']


function Content(){
  const [title, setTitle] = useState('');
  const [type, setType] = useState('users')
  const [posts, setPosts] = useState([]);
  const apiRoot = 'https://jsonplaceholder.typicode.com/';

  useEffect(()=>{
    fetch(apiRoot.concat(type))
      .then(res=>res.json())
      .then(posts => setPosts(posts))
  },[type])

  return (
    <div>
      <input
        value = {title}
        onChange={(e)=>{
          setTitle(pre=>{
            document.title = e.target.value;
            return e.target.value;
          })
        }}
      />

      {
        tabs.map(tab=>{
          return(
            <button
              key={tab}
              style = {type == tab ? {
                color: '#fff',
                backgroundColor: '#000'
              }:{}}
              onClick={()=>setType(tab)}
             >
              {tab}
            </button>
          )
        })
      }

      <ul>
        {
          posts.map(post=>{
            return(
              <li key = {post.id}>{post.title? post.title: post.name}</li>
            )
          })
        }
      </ul>
    </div>
  )
}
```

#### useEffect() with DOM event
```
const tabs = ['posts','users','albums']


function Content(){
  const [title, setTitle] = useState('');
  const [type, setType] = useState('users')
  const [posts, setPosts] = useState([]);
  const [showGoToTop,setShowGoToTop] = useState(false)
  const apiRoot = 'https://jsonplaceholder.typicode.com/';

  console.log('Re-render');

  useEffect(()=>{
    fetch(apiRoot.concat(type))
      .then(res=>res.json())
      .then(posts => setPosts(posts))
  },[type])

  useEffect(()=>{
    const handleScroll = ()=>{
      setShowGoToTop(window.scrollY>=200)
    }
    window.addEventListener('scroll',handleScroll)
  },[])

  return (
    <div>
      <input
        value = {title}
        onChange={(e)=>{
          setTitle(pre=>{
            document.title = e.target.value;
            return e.target.value;
          })
        }}
      />

      {
        tabs.map(tab=>{
          return(
            <button
              key={tab}
              style = {type == tab ? {
                color: '#fff',
                backgroundColor: '#000'
              }:{}}
              onClick={()=>setType(tab)}
             >
              {tab}
            </button>
          )
        })
      }

      <ul>
        {
          posts.map(post=>{
            return(
              <li key = {post.id}>{post.title? post.title: post.name}</li>
            )
          })
        }
      </ul>
      {showGoToTop && (
        <button
          onClick={()=>{
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
            setShowGoToTop(!showGoToTop);
          }}
          style ={{
            position: 'fixed',
            right: '20px',
            bottom: '20px',
            scrollBehavior: 'smooth'
          }}
        >
          Go to top
        </button>
      )}
    </div>
  )
}
```

Trong trường hợp này xảy ra tình trạng leak memory do khi component đã được unmounted nhưng đối tương Window thì vẫn lắng nghe sự kiện scroll.
Để khắc phục tình trạng này, cần dùng Cleanup để xử lý tại thời điểm unmounted.
```
  useEffect(()=>{
    const handleScroll = ()=>{
      setShowGoToTop(window.scrollY>=200)
    }
    window.addEventListener('scroll',handleScroll)
    return ()=>{
      window.removeEventListener('scroll',handleScroll)
    }
  },[])
```
### useEffect() with Timer Function: setInterval, setTimeOut,...

Tương tự như khi dùng useEffect với DOM Event thì khi dùng với Timer Function cũng gây ra tình trạng leak memory, cách xử lý cũng tương tự là sẽ clearTimer trước khi unmounted
```
function App(){
  const [countdown, setCountdown] = useState(180);

  useEffect(()=>{
    const timerId = setInterval(()=>{
      setCountdown(pre=>{
        return pre -1;
      })

      console.log("Countdownning...");
    },1000)

    return ()=>clearInterval(timerId)
  },[])

  return(
    <div>
      {countdown}
    </div>
  )
}
```

### useEffect() và lưu ý
*Cleanup Function là hàm được return về khi sử dụng useEffect()*
+ luôn được gọi trước khi component unmounted
+ luôn được gọi trước khi callback được gọi( trừ lần mounted). Đây chính là lý do để hàm cleanup thực hiện được chức năng của mình
  
```
function App(){
  const [avatar, setAvatar] = useState();

  const changeAva = (e)=>{
    const file = e.target.files[0]
    file.preview = URL.createObjectURL(file)
    setAvatar(file)
  }

  useEffect(()=>{
    return () =>{
        avatar && URL.revokeObjectURL(avatar.preview)
    }
  },[avatar])

 
  
  

  return(
    <div>
      <input
        type='file'
        multiple
        onChange={changeAva}
      />
      
      {
        avatar &&
        <img
        src={avatar.preview}
        style={
          {
            display: 'block',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            backgroundColor: '#ccc'
          }
        }
      />
      }

    </div>
  )
}
```

Trong đoạn code trên, sau mỗi lần thay đổi ảnh thì component được render lại do useState, nhưng trong useEffect thì chính Cleanup đã xóa dữ liệu của URL.createObjectURL
## 3. useLayoutEffect()
  Hoạt động và tính năng tương tự như useEffect nhưng được cải thiện trong một số trường hợp về giao diện người dùng.
### 3.1 Cách thức hoạt động của useLayoutEffect()
1. Cập nhật lại state
2. Cập nhật lại DOM (mutated)
3. Gọi cleanup nếu dependencies thay đổi(sync)
4. Gọi callback trong useLayoutEffect
5. Render lại UI

### 3.2 Cách thức hoạt động của useEffect()
1. Cập nhật lại state
2. Cập nhật lại DOM (mutated)
3. Render lại UI
4. Gọi cleanup nếu dependencies thay đổi 
5. Gọi callback trong useEffect

```
function App(){
    const [count, setCount] = useState(1)
    function handleRun(){
        setCount(count + 1)
    }

    useEffect(()=>{
        if(count>3){
            setCount(0);
        }
    },[count])

    return(
        <div>
            <p>{count}</p>
            <button
                onClick ={handleRun}
            >
                Run
            </button>
        </div>
    )
}
```


## 4. useRef()
dùng để lưu giá trị bất kì qua một tham chiếu bên ngoài Component
```
function App(){
    const [count, setCount] = useState(60)

    let timerId;

    const handleStart =()=>{
        timerId = setInterval(()=>{
            setCount(preCount=>preCount-1)
        },1000)

        console.log('Start->',timerId)
    }

    const handleStop = ()=>{
        clearInterval(timerId)
        console.log('Stop->',timerId)

    }

    return(
        <div>
            <p>{count}</p>
            <button onClick={handleStart}>Start</button>
            <button onClick={handleStop}>Stop</button>
        </div>
    )
}


userRef(initialValue)
+ nhận đối số là giá trị khởi tạo
+ trả về một object có property current là giá trị khởi tạo được truyền vào

```
Vì mỗi hàm đều có phạm vi khác nhau trong mỗi lần gọi khác nhau, nên trong ví dụ này kể từ 1000ms đầu tiên trở đi khi ta ấn stop thì không thể clearInterval(timerId) đúng với timerId nữa. Do đó không thể dừng việc đếm ngược này được.

Và useRef() sinh ra để giải quyết vấn đề này.

```
function App(){
    const [count, setCount] = useState(60)

    const ref = useRef('Hello')

    console.log(ref)

    const handleStart =()=>{
       ref.current = setInterval(()=>{
        setCount(preCount=>preCount -1)
       },1000)
    }

    const handleStop = ()=>{
        clearInterval(ref.current)
        console.log('Stop->',ref.current)

    }

    return(
        <div>
            <p>{count}</p>
            <button onClick={handleStart}>Start</button>
            <button onClick={handleStop}>Stop</button>
        </div>
    )
}

```
Trong đoạn code trên, biến ref được trả về bởi useRef có thể truy cập từ tại mọi thời điểm, kể cả khi component được render lại.

## React.memo HOC - Higher Order Component
  để tránh render lại component trong những tình huống không cần thiết. Cách hoạt động của memo là check các props của component có bị thay đổi trước mỗi lần render, nếu chỉ cần 1 props thay đổi thì sẽ được component sẽ được render.
```javascript
function App(){
    const [count, setCount] = useState(60)

    const ref = useRef('Hello')
    const preCount = useRef()
    const refH1 = useRef()


    useEffect(()=>{
        const rect = refH1.current.getBoundingClientRect()
        console.log(rect)
    },[])

    useEffect(()=>{
        preCount.current = count;
        // console.log('Render')
    },[count])

    const handleStart =()=>{
       ref.current = setInterval(()=>{
        setCount(preCount=>preCount -1)
       },1000)
    }

    const handleStop = ()=>{
        clearInterval(ref.current)

    }

    // console.log('Mounted');
    // console.log(count, preCount.current)

    return(
        <div>
            <Heading count={count} />
            <h1 ref={refH1}>{count}</h1>
            <button onClick={handleStart}>Start</button>
            <button onClick={handleStop}>Stop</button>
        </div>
    )
}


import {memo} from 'react'

function Heading({count}){
    console.log('re-render');
    return(
        <div>
            <h1>Hello anh em!!! {count}</h1>
        </div>
    )
}

export default memo(Heading)
```


## useCallback()
  dùng để tránh tạo ra những hàm mới không cần thiết trong function component. 
  Được sử dụng kết hợp với memo(). Trường hợp, không muốn re-render component con khi đã sử dụng memo, mà component còn có props là 1 dữ liệu kiểu reference trong component cha thì khi này memo sẽ không có tác dụng.
Cần hiểu được 
  + Reference types 
  + React memo()
**Vấn đề:**
```javascript
function App(){
    const [count, setCount] = useState(0);
    
    const handleIncrease = ()=>{
        setCount(preCount => preCount + 1)
    }
    
    return (
        <div>
            <Heading onIncrease = {handleIncrease} />
            <h1>{count}</h1>
        </div>
    )
}

import {memo} from 'react'

function Heading({onIncrease}){
    console.log('re-render');
    return(
        <div>
            <h1>Hello anh em!!!</h1>
            <button onClick={onIncrease}>
                Click me!
            </button>
        </div>
    )
}

export default memo(Heading)
```
Trong khi chạy đoạn code trên, cứ mỗi lần re-render component App thì component Heading cũng được render lại cùng mặc dù đã sử dụng React.memo(). Lý do là do props của Heading nhận được là referece type, nên mỗi lần App component re-render thì hàm handleIncrease đều được khởi tạo lại, mà mỗi lần khởi tạo đều lưu vào những vùng nhớ khác nhau. Nên khi so sánh các props đều trả về giá trị false, mặc dù logic hàm là như nhau.

Cách giải quyết vấn đề: 
```javascript
function App(){
    const [count, setCount] = useState(0);

    const handleIncrease = useCallback(()=>{
        setCount(preCount=>preCount + 1 )
    },[])
    
    return (
        <div>
            <Heading onIncrease = {handleIncrease} />
            <h1>{count}</h1>
        </div>
    )
}

```
***Cách hoạt động của useCallback:***
*Syntax: useCallack(callback,[])*
+ useCallback được gọi, nó tạo ra hàm callback được truyền vào, nhận tham chiếu và lưu ra ngoài phạm vi của component chưa nó. Và return lại tham chiếu đó cho biến được gán.
+ Khi re-render, nếu mảng chưa các dependencies trống thì nó sẽ trả các tham chiếu trước đó, thay vì trả về tham chiếu mới. Do đó, tham chiếu sẽ không bị thay đổi, nên khi có memo() so sánh sẽ không thấy sự thay đổi của component con nên component con sẽ không bị re-render.
+ Trong những trường hợp trong callback truyền vào sử dụng những biến ở ngoài phạm vị của callback, thì đưa nó vào mảng dependencies. Cách thức hoạt động như useEffect()

## useMemo()
```javascript
function App(){
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [products, setProduct] = useState([])

    const total = products.reduce((result, product)=>{
        console.log('Tinh toan lai...');
        return result + product.price}
        ,0)

    const handleSubmit = ()=>{
        setProduct([...products,{name: name,price: +price}])
    }

    return (
        <div style={{padding: '10px 30px'}}>
            <input
                width= '100%'
                value={name}
                onChange={(e)=>setName(e.target.value)}
                placeholder='Enter name...'
            />

            <input
                width= '100%'
                value={price}
                onChange={(e)=>setPrice(e.target.value)}
                placeholder='Enter price...'
            />

            <button onClick={handleSubmit}>Add</button>
            <br/>
            Total:{total}
            <ul>
                {
                    products && products.map((product, index)=>{
                        return(
                            <li key={index}>{product.name}</li>
                        )
                    })
                }
            </ul>

        </div>
    )
}

```
Trong đoạn code trên, mỗi lần re-render thì hàm reduce đều được gọi lại một cách không cần thiết. Như là trong trường hợp chỉ cần nhập vào input thì component cũng render lại nên hàm reduce cũng được thực thi mặc dù sản phẩm chưa được thêm vào

***Cách giải quyết:***
```javascript
function App(){
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [products, setProduct] = useState([])

    const total = useMemo(()=>{
        const result = products.reduce((result,product)=>{
            console.log('Tính toán lại...');
            return result + product.price;
        },0)
    },[products])

    const handleSubmit = ()=>{
        setProduct([...products,{name: name,price: +price}])
    }

    return (
        <div style={{padding: '10px 30px'}}>
            <input
                width= '100%'
                value={name}
                onChange={(e)=>setName(e.target.value)}
                placeholder='Enter name...'
            />

            <input
                width= '100%'
                value={price}
                onChange={(e)=>setPrice(e.target.value)}
                placeholder='Enter price...'
            />

            <button onClick={handleSubmit}>Add</button>
            <br/>
            Total:{total}
            <ul>
                {
                    products && products.map((product, index)=>{
                        return(
                            <li key={index}>{product.name}</li>
                        )
                    })
                }
            </ul>

        </div>
    )
}
```
***Cách hoạt động tương tự như useEffect hay useCallback***
*Syntax: useMemo(callback,[dependencise])*
+ thực hiện callback và trả về giá trị
+ chỉ khi mảng dependencies có sự thay đổi thì callback mới được thực hiện và trả về giá trị mới

## useReducer
tương tự như useState, useReducer được khuyên nên dùng trong những trường hợp component có nhiều state, state phụ thuộc nhau, state có cấu trúc phúc tạp như mảng nhiều cấp, object nhiều cấp,...

**Cách thức hoạt động của useState**
1. Init state
2. Action:

**Cách thức hoạt động của useReducer**
1. Init state
2. Action
3. Reducer
4. Dispatch
```javascript
const initState = 0;
function reducer(state, action){
    console.log('Reducer running...');
    switch(action){
        case 'up':
            return state + 1;
        case 'down': 
            return state -1;
        case 'reset':
            return 0;
        default:
            return state;
    }
}

function App(){
    const [count, dispatch] = useReducer(reducer, initState)


    return (
        <>
            <h1>{count}</h1>
            <button onClick={()=>dispatch('up')}>Up</button>
            <button onClick={()=>dispatch('down')}>Down</button>
            <button onClick={()=>dispatch('reset')}>Reset</button>
        </>
    )
}

```
**Cách hoạt động của đoạn code trên(Trong trường hợp ấn Up button):**
+ đầu tiên component được render lần đầu, count sẽ được gán bằng giá trị initState(chỉ gán cho lần đầu Mounted)
+ khi ấn Up button, dispatch sẽ hoạt động và đẩy đi bản tin 'up', khi đó reducer function được kích hoạt bởi action. Action được gắn bằng giá trị dispatch đã gửi đi. Xử lý logic trong reducer function và trả về giá trị cho state
+ Khi reducer thực thi xong, count sẽ được gán giá trị cho count
***Chú ý: giá trị trả về state phải cùng kiểu với initState***
  
<img src="https://dmitripavlutin.com/bba1ab69aedaaeebc68ceafbb0d304c3/react-usereducer.svg" alt="MarineGEO circle logo" style="height: 500px; width:500px;"/>

**useReducer với state phức tạp**
*Ví dụ về sử dụng useReducer() trong xử lý API để loading danh sách user*

```javascript
const initUser = {
    loading: false,
    data: [],
    err: null
}
const usersReducer = (state, action)=>{
    switch(action.type){
        case 'GET_USER_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'GET_USER_SUCCESS':
            return {
                ...state,
                loading: false,
                data: action.data
            }

        case 'GET_USER_ERROR':
            return {
                ...state,
                data: [],
                err: action.data
            }
    }
}


function App(){
    const [users, usersDispatch] = useReducer(usersReducer, initUser)

    const getUser = ()=>{
        usersDispatch({
            type: 'GET_USER_REQUEST'
        })

        setTimeout(()=>{
            fetch('https://jsonplaceholder.typicode.com/users')
            .then(res=>res.json())
            .then(res=>{
                usersDispatch({
                    type: 'GET_USER_SUCCESS',
                    data: res
                })
            })
            .catch(err=>{
                usersDispatch({
                    type: 'GET_USER_ERROR',
                    data: err
                })
            })
        },2000)
    }

    return(
        <>
        <button onClick = {getUser}>GET USERS</button>
        <ul style={{listStyleType: 'none'}}>
            {
                users.loading ==true ? <p>Loading...</p>:<>{

                    users.data.map(user=>{
                        return(
                            <li>{user.id}. {user.name}</li>
                        )
                    })
                }</>
                
            }
        </ul>
        </>
    )
}
```

## useContext()
là cách để tạo ra state ở phạm vi global. Được sử dụng kết hợp với useReducer hay useState
**Các bước thực hiện với useContext()**
1. Create Context
2. Provider
3. Consumer
## ref in React
Trong React là 1 thuộc tính của 1 tag hay một element và đại diện cho chính nó. Cho phép ta có thể truy cập đến DOM Node hay ReactElement khi đã được mounted. Nó tương tự như trong JS, dùng getElementById()
## useForwardRef()
Ví dụ trong trường hợp này:
Ta không thể truyền props ref cho component Video được, vì trong React thì ref không phải là 1 attribute. Do vậy khi log props của Video ra ta chỉ nhận được object chứa title
```javascript
// Video Component
function Video(props){
    return(
        <>
            <video
                src= {video1}
                width= {300}
            />
            {
                console.log(props)
            }
        </>
    )
}

export default Video
import Video from './Video'
// APP Component
function App(){
    const videoRef = useRef()
    useEffect(()=>{
        console.log(videoRef)
    })
    return(
        <>
            <Video title= 'Video' ref = {videoRef}/>
            <button >Play</button>
            <button >Pause</button>
        </>
    )
}
export default App;
```
***Giải pháp ở đây là sử dụng forwardRef:***

```javascript
/// APP component
import Video from './Video'

function App(){
    const videoRef = useRef()
    useEffect(()=>{
        console.log(videoRef)
    })
    return(
        <>
            <Video title= 'Video' ref = {videoRef}/>
            <button >Play</button>
            <button >Pause</button>
        </>
    )
}

export default App;
/// Video Component
function Video(props,ref){
    return(
        <>
            <video
                ref={ref}
                src= {video1}
                width= {300}
            />
            {
                console.log(props,ref)
            }
        </>
    )
}

export default forwardRef(Video)


```
forwardRef là 1 function, nhận tham số thứ nhất là 1 callback. Khi dùng ta export default forwardRef(Video) thì Video cũng chính là 1 function với 2 tham số (props, ref)


Cách hoạt động của ref và forwardRef trong đoạn code trên như sau:
+ khai báo biến ref và gán giá trị bằng useRef() trong component App như là JSX attribute
+ ta dùng ref trong component Video để chỉ định nó(Trong file App.js)
+ khi export, ta dùng hàm forwardRef(Video). Khi này ref sẽ được chuyển tiếp xuống và có thể sử dụng như JSX attribute
+ dùng ref trong phần định nghĩa component Video là tham số thứ 2 
+ Khi ref được đính kèm, ref.current sẽ được chỉ định đến thẻ video trong DOM node.
```javascript
//File: App.js
function App(){
    const videoRef = useRef()
    return(
        <>
            <Video ref = {videoRef}/>
            <button>Play</button>
            <button>Pause</button>
        </>
    )
}

==============
///File Video.js
import {forwardRef, useRef} from 'react';
import video1 from './video-1.mp4'


function Video(props, ref){
    const videoRef = useRef()
    return(
        <video
            ref={ref}
            src= {video1}
            width= {300}
        />
    )
}

export default forwardRef(Video)

Cách hoạt động của đoạn code trên: 
+ Khi component Video nhận props là videoRef
thì forwardRef(Video) sẽ nhận props ấy và trả về cho đối số thứ 2 trong Video component
+ Đối số ấy sẽ được Video component sử dụng 

```
***Nhưng vấn đề tiếp tục ở đây là khi sử dụng forwardRef và ref, thì ta có thể dùng ref để truy cập và xử lý mọi thứ. Do đó cần tùy chỉnh những thứ mà Component cha có thể dùng từ ref của Component con.***\
```
useImperativeHandle(ref, createHandle, dependencies?)

```
Trong đó:
+ ref nhận được từ tham số thứ 2 của forwardRef
+ creatHandle: là hàm không đối số, trả về ***object*** các phương thức mà bạn muốn cho phép hiển thị
+ trả về undefined


```javascript
import Video from './Video'

function App(){
    const videoRef = useRef()
    useEffect(()=>{
        console.log(videoRef)
    })
    function handlePlay(){
        videoRef.current.play();
    }
    function handleStop(){
        videoRef.current.pause();
    }
    return(
        <>
            <Video title= 'Video' ref = {videoRef}/>
            <button onClick={handlePlay} >Play</button>
            <button onClick={handleStop} >Pause</button>
        </>
    )
}

export default App;
////////
import {forwardRef, useRef, useImperativeHandle} from 'react';
import video1 from './video-1.mp4'


function Video(props,ref){
    const videoRef = useRef()
    useImperativeHandle(ref,()=>{
        return{
            play(){
                videoRef.current.play()
            }
        }
    })
    return(
        <>
            <video
                ref={videoRef}
                src= {video1}
                width= {300}
            />
            {
                console.log(props,ref)
            }
        </>
    )
}

export default forwardRef(Video)
```
Ví dụ trong đoạn code trên, ta chỉ cho phép Component cho dùng được method play() với ref Video, nên khi nhấn button Stop thì sẽ gây lỗi cho chương trình

# CSS Module - SCSS

# Router - bộ định tuyến
```
```


