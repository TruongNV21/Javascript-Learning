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


