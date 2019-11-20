/*
Alan Daniel
CS4220

This file goes in a js folder in the same directory as index
*/
let chuck = new Vue({
    // the element on the main page to be replaced with our vue app
    el: '#chuck',

    // The data that will bind to our template
    data: {
        appName: 'Chuck Norris Facts',
        currentJoke: '',
        previousJokes: [],
        isFetchingAJoke: false,
        currentCategory: '',
        categories: [],
        search: '',
        searchResults:[],
        formatResult:[],
        selected:'',
        history:[]
    },

    // Methods that may be called on our vue object
    methods:{

        // Fetch a joke from chuck norris api
        getJoke: function(){
            this.isFetchingAJoke = true

            // We need to be able to reference our vue object (model) from 
            // within the .get and .then functions below.  Since 'this' will
            // change with each function call, we store a reference to the 
            // current 'this' here
            let viewModel = this
            
            if(viewModel.selected != null && viewModel.selected != "Any")
            {
                axios.get('https://api.chucknorris.io/jokes/random?category=' + viewModel.selected, {
                    headers: {
                        Accept: 'application/json'
                    }
                })
                .then(function(response){
                    viewModel.isFetchingAJoke = false

                    // Add the current joke to the previous jokes array
                    if (viewModel.currentJoke)
                        viewModel.previousJokes.push(viewModel.currentJoke)

                    // Assign the new joke to the 'currentJoke' property
                    viewModel.currentJoke = response.data.value
                })
                .catch(function(err){
                    alert(err)
                })
            }

            else
            {
                axios.get('https://api.chucknorris.io/jokes/random', {
                    headers: {
                        Accept: 'application/json'
                    }
                })
                .then(function(response){

                    viewModel.isFetchingAJoke = false
                    console.log(response)

                    // Add the current joke to the previous jokes array
                    if (viewModel.currentJoke)
                        viewModel.previousJokes.push(viewModel.currentJoke)

                    // Assign the new joke to the 'currentJoke' property
                    viewModel.currentJoke = response.data.value
                })
                    .catch(function(err){
                        alert(err)
                    })
                }
            },

        getSearch: function(){

            this.isFetchingAJoke = true
            let viewModel = this
            viewModel.searchResults =[];
            axios.get('https://api.chucknorris.io/jokes/search?query='+viewModel.search, {
                headers: {
                    Accept: 'application/json'
                }
            })
            .then(function(response){

                viewModel.isFetchingAJoke = false
                let obj = JSON.parse(response.request.response)
                // Add the current joke to the previous jokes array
               
                for (let i=0; i < obj.result.length; i++)
                {
                    viewModel.searchResults.push(obj.result[i].value)
                }
               viewModel.history.push(viewModel.search)
            })
            .catch(function(err){
                alert(err)
            })
        },

        getCategory: function(){
            let viewModel=this
            if (viewModel.categories[0]!= null)
            {
                return 0 //getCategory is canceled when it is called the first time
            }
            else
            {
                axios.get('https://api.chucknorris.io/jokes/categories', {
                    headers: {
                        Accept: 'application/json'
                    }
                })
                .then(function(response){
                    let choices = response.data //access entire array
                    for(let i = 0; i < choices.length; i++) {
                        viewModel.categories.push(choices[i])
                    }
                })
                .catch(function(err){
                    alert(err)
                })
                }
            }

    }
})