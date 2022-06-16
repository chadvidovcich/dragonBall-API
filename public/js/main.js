const addButton = document.querySelector('#buttonAdd')
const deleteText = document.querySelectorAll('.trashCan')

deleteText.forEach((element)=>{
    element.parentElement.className === "Character" ? element.addEventListener('click', deleteCharacter) : element.addEventListener('click', deletePlanet)
})

addButton.addEventListener('click', addCharacter)

async function addCharacter(){
    const sName = this.parentNode.childNodes[1].innerText
    const sPlanet = this.parentNode.childNodes[2].innerText
    try{
        const response = await fetch('/api/character', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'name': sName,
              'planet': sPlanet
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload(true)
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
        
    }catch(err){
        console.log(err)
    }
    location.reload(true)
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
        location.reload(true)

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
        location.reload(true)

    }catch(err){
        console.log(err)
    }
}