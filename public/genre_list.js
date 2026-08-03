
function loadGenrelist(){

const list = 
   { heavy_metal: "Heavy",
     trash_metal: "Trash",
      death_metal: "Death",
       grind: "Grind",
       metalcore: "Metalcore",
       deathcore: "Deathcore"

     }

const genreSelect = document.getElementById('radio-options-genre');
const select = document.getElementById('radio-options-genre')
select.innerHTML = '';
for (const [k, v] of Object.entries(list)) {
    // console.log(`${k}: ${v}`);

    

    const option = document.createElement('option');
            option.value = k;
            // console.log(k)
            option.textContent = `${v}`;
            genreSelect.appendChild(option);






}





};

loadGenrelist();