# I. ES6
## 1. Enhanced object literals
là cách viết ngắn gọn trong ES6 trong các trường hợp sau: 
**1. Định nghĩa key và value cho object**
```
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
```
let obj = {
    sum(a,b){
        return a+b;
    }
}

```
**3. Định nghĩa key cho object dưới dạng biến.**
```
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
```
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
```
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
```
const {e, b, c} = {a: 1, b: 2, c: () => 3}
console.log(e, b, c)// undefined , 2, () => 3
```
***Ta cũng có thể gán giá trị mặc định cho biến trong trường hợp tên biến không trùng với bất kì key nào trong object. Nếu trong tên biến trùng với tên key trong object thì giá trị của biến sẽ được gán bằng giá trị của key tương ứng, nếu không thì được gán cho giá trị mặc định và không bị xảy ra lỗi cú pháp.***
```
const {a = 12, b, c} = { b: 2, c: () => 3}
console.log(a, b, c)// 12 , 2, () => 3
```
***Ngoài ra, ta cũng có thể thay đổi tên biến sao cho không trùng với key của object nữa***
```
const {a:d, b, c} = {a: 1, b: 2, c: () => 3}
console.log(d, b, c)// 12 , 2, () => 3
```
**Một số ứng dụng của Destructuring**
***1. Gán giá trị cho biến***
    Ví dụ trong trường hợp Rest API trả về một array hoặc object thì khi sử dụng destructuring lúc này thì hiệu quả: 
```
    const res = [1, 2, 3, 4,] ;//res.response();
    const [a, b, c] = res
    console.log(a, b, c);//1 2 3
```

***2. Swapping***
```
var a = 1;
var b = 2;
[a, b] = [b, a]
console.log(a, b) ;//2, 1
```
***3. Bỏ qua giá trị***

```
const res = () => [1, 2, 3]
const [a, ,b] = res()
console.log(a, b) ;//1,3
```
***4. Gán giá trị cho các biến mới***

```
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
**Một số quy tắc của JSX:**
1. Trả về duy nhất 1 phần từ nguyên gốc
```
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
2. Đóng tất cả các thẻ
3. camelCase tất cả mọi thứ
**Children Props**
# Phân biệt NPM NPX và YARN
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
```
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
  *Callback luôn được gọi sau khi component mounted*
  
### 2.1 useEffect(callback)
- Gọi callback sau mỗi lần re-render
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
  console.log('Re-render')

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
```
```