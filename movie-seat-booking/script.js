

const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)'); //makes a nodelist with them
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');


populateUI();


let ticketPrice = +movieSelect.value; //'+' turns into a number
 
function updateSelectedCount(){

    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const selectedSeatsCount = selectedSeats.length; 

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;

    //spread copys the elements of an array. Copy the node list into a regular array
    const seatsIndex = [...selectedSeats].map(seat=>[...seats].indexOf(seat));

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

}

//saves selected movie index and price
function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice)
}


function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    console.log(selectedSeats);

    if(selectedSeats != null && selectedSeats.length > 0 ){
        seats.forEach((seat, index)=>{
            if(selectedSeats.indexOf(index) > -1 ){
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex!== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}


container.addEventListener('click', (e)=>{

    //e.target gets the html element that its being clicked

    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){

        e.target.classList.toggle('selected'); //toggle - to be able to remove and add classlist
   
        updateSelectedCount();

    }
});

movieSelect.addEventListener('change', e=>{

    ticketPrice = e.target.value;

    setMovieData(e.target.selectedIndex, e.target.value);

    updateSelectedCount();


});

updateSelectedCount();
