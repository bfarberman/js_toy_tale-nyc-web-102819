const toyCollection = document.getElementById("toy-collection")
toyCard = document.getElementsByClassName("card")




const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    
    
    
    const otherForm = document.querySelector(".add-toy-form")
    console.log(otherForm)
    otherForm.addEventListener("submit", function(e){
      e.preventDefault() 

      const toyName = document.querySelector("#toy-name")
      const toyImage = document.querySelector("#toy-image")
      


      fetch("http://localhost:3000/toys", {
        method: "POST",
        headers: {"Content-Type": "application/json",
  Accept: "application/json"},
        body: JSON.stringify({
          "name": toyName.value,
          "image": toyImage.value,
          "likes": 0
        })

      })
      
    })



  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!

fetch("http://localhost:3000/toys")
.then(resp => resp.json())
.then(toys => {
  toys.forEach(toy => {
    toyCollection.innerHTML += `<div class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button id=${toy.id} class="like-btn">Like <3</button>
  </div>`
  })
})

toyCollection.addEventListener("click", function(e){
  let toyId = e.target.id
  let pTag = e.target.previousElementSibling 
  let likesNumber = parseInt(pTag.innerText)
  pTag.innerText = `${likesNumber + 1} Likes`


  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: "PATCH",
    headers: 
{
  "Content-Type": "application/json",
  Accept: "application/json"
},

body: JSON.stringify({
  "likes": ++likesNumber
})

  })

})



