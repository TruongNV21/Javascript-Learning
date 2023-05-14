# 1. Bind()
*Phương thức bind() tạo và trả về một hàm mới có từ khóa this được đặt cho đối tượng được truyền cho nó.*


```
var person = {
     firstName: 'Khoa',
     lastName: 'Nguyễn',
     showName: function() {
     console.log(this.firstName + ' ' + this.lastName);
   }
   };

   //showName truyền vào như callback, ở đây this chính là button
    $('button').click(person.showName); 

   // Dùng bind để xác định giá trị this, nếu không dùng bind()  thì this ở đâu được chỉ định là Button
    $('button').click(person.showName.bind(person)); //this ở đây vẫn là object person 
```

```
const module = {
  x: 42,
  getX: function() {
    return this.x;
  }
};

const unboundGetX = module.getX;
console.log(unboundGetX());
//Hàm được gọi ở phạm vi toàn cục, mà ở phạm vi toàn cục thì không có property x nên được trả về undefined 
// Expected output: undefined

const boundGetX = unboundGetX.bind(module);
//Khi này, this được chỉ định là object
console.log(boundGetX());
// Expected output: 42
```

```
function log(level, time, message) {
  console.log(level + ' - ' + time + ': ' + message);
}

// Không có this nên set this là null
// Set mặc định 2 tham số level và time
//Tham số đầu tiên luôn là để chỉ định value cho this
var logErrToday = log.bind(null, 'Error', 'Today');

// Hàm này tương ứng với log('Error', 'Today', 'Server die.')
logErrToday("Server die."); 
// Error - Today: Server die.
```

# 2. Call()
  Phương thức call() hoạt động tương tự như bind(), nhưng có một điểm khác biệt cơ bản.Như đã thấy ở trên, phương thức bind() trả về một hàm có thể được gọi sau này. Nhưng phương thức call() gọi hàm và trả về kết quả của lời gọi đó


* Ví dụ: 
``` 

function greet() {
  var reply = [this.person, 'Is An Awesome', this.role].join(' ');
  console.log(reply);
}

var x = {
  person: 'Khoa Nguyen', role: 'Javascript Developer'
};

greet.call(x); // Khoa Nguyen Is An Awesome Javascript Developer
```
* Thể hiện tính kế thừa
```
function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product.call(this, name, price);
  this.category = 'food';
}

function Toy(name, price) {
  Product.call(this, name, price);
  this.category = 'toy';
}

var cheese = new Food('feta', 5);
var fun = new Toy('robot', 40);
```
# 3. Apply()
  *Apply gọi một hàm với giá trị của this và các đối số được truyền vào dưới dạng mảng.* 

  * Cách hoạt động tương tự như call() chỉ khác nhau ở các truyền tham số


```

const teacher = {
    firstName: 'Minh',
    lastName: 'Thu'
}
function greet(greeting, message){
    return `${greeting} ${this.firstName} ${this.lastName}. ${message}` 
}

let result = greet.apply(teacher,['Em chao co','Co dang day mon gi the'])
let result1 = greet.call(teacher,'Em chao co','Co dang day mon gi the!!')

console.log(result)
console.log(result1)
```
* Kĩ thuật Function Browwing
```
const teacher = {
    firstName: 'Minh',
    lastName: 'Thu',
    isOnline: false,
    goOnline(){
        this.isOnline = true
        console.log(`${this.firstName} ${this.lastName} is Online`)
    },
    goOffline(){
        this.isOnline = false
        console.log(`${this.firstName}${this.lastName} is Offline`)
    }
}

const me = {
    lastName: 'Nguyen',
    firstName: 'Truong',
    isOnline: false
}

teacher.goOnline();
//Minh Thu is Online
teacher.goOnline.apply(me);
//Truong Nguyen is Online

```
* Thể hiện tính kế thừa

```
function Animal(name, weight){
    this.name = name,
    this.weight =weight
}
function Parrot(){
    //arguments chính là mảng tham số truyền vào
    // this ở đây là Parrot chứ không phải Animal
    Animal.apply(this, arguments)
    this.speak = function(){
        console.log("Nhà có khách!")
    }
}

const  conVet = new Parrot('Vet',300);
console.log(conVet)
//Parrot {name: 'Vet', weight: 300, speak: ƒ}
```
* Apply() hoạt động với những built-in
```
const numbers = [5, 6, 2, 3, 7];

const max = Math.max.apply(null, numbers);

```
```
//Sử dụng toán tử Spread kết hợp với call()
const numbers = [5, 6, 2, 3, 7];

const max = Math.max.call(null, ...numbers);
```


* Nối mảng mà không tạo ra mảng mới
```
//Cách 1: Sử dụng với apply()

const array = ["a", "b"];
const elements = [0, 1, 2];
array.push.apply(array, elements);
console.info(array); // ["a", "b", 0, 1, 2]
```

```
//Cách 2: Sử dụng spread

const array = ["a", "b"];
const elements = [0, 1, 2];
array.push(...elements);
console.info(array); // ["a", "b", 0, 1, 2]

```


# 4. So sánh giữa 3 methos bind(), call(), apply()
## Giống nhau:
* là đều được kế thừa từ Function.prototype

## Khác nhau: 
* Riêng bind() sẽ trả ra hàm mới mới this được chỉ định, và chưa thực thi hành trả luôn mà sẽ được gọi sau
* Call() thì nhận các đối số riêng lẻ, còn apply() nhận đối số dưới dạng mảng

```


```

# 5. Asyn: Bất đồng bộ

***Có thể được hiểu là các câu lệnh không chạy theo thứ tự, câu lệnh viết trước có thể kết thúc sau câu lệnh viết sau***

**Ưu điểm:**
 Như đã nói, nó giúp chúng ta tối ưu được thời gian chạy của các câu lệnh. Cũng giúp chúng ta thực hiện các tác vụ mất nhiều thời gian mà không làm ảnh hưởng đến luồng chính của chương trình.

**Nhược điểm:**
Chính vì các câu lệnh được thực hiện đồng thời và kết quả cũng được trả về một cách không theo thứ tự nên sẽ khó kiểm soát cũng như debug code.

**Các cách sử lý bất đồng bộ:**
* Callback
* Promise
* Async/Await
  
## 5.1 Promise

**Callback hell:** là khái niệm để thể hiện cách viết code mà những khối code lồng vào trong nhau dẫn đến rối mắt.
```
const makeBurger = nextStep => {
  getBeef(function(beef) {
    cookBeef(beef, function(cookedBeef) {
      getBuns(function(buns) {
        putBeefBetweenBuns(buns, beef, function(burger) {
          nextStep(burger);
        });
      });
    });
  });
};
```

**Promise:**  là khái niệm sinh ra để xử lý bất đồng bộ trong javascript, trước khi có **Promise** ta thường dùng **Callback** nhưng lại sinh ra **Callback hell**

**Promise** có 3 trạng thái:
- ***Pending***: đang xử lý, nếu trạng thái này mà không kết thúc sẽ gây ra tình trạng rò rỉ bộ nhớ
- ***Fullfilled***: Thành công
- ***Rejected***: Thất bại

```
var myPromise = new Promise(
  function(resolve, reject){
    // Logic
    resolve(data);// Thành công và trả về data
    reject(data);// Thất bại và trả về data
  })

  myPromise
    .then(function1(data){
      return ...
    })
    .then(function2(data){
      return ...
    })
    //Nếu function1 trả về giá trị khác Promise thì function2 được thực hiện đồng thời với function1
    //Nếu không thì function2 sẽ được thực hiện khi function1 hoàn thành
    //Giá trị trả về của function1 là đối số của function2

    .catch(function(data){
      //Giải pháp
    })
    //Được thực thi khi promise trả về reject
    .finally(function(){
      // Giải pháp
    })

```
* Ví dụ **Promise** trong việc đọc file

```
const readFilePromise = (path) =>
  new Promise((resolve, reject) => {
    readFile(path, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });

readFilePromise("./data.txt")
  .then((result) => console.log(result))
  .catch((error) => console.error("Failed to read data"));
 
  ```
### 5.1.1 Promise.resolve(value)
là phương thức tĩnh luôn có giá trị là resolve và trả về 1 promise. Resolving có thể trả về giá trị Number, String, Object,... hay thậm chí là cả Promise

***Resolving an Array***

```
const p = Promise.resolve([1, 2, 3]);
p.then((v) => {
  console.log(v[0]); // 1
});
```
***Resolving an Promise***
```
const original = Promise.resolve(33);
const cast = Promise.resolve(original);
cast.then((value) => {
  console.log(`value: ${value}`);
});
console.log(`original === cast ? ${original === cast}`);

// Logs, in order:
// original === cast ? true
// value: 33
//đây lại xảy ra vấn đề bất đồng bộ, theo thứ tự thì value: 33 phải được in ra trước original === cast ? true
```
### 5.1.2 Promise.reject(value)
<!-- *là phương thức tĩnh có giá trị luôn là reject và trả về 1 promise* -->
### 5.1.3 Promise.then(onFulfilled, onRejected)
  là phương thức được thực hiện khi callback của Promise gọi lại trường hợp Fulfilled và cả Rejected

**Using the then() method**

```
const p1 = new Promise((resolve, reject) => {
  resolve("Success!");
  // or
  // reject(new Error("Error!"));
});

p1.then(
  (value) => {
    console.log(value); // Được thực hiện nếu Promise ở trạng thái Resolve
  },
  (reason) => {
    console.error(reason); //Được thực hiện nếu Promise ở trạng thái Reject
  },
);
then(onFulfilled, onRejected)
```
**Using with function non parametes**
```
Promise.resolve(1).then(2).then(console.log); // 1
Promise.reject(1).then(2, 2).then(console.log, console.log); // 1
```
**Promise Chain**
*Nếu then() method trả về 1 Promise thì ta có thể dùng được Promise Chain.*

Khi đó, onFulfiled của then() mà trả về Promise thực hiện xong thì then() tiếp theo mới được thực thi. Nếu không trả về Promise thì các then() hoạt động đồng thời với nhau*
```
Promise.resolve("foo")
  .then(
    (string) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(string)
          string += "1";
          resolve(string);
        }, 2000);
      }),
  )

  .then((string) => {
   console.log(string)
    return string+ '2';
  })

  .then((string) => {
    console.log(
      `${string}3`
    )
    console.log(string+'4'); 
  });
// foo
//foo1
//foo12
//foo123a
///foo123b

```
**Bất đồng bộ của then()**
```
const resolvedProm = Promise.resolve(33);
console.log(resolvedProm);

const thenProm = resolvedProm.then((value) => {
  console.log(
    `this gets called after the end of the main stack. the value received is: ${value}, the value returned is: ${
      value + 1
    }`,
  );
  return value + 1;
});
console.log(thenProm);
setTimeout(() => {
  console.log(thenProm);
});
// Kết quả chạy như sau:
// Promise {[[PromiseStatus]]: "resolved", [[PromiseResult]]: 33}
// Promise {[[PromiseStatus]]: "pending", [[PromiseResult]]: undefined}
// "this gets called after the end of the main stack. the value received is: 33, the value returned is: 34"
// Promise {[[PromiseStatus]]: "resolved", [[PromiseResult]]: 34}

```
### 5.1.4 Promise.catch(value)
*Được dùng để xử lý khi Promise là Rejected*


**Using and chaining the catch() method**
```
const p1 = new Promise((resolve, reject) => {
    resolve("Success");
  });
  
  p1.then((value) => {
    console.log(value); // "Success!"
    throw new Error("oh, no!");
  })
    .catch((e) => {
      console.error(e.message); // "oh, no!"
    })
    .then(
      () => console.log("after a catch the chain is restored"),
      () => console.log("Not fired due to the catch"),
    );
  
  // The following behaves the same as above
  p1.then((value) => {
    console.log(value); // "Success!"
    return Promise.reject("oh, no!");
  })
    .catch((e) => {
      console.error(e); // "oh, no!"
    })
    .then(
      () => console.log("after a catch the chain is restored"),
      () => console.log("Not fired due to the catch"),
    );

    // Output log:
    //Success!
    //Success!
    //oh, no!
    //after a catch the chain is restored
    //oh, no!
    //after a catch the chain is restored
```
**Hành vi ném lỗi(***sử dụng throw new Error()***) sẽ gọi catch() trong hầu hết mọi khoảng thời gian, nhưng đối với hàm bất đồng bộ thì không thể phát hiện được**
```
sử dụng throw new Error()
const p1 = new Promise((resolve, reject) => {
  throw new Error("Uh-oh!");
});

p1.catch((e) => {
  console.error(e); // Vẫn phát hiện được
});
```
```
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    throw new Error("Uncaught Exception!");
  }, 1000);
});

p2.catch((e) => {
  console.error(e); // Hàm này sẽ không được gọi vì Error được ném qua trong 1 hàm bất đồng bộ nên không thể phát hiện được để bắt lỗi
});
```
### 5.1.5 Promise.finally(value)
*là phương thức của Promise được lên lịch cho function được gọi khi Promise thành công và cả thất bại.*
```
function checkMail() {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
      resolve('Mail has arrived');
    } else {
      reject(new Error('Failed to arrive'));
    }
  });
}

checkMail()
  .then((mail) => {
    console.log(mail);
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() =>{
    console.log('Done!')
  }
  )
    //Cho dù thành công hay thất bại thì câu lệnh này đều được thực thi.
  
```
 * Function được callback trong finally không được nhận tham số trả về từ Promise
* Finally khác với then() trong trường hợp trạng thái của Promise là Resolved (Xem 2 ví dụ dưới)
```

function checkMail() {
  return new Promise((resolve, reject) => {
    resolve('Hello')
  });
}

checkMail()
  .then(() => {
    return 77;
  })
  .then((data)=>{
    console.log(data)//Khi này giá trị nhận được sẽ là 77
  })
```
```
function checkMail() {
  return new Promise((resolve, reject) => {
    resolve('Hello')
  });
}

checkMail()
  .finally(() => {
    return 77;
  })
  .then((data)=>{
    console.log(data)// khi này giá trị nhận được lại là Hello - giá trị cuối cùng cùng promise
  })
  
  ```
  * Tương tự như vậy trong trường hợp trạng thái của Promise là Rejected
  
  ```
function checkMail() {
  return new Promise((resolve, reject) => {
    reject('Hello')
  });
}

checkMail()
  .then(() => {},()=>22)
  .then((data)=>{
    console.log(data) // Giá trị trả về là 22
  })
  ```

```
function checkMail() {
  return new Promise((resolve, reject) => {
    reject('Hello')
  });
}

checkMail()
  .finally(()=>22)
  .then((data)=>{
    console.log(data)
  },(data)=>{
    console.log(data) // Giá trị trả về lại là Hello
  })
  ```

### 5.1.6 Promise.all(iterable)
*là phương thức tĩnh của Promise, nó cho phép lặp qua các Promise đầu vào và trả về Promise duy nhất.*
Promise trả về là:
* Resolved: khi tất cả các Promise đầu vào đều resolved
* Rejected: khi trong các Promise đầu vào có reject
```
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});
// Expected output: Array [3, 42, "foo"]
```
 ***Promise trả về là:***
* Fulfilled: nếu mảng truyền vào rỗng
* Asyn Fulfilled: nếu mảng truyền vào xuất hiện pendibg
* Asyn Rejected: nếu mảng truyền vào có reject và trả về Promise với giá trị mà Reject đầu tiên trong mảng truyền vào

**Nếu iterable bao gồm cả giá trị non-promise thì chúng sẽ được bỏ qua, nhưng vẫn được đếm trong array promise trả về**
```

const p = Promise.all([1, 2, 3]);

const p2 = Promise.all([1, 2, 3, Promise.resolve(444)]);

const p3 = Promise.all([1, 2, 3, Promise.reject(555)]);

setTimeout(() => {
  console.log(p);
  console.log(p2);
  console.log(p3);

  //Promise {<fulfilled>: Array(3)}
  //Promise {<fulfilled>: Array(4)}
  //Promise {<rejected>: 555}
});


```
* Đồng bộ và bất đồng bộ trong Promise.call()
```
const resolvedPromisesArray = [Promise.resolve(33), Promise.resolve(44)];

const p = Promise.all(resolvedPromisesArray);

console.log(p);

setTimeout(() => {
  console.log("the queue is now empty");
  console.log(p);
});

// Logs, in order:
// Promise { <state>: "pending" }
// the queue is now empty
// Promise { <state>: "fulfilled", <value>: Array[2] }
``` 

* Điều này cũng xảy ra trong trường hợp Promise.all rejected
```
const p = Promise.all([]); // Will be immediately resolved
const p2 = Promise.all([1337, "hi"]); // Non-promise values are ignored, but the evaluation is done asynchronously
console.log(p);
console.log(p2);
setTimeout(() => {
  console.log("the queue is now empty");
  console.log(p2);
});

// Logs:
// Promise { <state>: "fulfilled", <value>: Array[0] }
// Promise { <state>: "pending" }
// the queue is now empty
// Promise { <state>: "fulfilled", <value>: Array[2] }
```
* Hành vi bắt lỗi không nhanh của Promise.call()

```
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("p1_delayed_resolution"), 1000);
});

const p2 = new Promise((resolve, reject) => {
  reject(new Error("p2_immediate_rejection"));
});

Promise.all([p1.catch((error) => error), p2.catch((error) => error)]).then(
  (values) => {
    console.log(values[0]); // "p1_delayed_resolution"
    console.log(values[1]); // "Error: p2_immediate_rejection"
  },
  //Logs: 
  //p1_delayed_resolution
  //Error: p2_immediate_rejection
  //Đáng lẽ Promise reject do trong mảng truyền vào có giá trị reject, nhưng do set thời gian chạy nên không thể bắt lỗi đc
);
```

## 5.2 Async
là từ khóa cung cấp cách hoạt động với Promise dễ dàng hơn, cho phép trả về 1 Promise
```
async function f() {
  return 1;
}
//f() sẽ trả về promise
f().then((data)=>{
  console.log(data)
}); // 1
```
## 5.3 Await
là từ khóa làm cho JS đợi đến khi promise đó được giải quyết
```
async function f() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000)
  });

  let result = await promise; // wait until the promise resolves (*)

  alert(result); // "done!"
}
f();
```
* Không hoạt động với hàm không bất đồng bộ
```
function f() {
  let promise = Promise.resolve(1);
  let result = await promise; // Syntax error
}
```
# 6. Copy Object
* Sử dụng Spread
```
const obj_1 = {
username: "chamdev.com",
getUsername() {
return this.username;
}
};

const obj_2 = {...obj_1};

obj_1.age = 10;

console.log("obj_2", obj_2); // {username: "chamdev.com", getUsername: ƒ}
```
* Hạn chế của cách này là không thể deep clone được. Xem ví dụ sau đây:

```
const obj_1 = {
username: "chamdev.com",
info: {
address: "https://chamdev.com"
}
};

const obj_2 = {...obj_1 };

obj_1.age = 10;
obj_1.info.address = "Not found";

console.log("obj_2", obj_2); // {username: "chamdev.com", info: {address: "Not found"}}
```
* Sử dụng Object.assign()

```
const obj_1 = {
username: "chamdev.com",
info: {
address: "https://chamdev.com"
},
getUsername() {
return this.username;
}
};

const obj_2 = Object.assign({}, obj_1);

obj_1.age = 10;

console.log("obj_2", obj_2); // {username: "chamdev.com", info: {address: "https://chamdev.com"}, getUsername: ƒ}
```
* Tương tự như Spread thì assign() cũng không thể deep clone

```
const obj_1 = {
username: "chamdev.com",
info: {
address: "https://chamdev.com"
},
getUsername() {
return this.username;
}
};

const obj_2 = Object.assign({}, obj_1);

obj_1.age = 10;
obj_1.info.address = "Not found";

console.log("obj_2", obj_2); // {username: "chamdev.com", info: {address: "Not found"}, getUsername: ƒ}
```
* Sử dụng phương thức JSON ( có thể deep clone)
```
const obj_1 = {
username: "chamdev.com",
info: {
address: "https://chamdev.com"
},
getUsername() {
return this.username;
}
};

const obj_2 = JSON.parse(JSON.stringify(obj_1));

obj_1.age = 10;

console.log("obj_2", obj_2); // {username: "chamdev.com", info: {address: "https://chamdev.com"}}
```
**Tổng kết:**
* Spread và Object.assign không thể deepclone, nhưng có thể clone được method
* JSON method thì có thể deep clone nhưng lại không thể clone method được.

# 6. XMLHttpRequest
*là object giúp cho quá trình trao đổi giữa web và server thông qua các request và response*
```

```
# 7. DOM - Document Object Model
*Mô hình đối tượng tài liệu W3C (DOM) là một nền tảng và giao diện ngôn ngữ trung lập cho phép các chương trình và tập lệnh truy cập động và cập nhật nội dung, cấu trúc và kiểu của tài liệu.*


## 7.1: Có 5 cách để lấy ra các element trong HTML
* by Id
* by tagName
* by className
* by CSS Selector
* by HTML Object Collection
## 7.2 Phân biệt Live HTML Collection và Static NodeList
* Static NodeList: Không thể thay đổi thậm chí người dùng có tạo hành động
* Live HTMLCollection: nếu có sự thay đổi trong DOM thì nó sẽ update và phản ánh những hành động từ người dùng*
```
// Static NodeList
let btnsStatic = main.querySelectorAll('button');

// After 3 seconds, add a new button
setTimeout(function () {

	// Inject a new button
	let btn = document.createElement('button');
	btn.textContent = '4';
	main.append(btn);

	// logs the first three buttons, but not the new one
	console.log(btnsStatic);

}, 3000);

///Log: Mặc dù đã thêm button nhưng không được cập nhật
//NodeList(3) [button, button, button]
```

```
// Live NodeList
let btnsLive = main.getElementsByTagName('button');

// After 3 seconds, add a new button
setTimeout(function () {

	// Inject a new button
	let btn = document.createElement('button');
	btn.textContent = '4';
	main.append(btn);

	// logs all four buttons, including the new one
	console.log(btnsLive);

}, 3000);
///Log: Có thêm button 
///HTMLCollection(4)
```

## 7.3 Selecting Element
|         **Method**        |                       **Return**                      | **_Method of _**            |
|:-------------------------:|:-----------------------------------------------------:|-----------------------------|
| getElementById()          |                        Element                        |                             |
| getElementsByName()       |    Live NodeList - like Array but not array object    | Document Object             |
| getElelmentsByTagName()   | Live HTMLCollection - like Array but not array object | Document and Element Object |
| getElementsByClassName()  |                 Static HTMLCollection                 | Document and ELement        |
| querySelector()           |                 First ELement matched                 | Document and Element        |
| querySelectorAll()        |                    Static NodeList                    |                             |
| Convert NodeList to Array |                  Array.from(nodeList)                 | Trick                       |

## 7.4 Traversing elements
|                 **Property**                 |         **Return**        | **Desc**                                       |
|:--------------------------------------------:|:-------------------------:|------------------------------------------------|
| node.parentNode                              |         Node/NULL         | Khoảng trắng trong HMTL được tính là textNode  |
| node.firstChild/node.lastChild               |  first or last child node | bao gồm cả textNode, commentNode, elementNode. |
| node.firstElementChild/node.lastElementChild | first or last elementNode |                                                |
| node.childNodes                              |       Live NodeList       |                                                |

## 7.5 Manipulating elements()
|                **Property/Method**                |                                                                                                                                      **Desc**                                                                                                                                     |                                                                                                                                          **Note**                                                                                                                                          |
|:-------------------------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| document.createElement()                          | tạo mới element trong document                                                                                                                                                                                                                                                    |                                                                                                                                                                                                                                                                                            |
| element.appendChild()                             | để thêm node và cuối element chỉ định hoặc để di chuyển vị trí của node                                                                                                                                                                                                           | Return element đang chỉ định                                                                                                                                                                                                                                                               |
| node.textContent                                  | trả về string được nối từ tất cả các nodeChild giữ nguyên cả xuống dòng, ngoại trừ comment                                                                                                                                                                                        | GET and SET                                                                                                                                                                                                                                                                                |
| node.innerText                                    | tương tự như textContent nhưng loại bỏ xuống dòng                                                                                                                                                                                                                                 | mất thời gian để tính toán                                                                                                                                                                                                                                                                 |
| element.innerHTML                                 | set/get tất cả những gì ở trong element, bao gồm cả whitespace, endline, comment,...                                                                                                                                                                                              | GET and SET, nó hoạt động khi reload page                                                                                                                                                                                                                                                  |
|                                                   | So sánh innerHTML và document.creatElement(): đều cho ra kết quả như nhau nhưng - creatELement() cho hiệu năng tốt hơn innerHTML vì khi sử dụng thì web cần so sánh và   và tạo mới element - innerHTML được khuyên dùng khi render dữ liệu từ nguồn đáng tin cậy như là database |                                                                                                                                                                                                                                                                                            |
| element.after(par1,par2,...)                      | chèn 1 hay nhiều node vào sau element                                                                                                                                                                                                                                             |                                                                                                                                                                                                                                                                                            |
| node.append(...nodes) node.append(...DOMString)   | chèn thêm 1 hay nhiều node vào trong node được chỉ định                                                                                                                                                                                                                           | Return undefined                                                                                                                                                                                                                                                                           |
| node.prepend(...nodes) node.prepend(...DOMString) | tương tự như node.append(...nodes) nhưng là chèn thêm vào đầu                                                                                                                                                                                                                     | let app = document.querySelector('#app');  let langs = ['CSS','JavaScript','TypeScript'];  let nodes = langs.map(lang => {     let li = document.createElement('li');     li.textContent = lang;     return li; });  app.prepend(...nodes);                                                |
| element.insertAdjacentHTML(positionName, text);   | ![Alt text](https://www.javascripttutorial.net/wp-content/uploads/2020/05/JavaScript-insertAdjacentHTML.png "a title")                                                                                                                                                            | Trong đó tham số text bắt buộc phải là string                                                                                                                                                                                                                                              |
| node.replaceChild(newChild, oldChild);            | thay thế node newChild và oldChild là các **element**                                                                                                                                                                                                                             |                                                                                                                                                                                                                                                                                            |
| originalNode.cloneNode(deep)                      | trả về 1 node được clone từ node nguyên bản - Nếu deep == true, cả originalNode và các node con của nó đều được clone - Nếu deep == false, chỉ duy nhất originalNode được clone                                                                                                   | - Nếu originalNode có thuộc tính id thì clone cũng copy luôn cả id, do đó cần phải thay đổi id của cloneNode - cloneNode chỉ copy được các attribute và listener inline của originalNode, với các sự kiện được thêm vào các  listener thông qua addEventListener() thì sẽ không được clone |
| node.removeChild(childNode)                       | Xóa bỏ nodeChild được chỉ định                                                                                                                                                                                                                                                    |                                                                                                                                                                                                                                                                                            |
| nodeParent.insertBefore(newNode,existingNode)     | Thêm node vào trước node hiện có-existingNode. Trong đó existingNode là 1 node con của nodeParent                                                                                                                                                                                 |                                                                                                                                                                                                                                                                                            |
## 7.6 DocumentFragment
là một phiên bản nhẹ của document, nó cho phép lưu trữ những cấu trúc document như là document tiêu chuẩn, tuy nhiên lại không là một phần của DOM tree
  Khi có sự thay đổi từ document fragment thì nó ảnh hưởng tới document
  Nó thích hợp khi sủ dụng với appendChild() or insertBefore() method
**Các cách để khởi tạo document fragment: **
* let fragment = new DocumentFragment();
* let fragment = document.createDocumentFragment();
  
**Ứng dụng khi dùng document fragment trong việc render page:** so sánh 2 cách sau
```
//Cách 1:
let div = document.querySelector('.container');

for (let i = 0; i < 1000; i++) {
   let p = document.createElement('p');
   p.textContent = `Paragraph ${i}`;
   div.appendChild(p);
}
```
```
//Cách 2:

let div = document.querySelector('.container');

// compose DOM nodes
let fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
   let p = document.createElement('p');
   p.textContent = `Paragraph ${i}`;
   fragment.appendChild(p);
}

// append the fragment to the DOM tree
div.appendChild(fragment);

```
=> Kết quả của 2 cách là như nhau nhưng cách 2 hoạt động có hiệu quả hơn. Bởi vì theo cách 1, sau mỗi lần lặp đều phải tính toán để thêm phần tử vào div.container

## 7.6 DOM ATTRIBUTE
* Khi trang web load 1 HTML page thì trình duyệt sẽ tự động chuyển đổi attribute của phần tử trong HTML thành property của DOM Object.

* Attribute có giá trị luôn là string, nhưng khi được chuyển đổi sang thành property của DOM Object thì nó có thể có giá trị kiểu string, number, boolean,...

* **Phân biệt standard attribute và non-standard attribute:**
  *standard attribute là nhưng thuộc tính đã đc thêm inline trong html các thuộc tính khác được set thêm vào bằng các phương pháp khác thì được coi là non-standard*

```
<input type="text" id="username" tabindex="1">
//Khi này thì **type, id, tabindex** là các stadard. Các thuộc tính khác thêm sau vào là non-standard
```
* **Bất đồng bộ trong cú pháp với Attribute**: Khi thay đổi giá trị của các standard attribute thì các property tương ứng của chúng cũng thay đổi và ngược lại. Nhưng với non-standard thì khi thay đổi giá trị của property DOM object thì giá trị của attribute tương ứng sẽ không được thay đổi.


```
let input = document.querySelector('#username');

// attribute -> property: OK
input.setAttribute('value','guest');
console.log(input.value);  // guest


// property -> attribute: doesn't change
input.value = 'admin';
console.log(input.getAttribute('value')); // guest
```
```
let input = document.querySelector('#username');

// attribute -> property
input.setAttribute('tabindex', 2);
console.log(input.tabIndex);  // 2


// property -> attribute
input.tabIndex = 3;
console.log(input.getAttribute('tabIndex')); // 3
```

### 7.6.1 **Dataset**
*Muốn custom 1 attribute element, chúng ta có thể dùng cú pháp data-*
Ví dụ: data-id, data-nameUser,...

```
<div id="main" data-progress="pending" data-value="10%"></div>
let bar = document.querySelector('#main');
console.log(bar.dataset);
///// LOG:
[object DOMStringMap] {
    progress: "pending",
    value: "10%"
}
```

### 7.6.2 **setAttribute() method**
**Syntax**: *element.setAttribute(name, value);*
**Return:** *undefined*
* Nếu giá trị của attribute nào kiểu Boolean, thì tất cả các giá trị khác false đều được tự động gán cho giá trị là true.
* Không thể set giá trị false có các thuộc tính Boolean, bắt buộc phải removeAttribute()
```
```
### 7.6.3 **getAttribute() method**
**Syntax:** *let value = element.getAttribute(name);*
**Return:** giá trị của attribute tìm được hoặc là NULL nếu không tìm được

### 7.6.4 **removeAttribute() method**

### 7.6.5 **hasAttribute() method**
*Trả về giá trị Boolean*

## 7.7 DOM Element Styles
  ***element.style*** cho phép thiết lập CSS inline cho HTML Element
```
element.style.color = 'blue';
```
Việc này tương đương với việc sử dụng element.setAttribute()
Nếu muốn thay đổi nhiều giá trị thuộc tính thì có thể dùng thuộc tính cssText
```
let string = 'color:red;background-color:yellow';
element.style.cssText = string;
```
### 7.7.1 getComputedStyle()
Sử dụng phương thức này trong trường hợp pseudo-elements
```
<html>
<head>
    <title>JavaScript getComputedStyle() Demo</title>
    <style>
        body {
            font: arial, sans-serif;
            font-size: 1em;
            line-height: 1.6;
        }

        p::first-letter {
            font-size: 1.5em;
            font-weight: normal
        }
    </style>
</head>
<body>
    <p id='main'>JavaScript getComputedStyle() Demo for pseudo-elements</p>
    <script>
        let p = document.getElementById('main');
        let style = getComputedStyle(p, '::first-letter');
        console.log(style.fontSize);
    </script>
</body>
</html>
```
```
24px

```

### 7.7.2  className()
*trả về chuỗi các class được phân tách bởi khoảng trắng*
```
<div id="note" class="info yellow-bg red-text">JS className</div>
let note = document.querySelector('#note');
console.log(note.className); 
```

```
///LOG:
info yellow-bg red-text
```
### 7.7.3  className()
using element.offsetHeight and element.offsetWidth properties.

## 7.7 DOM WORKING WITH EVENT
Khi 1 event được thực hiện thì nó trải qua 2 quá trình như sau: 
* Event capturing(chụp/bắt sự kiện): sự kiện sẽ được bắt đầu từ phần tử xa nhất từ phần tử chỉ định(có thể được hiểu bắt đầu từ html thậm chí là từ window) sau đó bắt dần sự kiện đến phần tử chỉ định.
* Event Budding(nổi bọt): nó ngược lại với Event Capturing.

Khi bắt sự kiện bằng phương thức addEventListener('') mà chỉ truyền vào 2 đối số thì sự kiện chỉ được bắt trong giai đoạn 2 và 3 (giai đoạn 2 là việc bắt chính phần tử được chỉ định, giai đoạn 3 là giai đoạn nổi bọt)
Nếu muốn bắt sự kiện trong giai đoạn capturing thì cần thêm đối số thứ 3 có giá trị là true
```
elem.addEventListener(..., {capture: true})
// or, just "true" is an alias to {capture: true}
elem.addEventListener(..., true)
```
DOM EVENT FLOW 2 LEVEL:
![Alt text](https://www.javascripttutorial.net/wp-content/uploads/2020/02/JavaScript-DOM-Level-2-Event.png "DOM EVENT FLOW 2 LEVEL")

***EVENT OBJECT***
* Khi event được diễn ra thì trình duyệt sẽ khởi tạo 1 Event Object để xử lý sự kiện. 
* Event object này chỉ truy cập trong handle event, khi thực thhi xong các tiến trình xử lý thi nó sẽ tự động được xóa đi.

## 7.8 HANLDING EVENT
Có 3 cách để xử lý sự kiện trong JS:
* **Bằng cách thêm vào thuộc tính của element HMTL**
```
  <input type="button" value="Save" onclick="alert('Clicked!')">
```
  Cách này được xem là tồi vì nó gây khó khăn trong quá trình bảo trì code, nếu là element được load ra trước script thì có thể gây ra những hành động lỗi.
* **DOM event handlers level 0**
```let btn = document.querySelector('#btn');

btn.onclick = function() {
    alert('Clicked!');
};
```
Để xóa event handler thì set giá trị cho event = null
btn.onclick = null
* **DOM event handlers level 2**
  Use: addEventListener() và removeEventListener()
```
addEventListener(event,handler,{capture: true/false})
```
*Ưu điểm của phương pháp này là quản lý dễ dàng và có thể thêm nhiều sự kiện cho phần tử.*

## 7.8 LOAD EVENT
| EVENT            | DESC                                                                                                             | Note                                                                                                                                    |
|------------------|------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| DOMContentLoaded | được kích hoạt khi DOM content được tải xong, không cần đợi hình ảnh và biểu mẫu tải xong                        | Khi để thẻ script trong phần head sẽ gây tắc nghẽn và trì hoãn việc rendering                                                           |
| load             | kích hoạt kĩ toàn bộ trang web được tải, bao gồm cả các tài nguyên hình ảnh, biểu mẫu,CSS,...                    | Dùng được cho cả thẻ img và thẻ script                                                                                                  |
| beforeunload     | kích hoạt trước khi webpage và resource của nó unload, lúc đấy page vẫn được nhìn thấy và vẫn có thể hủy sự kiện | Thường dùng trong trường hợp kiểm tra người dùng có muốn rời khỏi trang web hay không Khi này nó được dùng kết hợp với preventDefault() |
| unload           | kích hoạt khi hoàn thành quá trình unload page, có nghĩa là không thể nhìn hay thao tác với page nữa             | Không có ứng dụng gì cả!!!                                                                                                              |


## 7.9 MOUSE EVENT
| EVENT           | DESC                                                                                                              | Note                                                                                                                                         |
|-----------------|-------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| mouseover       | kích hoạt khi di chuyển chuột từ ngoài vào trong ranh giới của phần tử                                            |                                                                                                                                              |
| mouseout        | kích hoạt khi di chuyển chuột từ trong ra ngoài phần tử                                                           |                                                                                                                                              |
| mouseenter      | như mouseover                                                                                                     | không bị nổi bọt và không được kích hoạt khi di chuyển lên phần tử con                                                                       |
| mouseleave      | như mouseout                                                                                                      | không bị nổi bọt và không được kích hoạt khi di chuyển lên phần tử con                                                                       |
|                 | **Event object cung cấp thuộc tính button cho phép trả về giá trị từ  0 đến 4 để biểu thị cho vị trí nhấp chuột** |                                                                                                                                              |
| 0               | chuột trái                                                                                                        | btn.addEventListener("mouseup",(e)=>{ e.preventDefault() console.log(e.button) )  Log: 0 hoặc 1 hoặc...4 tùy thuộc vào vị trị bấm trên chuột |
| 1               | scroll wheel                                                                                                      |                                                                                                                                              |
| 2               | chuột phải                                                                                                        |                                                                                                                                              |
| 3               | backward                                                                                                          |                                                                                                                                              |
| 4               | forward                                                                                                           |                                                                                                                                              |
|                 | **Lấy tọa độ của mouse**                                                                                          |                                                                                                                                              |
| screenX/screenY | trả về tọa độ hiện tại của mouse so với màn hình                                                                  |                                                                                                                                              |
| clientX/clientY | trả về tọa độ hiện tại của mouse so với phần tử chỉ định                                                          |                                                                                                                                              |


## 7.9 KEYBOARD EVENT
|            | Keyboard Event                    |                                   |
|------------|-----------------------------------|-----------------------------------|
| keyup      |                                   |                                   |
| keydown    |                                   |                                   |
| keypress   |                                   |                                   |
|            | **Keyboard Event Property**       | Ví dụ khi ấn phím Z trên bàn phím |
| event.key  | trả về giá trị của key chỉ định   | return: z                         |
| event.code | trả về code của keyboard chỉ định | return: KeyZ                      |


## 7.9 SCROLL EVENT
*được kích hoạt trong các trường hợp sau:*
* sử dụng scrollbar
* sử dụng mouse whell
* ấn vào ID link
* Calling functions in JS


**Window object** có 2 thuộc tính là **onscrollX** và **onscrollY** trả về giá trị pixel thay đổi so với tọa độ gốc của window.

Vì event scroll thường gặp nhiều vấn đề về mặt hiệu ứng do delay nên giải pháp ở đâu chính là sử dụng timer

<span style ="color: red">Không bao giờ được sử dụng đoạn code như này:</span>
```
window.scroll = () => {
    // place the scroll handling logic here
};

```
***Thay vào đó ta làm như sau:***
```
let scrolling = false;

window.scroll = () => {
    scrolling = true;
};

setInterval(() => {
    if (scrolling) {
        scrolling = false;
        // place the scroll handling logic here
    }
},300);
```
Để có thể kiểm soát hành vi scroll tốt hơn thì cũng có thể sử dụng passive event như sau:
  ***addEventListener(event, handler, {passive: true})***

## 7.9 scrollIntoView()
là method để di chuyển tức thời màn hành tới vị trí của phần tử chỉ định.
```
element.scrollIntoView(alignToTop);
// Or
element.scrollIntoView(options);
Trong đó options là object 
{
  behavior: auto*/smooth,
  block: start*/center/end/nearest, //theo chiều dọc màn hình
  inline: start/center/end/nearest* // theo chiều ngang màn hình
}
```
## 7.10 Focus Event
* Focus
* Blur
* Focusin(có tính bubble)
* Focusout(có tính bubble)

Ví dụ đoạn code sau thể hiện tính thừa hưởng bubble:
```
<form id="form">
  <label>
    Some text:
    <input type="text" placeholder="text input" />
  </label>
  <label>
    Password:
    <input type="password" placeholder="password" />
  </label>
</form>
```
```
const form = document.getElementById("form");

form.addEventListener("focusin", (event) => {
  event.target.style.background = "pink";
});

form.addEventListener("focusout", (event) => {
  event.target.style.background = "";
});

```
## 7.11 Event Delegation- (đại diện) - sử dụng event.target property
**là việc sử dụng event.target để cleancode, tạo ra ít event listener hơn những logic tương tự.**
Xem ví dụ để hiểu hơn:
***Code thường***
```
let home = document.querySelector('#home');
home.addEventListener('home',(event) => {
    console.log('Home menu item was clicked');
});

let dashboard = document.querySelector('#dashboard');
dashboard.addEventListener('dashboard',(event) => {
    console.log('Dashboard menu item was clicked');
});

let report = document.querySelector('#report');
report.addEventListener('report',(event) => {
    console.log('Report menu item was clicked');
});

```

***Event Delegation***
```
let menu = document.querySelector('#menu');

menu.addEventListener('click', (event) => {
    let target = event.target;

    switch(target.id) {
        case 'home':
            console.log('Home menu item was clicked');
            break;
        case 'dashboard':
            console.log('Dashboard menu item was clicked');
            break;
        case 'report':
            console.log('Report menu item was clicked');
            break;
    }
});
```
***event.target***
trả về element nơi mà sự kiện xảy ra
Khác với event.currentTarget là trả về chính element được add event

## 7.11 Event dispatchEvent() method
là phương thức để gửi đi tín hiệu khởi tạo 1 sự kiện, có đánh dấu cho thời kiểm sự kiện được kích hoạt.
**Event constructor**
```
let event = new Event(type, [,options]);
```
* type là 1 string tên đại diện cho sự kiện: như là 'click', 'focus',...
* options: gồm 2 thuộc tính
bubbles: true/false
cancelable: true/false


**Custom Event**
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JavaScript Custom Event</title>
</head>
<body>
    <div class="note">JS Custom Event</div>
    <script>
        function highlight(elem) {
            const bgColor = 'yellow';
            elem.style.backgroundColor = bgColor;

            // create the event
            let event = new CustomEvent('highlight', {
                detail: {
                    backgroundColor: bgColor
                }
            });
            // dispatch the event
            elem.dispatchEvent(event);
        }

        // Select the div element
        let div = document.querySelector('.note');

        // Add border style
        function addBorder(elem) {
            elem.style.border = "solid 1px red";
        }

        // Listen to the highlight event
        div.addEventListener('highlight', function (e) {
            addBorder(this);

            // examine the background
            console.log(e.detail);
        });

        // highlight div element
        highlight(div);
    </script>
</body>
</html>
```

# 8 Debounce
*là phương pháp lập trình được sử dụng để giới hạn tốc độ/số lần gọi của 1 chức năng trong 1 khoảng thời gian được cài đặt.*
```javascript
const debounce = (fn, delay=500) => {
    let timeoutId;

    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // Nếu tồn đang trong thời gian delay thì sẽ clear hàm setTimeOut()
        timeoutId = setTimeout(() => {
            fn.apply(null, args);///đây là chỗ callback function này
        }, delay);
    };
};
```