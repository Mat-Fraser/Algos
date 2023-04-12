async function insertion(){
    console.log('In insertion()');
    const ele = document.querySelectorAll(".bar");
    ele[0].style.background = '#15ff00';
    for(let i = 1; i < ele.length; i++){
        console.log('In ith loop');
        let j = i - 1;
        let key = ele[i].style.height;
        ele[i].style.background = 'red';
        await waitforme(delay);
        while(j >= 0 && (parseInt(ele[j].style.height) > parseInt(key))){
            console.log('In while loop');
            ele[j].style.background = 'red';
            ele[j + 1].style.height = ele[j].style.height;
            j--;
            await waitforme(delay);
            for(let k = i; k >= 0; k--){
                ele[k].style.background = '#15ff00';
            }
        }
        ele[j + 1].style.height = key;
        ele[i].style.background = '#15ff00';
    }
}
const inSortbtn = document.querySelector(".insertionSort");
inSortbtn.addEventListener('click', async function(){
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    await insertion();
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
});


