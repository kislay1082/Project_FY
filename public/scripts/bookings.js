const cardData = [
  {
    img: "../public/Images/booking/atlantis-the-palm.jpg",
    name: "Atlantis the Palm",
    prices: {
      bestPrice: {
        source: "Booking.com",
        before: "1,52,330",
        after: "96,770",
      },
      otherPrices: [
        {
          source: "Trivago",
          price: "98,800",
        },
        {
          source: "Agoda.com",
          price: "97,650",
        },
        {
          source: "Expedia",
          price: "1,10,250",
        },
      ],
    },
  },
  {
    img: "../public/Images/booking/the-ritz-carlton-dubai.jpg",
    name: "The Ritz-Carlton, Dubai",
    prices: {
      bestPrice: {
        source: "Booking.com",
        before: "1,18,903",
        after: "1,12,127",
      },
      otherPrices: [
        {
          source: "RitzCarlton.com",
          price: "1,12,078",
        },
        {
          source: "Trip.com",
          price: "1,18,903",
        },
        {
          source: "Agoda.com",
          price: "1,13,677",
        },
      ],
    },
  },
  {
    img: "../public/Images/booking/rixos-palm.jpg",
    name: "Rixos Hotel & Suites",
    prices: {
      bestPrice: {
        source: "Expedia",
        before: "2,56,416",
        after: "1,19,562",
      },
      otherPrices: [
        {
          source: "Trip.com",
          price: "1,32,550",
        },
        {
          source: "Hotels.com",
          price: "2,56,416",
        },
        {
          source: "Rixos Hotels",
          price: "2,13,949",
        },
      ],
    },
  },
  {
    img: "../public/Images/booking/hilton-jumeirah.jpg",
    name: "Hilton Jumeirah Resort",
    prices: {
      bestPrice: {
        source: "Booking.com",
        before: "47,229",
        after: "46,560",
      },
      otherPrices: [
        {
          source: "Expedia",
          price: "46,776",
        },
        {
          source: "Agoda.com",
          price: "46,777",
        },
        {
          source: "MakeMyTrip",
          price: "48,779",
        },
      ],
    },
  },
];

const cardContainer = document.getElementById("card-container");

function createCard(cardData) {
  const card = document.createElement("div");

  card.innerHTML = `
  <div
  class="w-[80%] mx-auto bg-lightest rounded-xl overflow-hidden flex border-2 border-solid border-mid"
>
  <!-- Image Section -->
  <div class="h-full overflow-hidden w-1/3">
    <img
      src="${cardData.img}"
      alt="Card Image"
      class="w-full h-full object-cover"
    />
  </div>

  <!-- Text Section -->
  <div class="flex px-4 py-2 w-2/3">

      <div class="p-4 mr-12 w-[60%]">
          <!-- Main Heading -->
          <h2 class="text-xl font-[700] text-dark mb-2">${cardData.name}</h2>

          <!-- Smaller Heading and 2 p tags -->
          <h3 class="text-lg font-[500] my-4">${cardData.prices.bestPrice.source}</h3>
          <p class="text-lg text-red-600 line-through">&#x20B9;${cardData.prices.bestPrice.before}</p>
          <p class="text-lg text-green-600">&#x20B9;${cardData.prices.bestPrice.after}</p>

          <button class="rounded-full text-base text-dark bg-brand hover:bg-dark hover:text-brand font-[700] px-6 py-2 w-[80%] mt-8">View Deal</button>
      </div>

    <!-- Sleek Partition -->
    <div class="border-[1px] border-solid border-mid h-[80%] my-auto"></div>

    <!-- Section with 3 Elements -->
    <div class="flex flex-col justify-evenly mx-auto">
      <!-- Element 1 -->
      <div class="w-1/3">
        <p class="text-sm">${cardData.prices.otherPrices[0].source}</p>
        <div class="border-[1px] border-mid w-16 my-1"></div>
        <p class="text-sm">&#x20B9;${cardData.prices.otherPrices[0].price}</p>
      </div>

      <!-- Element 2 -->
      <div class="w-1/3">
        <p class="text-sm">${cardData.prices.otherPrices[1].source}</p>
        <div class="border-[1px] border-mid w-16 my-1"></div>
        <p class="text-sm">&#x20B9;${cardData.prices.otherPrices[1].price}</p>
      </div>

      <!-- Element 3 -->
      <div class="w-1/3">
        <p class="text-sm">${cardData.prices.otherPrices[2].source}</p>
        <div class="border-[1px] border-mid w-16 my-1"></div>
        <p class="text-sm">&#x20B9;${cardData.prices.otherPrices[2].price}</p>
      </div>
    </div>
  </div>
</div>
  `;

  cardContainer.appendChild(card);
}

cardData.forEach((data) => {
  createCard(data);
});
