import { enableIndexedDbPersistence } from "firebase/firestore";



const filterData = (arr,searchName) => {
    const copy = arr.filter(ts => ts.toLowerCase().includes(searchName.toString().toLowerCase()));
    console.log(copy)
    return copy
 }

test('Data filters correctly', () => {
    const testarr = ["Test 1", "Test 2","Name 1", "Name 2" ]
    const comp = filterData(testarr, "Test");
    expect(["Test 1", "Test 2"]).toStrictEqual(comp);
})

