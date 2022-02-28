
let food = [];


async function Search(searchTerm) {


    const url = await `https://api.edamam.com/api/nutrition-data?app_id=8c82b029&app_key=37f2e23c306bee4d500209a14bfb34cd&nutrition-type=cooking&ingr=${searchTerm}`;


    const options = {
        headers: {
            'Accept': 'application/json',
        }
    };
    const results = await fetch(url, options);
    const data = await results.json();
    // console.log(searchTerm);
    // console.log(data);
    food.push(data);
    console.log(food);




}





const handleSearch = () => {

    const input = document.getElementById("input");
    const searchTerm = input.value.toLowerCase();
    const foodlist = document.getElementById("foodlist");
    const listItem = document.createElement("div");
    listItem.className = "listitem";
    listItem.textContent = searchTerm;
    document.getElementById("submit").textContent="Submit";
    document.getElementById("submit").className="submit";




    listItem.setAttribute('class', 'list-group-item d-flex justify-content-center   ');

    foodlist.appendChild(listItem);


    Search(searchTerm);
    input.value = "";

}


const showData = () => {

    
    if(document.getElementById("submit").className==="submit")
    {
        
        document.getElementById("submit").className="submitted";
        document.getElementById("submit").textContent="Submitted";
        
    }


    
    let calories =0;
    let totalWeight =0;
    let dietLabels=[];
    let healthLabels=[];
    let totalDaily={
        fat:0,
        fiber:0,
        protein:0,
        sugar:0,
        potash:0,
        iron:0,
        zinc:0,
        vitaminA:0,
        vitaminB:0,
        vitaminC:0

    };



    food.forEach((item) => {

        totalWeight=totalWeight+item.totalWeight;
        calories=calories+item.calories;
        // console.log(item);
        // dietLabels.push(...item.dietLabels);
        healthLabels.push(...item.healthLabels);
        console.log(healthLabels);
        totalDaily.fat+=(item.totalNutrients.FAT?.quantity)
        totalDaily.fiber+=(item.totalNutrients.FIBTG?.quantity);
        totalDaily.sugar+=item.totalNutrients.SUGAR?.quantity;
        totalDaily.protein+=item.totalNutrients.PROCNT?.quantity;
        totalDaily.potash+=item.totalNutrients.K?.quantity;

   });
    
      document.getElementById("totalcal").textContent=`Total Calories : ${calories} cal`;
   document.getElementById("totalw").textContent=`Total Weight :  ${totalWeight} g`;
   const labels =document.createElement("div");
   labels.className="labels d flex";

   healthLabels.forEach((item,index)=>
   {

    if(index<=10){

        const label =document.createElement("div");
        label.className="label";
        label.textContent=item;
        console.log(item);
        labels.append(label);
        
    }

   });

   
   document.getElementById("health").append(labels);



}