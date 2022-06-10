const addButton = document.querySelectorAll('#buttonAdd')
const deleteText = document.querySelectorAll('.fa-trash')

Array.from(addButton).forEach((element)=>{
    element.addEventListener('click', addCharacter)
})

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteCharacter)
})

async function addCharacter(){
    const sName = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('addCharacter', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'name': sName
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function deleteCharacter(){
    const sName = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('deleteCharacter', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'name': sName
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

// async function addLike(){
//     const sName = this.parentNode.childNodes[1].innerText
//     const bName = this.parentNode.childNodes[3].innerText
//     const tLikes = Number(this.parentNode.childNodes[5].innerText)
//     try{
//         const response = await fetch('addOneLike', {
//             method: 'put',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({
//               'stageNameS': sName,
//               'birthNameS': bName,
//               'likesS': tLikes
//             })
//           })
//         const data = await response.json()
//         console.log(data)
//         location.reload()

//     }catch(err){
//         console.log(err)
//     }
// }