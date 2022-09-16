const deleteBtn = document.querySelectorAll('.del')
const postItem = document.querySelectorAll('span.not')
const commentDeletes = document.querySelectorAll('.commentDel')

try {
    const logo = document.querySelector('#logo')
    logo.addEventListener('mouseout', stopAnimateLogo)
    logo.addEventListener('mouseover', animateLogo)
} 
catch (err) {
    console.log('')
}

try {
    const biglogo = document.querySelector('#biglogo')
    biglogo.addEventListener('mouseout', stopAnimateLogo)
    biglogo.addEventListener('mouseover', animateLogo)
}
catch (err) {
    console.log('')
}

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deletePost)
})

Array.from(commentDeletes).forEach((el)=>{
    el.addEventListener('click', deleteComment)
})

function animateLogo(event) {
    console.log('moved in!')
    const imageElement = event.target;
    imageElement.src = '/images/logoanimate.gif'
}

function stopAnimateLogo(event) {
    const imageElement = event.target;
    imageElement.src = '/images/staticlogo.png'
}

async function deletePost(){
    console.log('lol')
    const postId = this.parentNode.parentNode.dataset.id
    if (confirm("Are you sure you want to delete this post? This can't be undone!")) {
        try{
            const response = await fetch('/blogPost/deletePost', {
                method: 'delete',   
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    'postIdFromJSFile': postId
                })
            })
            const data = await response.json()
            console.log(data)
            location.assign('/')
        }catch(err){
            console.log(err)
        }
    }
}

async function deleteComment(){
    console.log('this is the one')
    const commentId = this.parentNode.parentNode.dataset.id
    if (confirm("Are you sure you want to delete this comment? This can't be undone!")) {
        try{
            const response = await fetch('/comment/deleteComment', {
                method: 'delete',   
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    'postIdFromJSFile': commentId
                })
            })
            const data = await response.json()
            console.log(data)
            location.assign('/')
        }catch(err){
            console.log(err)
        }
    }
}
