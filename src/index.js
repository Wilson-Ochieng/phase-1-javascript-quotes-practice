//-----------------CONSTANTS--------------------
const quotesUrl = 'http://localhost:3000/quotes?_embed=likes'
const quoteUl = document.querySelector("ul")

const postQuoteUrl = 'http://localhost:3000/likes'



//------------------FETCH FXNS-----------------

function fetchQuotes() {
    fetch(quotesUrl)
        .then(response => response.json())
        .then(quotes => { //console.log(quotes)  //------WORKS!!
            quotes.forEach(quote => {
                //console.log(quote)  //------WORKS!
                renderQuotes(quote)
            })   
        })         
}

function postQuote(newQuoteObject) {
    fetch(postQuoteUrl, {
        method: 'POST',
        headers: {
            'content-type': "application/json"
        },
        body:JSON.stringify(newQuoteObject)
    })
    .then(response => response.json())
    .then(newQuote => console.log(newQuote))
}

function deleteQuote(quote) {
    fetch("http://localhost:3000/", {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(quote => console.log(quote))
}
//-----------------HANDLER FXNS-----------------

function handleSubmit(e){
    e.preventDefault()
    let newQuoteObject = {
        quoteId: 12,
        quote: e.target.quote.value,
        author: e.target.author.value
    }
    renderQuotes(newQuoteObject)
    postQuote(newQuoteObject)
}

// function handleDelete(e){

// }
//-----------------RENDER FXNS------------------
const renderQuotes = fullQuote => {
    const {id, author, quote} = fullQuote

    const quoteLi = document.createElement("li")
    quoteLi.className = 'quote-card'

    const blockQuote = document.createElement('blockquote')
    blockQuote.className = ('blockQuote')

    const p = document.createElement('p')
    p.className = "mb-0"
    p.innerText = `${quote}`

    const footer = document.createElement('footer')
    footer.className = ("blockquote-footer")
    footer.innerText = `${author}`

    const likeButton = document.createElement('button')
    likeButton.className = ('btn-success')
    likeButton.innerText = "Likes: 0"

    const deleteButton = document.createElement('button')
    deleteButton.className = ('btn-danger')
    deleteButton.innerText = "Delete"

    blockQuote.append(p, footer, likeButton, deleteButton)
    quoteLi.append(blockQuote)    
    quoteUl.append(quoteLi)

}

//------------------EVENT LISTENERES------------
document.addEventListener('DOMContentLoaded', fetchQuotes)
document.getElementById('new-quote-form').addEventListener('submit', handleSubmit)
const deleteBtn = document.querySelector(".btn-danger")
deleteBtn.addEventListener("click", deleteQuote())

//------------------HELPER FXNS-----------------

