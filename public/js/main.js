const addButton = document.querySelector('#buttonAdd')
const deleteText = document.querySelectorAll('.trashCans')

Array.from(deleteText).forEach((element)=>{
    element.parentElement.className === "Character" ? element.addEventListener('click', deleteCharacter) : element.addEventListener('click', deletePlanet)
})

addButton.addEventListener('click', addCharacter)

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

async function addPlanet(){
    const sName = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('addPlanet', {
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

async function deletePlanet(){
    const sName = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('deletePlanet', {
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