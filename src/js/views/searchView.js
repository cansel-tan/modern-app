import { elements } from "../base";
//diğer search edilen bilgiler aşağıya eklendiğinden form temizlenmeli
export const clearInput = () =>{
    elements.searchInput.value="";
}

export const clearResults = () =>{
    elements.movieList.innerHTML="";
}
//movie bilgisini id ye göre sorgulatma 
export const displayResults = (keyword,data) =>{
   data.results.forEach(movie => {
        const html=`
            <li class="media mb-3">
                <img src="https://www.themoviedb.org/t/p/w92/${movie.poster_path}" onerror="this.src='https://via.placeholder.com/92x138';" class="mr-3" alt="${movie.title}">
                <div class="media-body">
                <h5 class="mt-0 mb-1">
                <span class="badge badge-primary">${movie.vote_average}</span> 
                  <a href="#${movie.id}">${movie.title}</a>
                    </h5>
                <p>${movie.overview}</p>
                </div>
            </li>
        
        `;
        //resim olmayan filmlerde sabit bir resim görüntüsü için onerror kullanılır.
        elements.movieListContainer.classList.add('d-block');
        elements.movieListHeader.innerHTML=`${keyword} arasında ${data.total_results} sonuç bulundu.`; //
        elements.movieList.insertAdjacentHTML('beforeend',html); //içerisinde abc geçen filmler ekrana yazdırılır.
    })
}