//api: 3ff8de548e667dfc69e3be90e1220aaf
//url : https://api.themoviedb.org/3/
//https://api.themoviedb.org/3/movie/550?api_key=3ff8de548e667dfc69e3be90e1220aaf&language=en-US&query=a&page=1&include_adult=false

//Search classının bilgileri export edildiği için buraya import ederek alabiliriz. Sonra da nesne türetip üzerinden getresults çağrıldığında bilgi alınır.

import Search from "./models/Search"; 
import { elements,loaderClose,renderLoader } from "./base";
import * as searchView from "./views/searchView";
import * as movieView from "./views/movieView";

import { Movie } from "./models/Movie";

const state = {};

//Search Controller
const searchController = async() => {
    const keyword =elements.searchInput.value;
//input girişi
    if(keyword){
        state.search=new Search(keyword);
        searchView.clearInput();
        searchView.clearResults();

        renderLoader(elements.movieListContainer,loaderClose);//movielist bilgisinin üzerine loading icon ekleme
        await state.search.getResults();      
        searchView.displayResults(keyword,state.search.data); 
        setTimeout(() => {
            loaderClose(elements.movieListContainer); // movielist geldikten 1 sn sonra loading iconunun kaldırılması 
        }, 1000);       
    }
    else{
        alert("anahtar kelime girmelisiniz.");
    }
}

elements.searchForm.addEventListener('submit',function (e){

    e.preventDefault();
    searchController();
    console.log("form submitted");
});

//Movie Controller
//localden (sayfa bilgisinden) ilgili movie id alınır.
const movieController= async () =>{
    const id =window.location.hash.replace('#','');
    if(id){
        state.movie=new Movie(id);
        renderLoader(elements.movieDetailsContainer);
        await state.movie.getMovie();
        movieView.backToTop();
        movieView.displayMovie(state.movie.data);
        setTimeout(() => {
        loaderClose(elements.movieDetailsContainer); // details geldikten 1 sn sonra loading iconunun kaldırılması 
        }, 1000);  
        
    }
    
};
elements.movieDetailsClose.addEventListener('click',movieView.closeDetails);
window.addEventListener('hashchange', movieController);//kullanıcı bir film seçtiğinde moviecontroller çağrılır.