import { elements } from "../base";

export const backToTop = () =>{
    window.scrollTo({top:0, behavior:'smooth'}); //film seçildiğinde scrollbarın yukarı alınması
}
export const closeDetails = () =>{
    elements.movieDetailsContainer.classList.remove('d-block');
}
export const displayMovie = movie => {

        var html= '<div class="row">';
        var genres = ""; //film türünün yazdırılması

        movie.genres.forEach(genre => {
            genres += `<span class="badge badge-primary ml-1">${genre.name}</span>`;

        })

        html+=`
        
        <div class="col-md-4">
        <img src="https://www.themoviedb.org/t/p/w500/${movie.poster_path}" onerror="this.src='https://via.placeholder.com/92x138';" class="mr-3 img-fluid" alt="${movie.title}">
        </div>

        <div class="col-md-8">
            <div>
            <h>${movie.original_title}</h>
            <p>${movie.overview}</p>
            <p><small class="badge badge-primary">${movie.vote_average}</small></p>
            <hr>
            ${genres}
            </div>
       
        </div>      
        `;

        html +='<div>';
        elements.movieDetailsContainer.classList.add('d-block'); //film bilgilerinin etrafına card bilgidi eklenir
        elements.movieDetails.innerHTML=html;
        
    
};