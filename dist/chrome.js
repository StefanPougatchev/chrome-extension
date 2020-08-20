const loading = document.querySelector('.loading');
loading.style.display = 'none';

const result = document.querySelector('.resultcontainer');
result.style.display = 'none';

const searchForName = (value) => {
  loading.style.display = 'block';
  fetch(
    'https://api.stackexchange.com/2.2/similar?order=desc&sort=relevance&title=' +
      value +
      '&site=stackoverflow&key=OwU945slsHsBPNuQPqLFjg(('
  )
    .then((response) => response.json())
    .then((data) => {
      loading.style.display = 'none';
      console.log(data.items);
      appendData(data.items);
      //appendData(data)
      result.style.display = 'block';
    })

    .catch((error) => {
      loading.style.display = 'none';
    });
};

function appendData(newInfo) {
  for (let i = 0; i < 10; i++) {
    const resultsheader = document.querySelector('.results');
    let newdiv = document.createElement('div');
    newdiv.classList.add('childcontainer');

    let H2 = document.createElement('H2');

    H2.classList.add('title');
    H2.innerHTML = newInfo[i].title;


    let p1 = document.createElement('p');
    p1.classList.add('views');
    p1.innerHTML = 'Views: ' + newInfo[i].view_count;

    var img = document.createElement("img"); 
    if (newInfo[i].is_answered === true){
      img.classList.add('true');
      img.src = "https://banner2.cleanpng.com/20180403/ejw/kisspng-check-mark-computer-icons-customer-service-theme-c-green-tick-5ac32c4dc67a94.651080821522740301813.jpg"; 
    } else {
      img.classList.add('false')
      img.src = "https://banner2.cleanpng.com/20180401/vgw/kisspng-x-mark-check-mark-desktop-wallpaper-clip-art-x-mark-5ac194d45fdcc4.0082162715226359883927.jpg";
    }
    

    let a = document.createElement('a');
    a.classList.add('links');
    a.href = newInfo[i].link;
    a.innerHTML = newInfo[i].link;

    // ' Link: ' +
    // newInfo[i].link;
    //attaching all the divs to mainContainer(my data)
    resultsheader.appendChild(newdiv);
    newdiv.appendChild(H2);
    newdiv.appendChild(p1);
    newdiv.appendChild(img)
    newdiv.appendChild(a);
  }
}

//declare a function to handle form submission

const form = document.querySelector('.form-data');
const country = document.querySelector('.searchTerm');

const handleSubmit = async (e) => {
  e.preventDefault();
  searchForName(country.value);
  console.log(country.value);
};

form.addEventListener('submit', (e) => handleSubmit(e));
