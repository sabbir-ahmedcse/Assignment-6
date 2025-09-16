const loadPlants = () => {
    toggleSpinner(true);
    fetch("https://openapi.programming-hero.com/api/plants")
        .then((res) => res.json())
        .then((data) => {
            displayPlants(data.plants)


        })
        .finally(() => toggleSpinner(false));
}
let totalPrice = 0;

const displayPlants = (datas) => {
    const cardContainer = document.getElementById("card-container")
    cardContainer.innerHTML = ""
    datas.forEach(element => {
        const cardBtn = document.createElement("div")
        cardBtn.innerHTML = `
        <div class="card bg-base-100 p-2 space-y-4  shadow-md w-full block">
                <img src="${element.image}" class="h-40 w-full object-cover rounded-md"/>
                <div class="  space-y-4">
                    <h2 class="card-title" onclick="loadWordDetail(${element.id})">${element.name}</h2>
                    <p class="text-justify tracking-normal">${element.description}</p>
                    <div class="flex justify-between items-center">
                        <p class="bg-amber-50 p-2 rounded-2xl ">${element.category}</p>
                        <span><i class="fa-solid fa-bangladeshi-taka-sign"></i>${element.price}</span>
                    </div>
                    <div class="card-actions">
                        <button class="btn text-white bg-green-700 block rounded-3xl w-full button">Add to Card </button>
                    </div>
                </div>
            </div>
        `;
        cardContainer.append(cardBtn)

        const btn = cardBtn.querySelector("button");
        btn.addEventListener("click", () => {

            alert(`${element.name} has been added to card`)
            const cartList = document.getElementById("cart-list");
            const div = document.createElement("div");
            div.innerHTML = `
              
                <div class="flex justify-between items-center p-2 shadow bg-amber-50  rounded-sm ">
                    <div>
                    <h2>${element.name}</h2>
                    <span><i class="fa-solid fa-bangladeshi-taka-sign"></i>${element.price}</span>
                </div>
                <button class="remove"><i class="fa-solid fa-xmark"></i></button>
                </div>
            `;
            cartList.appendChild(div);


            totalPrice += element.price;
            document.getElementById("total-price").innerHTML = `
                 <h2>Total: <i class="fa-solid fa-bangladeshi-taka-sign"></i> ${totalPrice}</h2>
            `;

            const removeBtn = div.querySelector(".remove");
            removeBtn.addEventListener("click", () => {
                div.remove();

                totalPrice -= element.price;
                document.getElementById("total-price").innerHTML = `
                    <h2>Total: <i class="fa-solid fa-bangladeshi-taka-sign"></i> ${totalPrice}</h2>
                `;
            });


        });

    });
}

const removeActive = () => {
    document.querySelectorAll(".cursor-pointer").forEach(btn => {
        btn.classList.remove("active")
        console.log()
    })
    // for(let lessonBtn of lessonBtns){
    //     lessonBtn.classList.remove("active")
    // }

}

const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then((res) => res.json())
        .then((data) => {
          
            displayCategories(data.categories)

        })
}

const displayCategories = (arr) => {
    const categories = document.getElementById("categories")
    categories.innerHTML = "";
    arr.forEach(element => {
        const btn = document.createElement("p")
        btn.innerHTML = `
                  <p id="lesson-btn-${element.id}" class="px-3 py-1 rounded transition duration-300 font-semibold
                  text-gray-700 hover:text-white cursor-pointer
                   hover:bg-blue-600">${element.category_name}</p>`;
                
         btn.addEventListener("click", ()=>{
          loadCategoryPlants(element.id)
         })



        categories.append(btn)
    });

}

  const loadCategoryPlants = (id) => {
    toggleSpinner(true);
    fetch(`https://openapi.programming-hero.com/api/category/${id}`)
        .then((res) => res.json())
        .then((data) => {
               removeActive();
            const lessonBtn = document.getElementById(`lesson-btn-${id}`)
            lessonBtn.classList.add("active")
            displayPlants(data.plants);
        })
        .finally(() => toggleSpinner(false));
  };


const loadWordDetail = async (id) => {
    // toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/plant/${id}`
    const res = await fetch(url)
    const details = await res.json();
    displayWordDetails(details.plants)
    // toggleSpinner(false);

}

const displayWordDetails = (word) => {
    console.log(word)
    const modalContainer = document.getElementById("modal-category")
    modalContainer.innerHTML = `
                
                <h3 class="text-lg font-bold">${word.name}</h3>
                <img src="${word.image}" alt="" class="h-40 w-full object-cover rounded-md">
                <h2 class="mt-5 font-semibold">Category: ${word.category}</h2>
                <spas class="mt-5 font-semibold">Price: <i class="fa-solid fa-bangladeshi-taka-sign"></i>${word.price}</span>
                    <p class="py-4">${word.description}</p>
                    <div class="modal-action">
                        <form method="dialog">
                            <!-- if there is a button in form, it will close the modal -->
                            <button class="btn">Close</button>
                        </form>
                   
    
    `;
    document.getElementById("my_modal_5").showModal();

}






const toggleSpinner = (isLoading) => {
    const spinner = document.getElementById("spinner");
    const cardContainer = document.getElementById("card-container");

    if (isLoading) {
        spinner.classList.remove("hidden");
        cardContainer.classList.add("hidden");
    } else {
        spinner.classList.add("hidden");
        cardContainer.classList.remove("hidden");
    }
};


loadCategories()
loadPlants()
