// Ex1: Tìm vị trí index của 2 phần tử có tổng bằng target trong mảng đã cho.

// Cách 1;
// const map1 = new Map();
// map1.set('a', 1);
// map1.set('b', 2);
// map1.set('c', 3);

// function twoSum(nums,target){
//     let map = new Map;
//     for(let i = 0; i<nums.length; i++) {
//         let complement = target - nums[i];
//         if(map.has(complement)){
//             return [map.get(complement),i];
//         }
//         else{
//             map.set(nums[i],i);
//         }
//     };
//     if(map.size===nums.length)
//         return [];
// }


// Cách 2;
// const arr = [1,2,4,4,7,2,6,8,10,3]
// function twoSum(arr, target){
//     let nums = arr.sort((a,b)=>a-b);
//     console.log(nums);
//     const n = nums.length;
//     let result = [], low = 0, high = n-1, sum = 0;
    
//     if(n<2){
//         return [];
//     }
    
//     while(low<high){
//         sum = nums[low] + nums[high];

//         if(sum === target){
//             result.push([nums[low],nums[high]]);
//             low++;
//             high--;
//         }
//         else if(sum <target)
//             low++;
//             else high--;
//     }
//     return result;
// }

// console.log(twoSum(arr,12));

//====================================================================

// Ex2: Cho 2 mảng đã được sắp xếp, trả về mảng mới được Merged từ 2 mảng và cả giá trị trung bình của mảng sau khi Merged
// const arr1 =[1,3],
// arr2 = [2,7];

// var findMedianSortedArrays = function (nums1, nums2) {
//     let arrayResult = [];
//     const mergedArray = [...nums1, ...nums2].sort((a,b)=>{
//         return a -b;
//     })
//     mergedArray.forEach((element)=>{
//         if(!arrayResult.includes(element)){
//             arrayResult.push(element);
//         }
//     });
//     console.log(arrayResult)
//     let total = arrayResult.reduce((total,currentValue)=>{
//         return total+=currentValue;
//     },0)
//     return Number.parseFloat(total/arrayResult.length);
// };

//====================================================
// Ex3: Tìm 3 số trong mảng có tổng bằng target
// const nums = [1,3,4,2,2,3,6,-1,-3,-5,-20,20,0]
// const nums1 = [-1,0,1,2,-1,-4];

// function threeSum(nums,target){
//     nums.sort((a,b)=>a-b);
//     console.log(nums)
//     const n = nums.length;
//     let result = [];

//     if(n < 3)
//     return [];

//     for( let i = 0; i<n; i++){
//         let sum = 0, low = i+1, high = n-1;

//         if(i>0 &&nums[i-1]===nums[i]){
//             continue;
//         }
//         while(low<high){
//             sum = nums[i] + nums[low] + nums[high];
//             if(sum === target){
//                 result.push([nums[i], nums[low], nums[high]]);
//                 while(nums[low+1]===nums[low]) low++;
//                 while(nums[high-1]===nums[high]) high--;
//                 low++;
//                 high--;
//             }
//             else if(sum < target){
//                 low++
//             } else high--;
//         }
//     }
//     return result;
// }



// =====================================================
// Ex4: Loại bỏ các phần tử bị lặp của mảng.
//CACH1: Không thêm mảng mới
// const nums1 = [1,1,2,3,4,4,6,5];

// var removeDuplicates = function(nums) {
//     nums.sort((a,b)=>a-b);
//     let tmp = nums[0], k = 1;
//     for(let i =1; i<nums.length; i++){
//         if(tmp<nums[i]){
//             tmp = nums[i];
//             nums[k]= tmp;
//             k++
//         }
//     }
//     console.log(nums,k);
//     return k;
// };
// removeDuplicates(nums1);

//Cach2: Tạo ra mảng mới
// var removeDuplicates = function(nums){
//     let result = nums.filter((element, index, array)=>{
//         return array.indexOf(element)==index;
//     })
//     return result;
// }
// console.log(removeDuplicates(nums1));

// =======================================================================
// Ex5: Xóa phần tử chỉ định trong mảng mà không được dùng tới mảng mới
// const nums1 = [0,1,2,2,3,0,4,2];
// CACH1: Không làm thay đổi kích thước của mảng.
// var removeElement = function(nums, val) {
//     let result = nums.filter((element)=>{
//         return element !== val;
//     })
//     return result;
// };
// Cach2: Có làm thay đổi kích thước của mảng 
// var removeElement = function(nums, val){
//     while(nums.indexOf(val)!==-1){
//         nums.splice(nums.indexOf(val),1);
//     }
//     console.log(nums);
//     return nums.length;
// }
// console.log(removeElement(nums1,2));
// ============================================================================
// Ex6: Tìm mảng hoán vị của mảng đã cho.

// const board = 
// [["5","3",".",".","7",".",".",".","."]
// ,["6",".",".","1","9","5",".",".","."]
// ,[".","9","8",".",".",".",".","6","."]
// ,["8",".",".",".","6",".",".",".","3"]
// ,["4",".",".","8",".","3",".",".","1"]
// ,["7",".",".",".","2",".",".",".","6"]
// ,[".","6",".",".",".",".","2","8","."]
// ,[".",".",".","4","1","9",".",".","5"]
// ,[".",".",".",".","8",".",".","7","9"]];


// var isValidSudoku = function(board){
//     for(let i =0; i<9;i++){
//         let row = new Set(),
//         col = new Set(), 
//         box = new Set();

//         for(let j =0; j<9;j++){
//             let _row = board[i][j];
//             let _col = board[j][i];
//             let _box = board[3*Math.floor(i/3)+Math.floor(j/3)][3*(i%3)+(j%3)];
//             if(_row!=='.'){
//                 if(row.has(_row)) return false
//                 row.add(_row);
//             }

//             if(_col!=='.'){
//                 if(col.has(_col)) return false;
//                 col.add(_col);
//             }
//             if(_box!=='.'){
//                 if(box.has(_box)) return false;
//                 box.add(_box);
//             }
//         }
//     }
//     return true;
// }

// console.log(isValidSudoku(board));

// =============================================================

// Ex7: Tìm ra các mảng có tổng các phần tử bằng target được truyền vào, các phần tử là phần tử của mảng đã cho (có thể lặp lại phần tử)
// const digits = [1,2,9];
// var plusOne = function(digits) {
//     return (BigInt(digits.join('')) + BigInt(1)).toString().split('')
// };
// console.log(plusOne(digits));
// =========================================================================

// Ex8: Gộp 2 mảng tạo thành mảng được sắp xếp tăng dần nhưng không sinh ra mảng mới, mảng kết quả chính là 1 trong 2 mảng được truyền vào
// const  nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 1;
// var merge = function(nums1, m, nums2, n){
//     let i = m-1, j = n-1, k = m + n -1;
//     while( i>=0&&j>=0){
//         if(nums1[i]>=nums2[j]){
//             nums1[k] = nums1[i];
//             i--;
//         }
//         else{
//             nums1[k]= nums2[j];
//             j--;
//         }
//         k--;
//     }
//     while(i>=0){
//         nums1[k--] = nums1[i--];
//     }
//     while(j>=0){
//         nums1[k--] = nums2[j--];
//     }
// }

// merge(nums1,m,nums2,n);
// console.log(nums1);

// ==============================================================================

// Ex8: Roman2Int
// var romanToInt = function(s){
//     const sym = {
//         'I': 1,
//         'V': 5,
//         'X': 10,
//         'L': 50,
//         'C': 100, 
//         'D': 500,
//         'M': 1000
//     }

//     return s.split("").reduce((acc, curr, i, arr) => {
//         return sym[curr] >= sym[arr[i + 1]]||i==arr.length-1 ? acc+sym[curr] : acc-sym[curr]}, 0);
// }

// romanToInt('MCMXCIV');

// ======================================================================================

// Ex9: Kiểm tra chuỗi khởi đầu chung dài nhất của 1 mảng string
// let  strs = ["dog","racecar","car"]
// var longestCommonPrefix = function(strs){
//     let k = 0;
//     let tmp = strs[0];
    
//     for(let i = 1; i<=tmp.length; i++){
//         if(!strs.every((item)=>{
//             return item.startsWith(tmp.slice(0,i))
//         })){
//             continue;
//         }
//         else{
//             k++;
//         }
//     }
//     return tmp.slice(0,k);
// }

// console.log(longestCommonPrefix(strs));

// ==============================================================================
// Ex10: Valid Parenthese
// const s = "{]";
// var isValid = function (s){
//     const pairs = {
//         "{":"}",
//         '[':']',
//         '(':')'
//     }
//     let str = s.split(' ').join(''),
//     stack = [];
//     if(str.length%2==1){
//         return false;
//     }
//     if(str[0]==='}'||str[0]==']'||str[0]==')'){
//         return false;
//     }
//     if(str[str.length-1]==="["||str[str.length-1]==="("||str[str.length-1]==="{"){
//         return false;
//     }
    
//     for(let i = 0; i<str.length;i++){
//         if(str[i]=='('||str[i]=='['||str[i]=='{'){
//             stack.push(str[i])
//         }
//         else if(str[i] !== pairs[stack.pop()]){
//             return false;
//         }
//     }

//     return stack.length === 0;
// }

// console.log(isValid(s));

// ================================================================

// Ex11: Tìm chỉ số đầu tiên trong chuỗi hợp với target truyền vào
// const haystack = "leetcode", needle = "leeto"

// var strStr = function(haystack, needle){
//     return haystack.indexOf(needle)
// }
// console.log(strStr(haystack,needle))

// ================================================================
// Ex12: Chuyển số sang title
// const n =  701

// var convertToTitle = function(n){
//     let result = '';
//     while(n>0){
//         let code = n % 26;
//         let i = Math.floor(n/26);
//         if(code ==0){
//             code = 26;
//             i--;
//         }
//         result += String.fromCharCode(64+code);
//         n = i;

//     }
//     return result.split('').reverse().join('');
// }

// console.log(convertToTitle(n))

// ================================================================
// Ex13: Dec2Bin

// var dec2Bin = function(n){
//     let result = [];
//     while(n>0){
//         result.push(n%2);
//         n = Math.floor(n/2);
//     }
//     console.log(result.reverse().join(''))
// }

// dec2Bin(10);
// =========================================================================
let btn = document.querySelector('#button')
let header = document.querySelector('header')
// document.body.addEventListener('click',function(event) {
//     console.log('The body was clicked!');
//     // event.stopPropagation();

// });
header.addEventListener('click',(event)=>{
    console.log('The header was clicked!')
    console.log(event.eventPhase)
    event.stopPropagation()
},false)
btn.addEventListener('click', function(event) {
    console.log('The button was clicked!');
    console.log(event.bubbles)
    event.preventDefault()
    // event.stopPropagation()
});


